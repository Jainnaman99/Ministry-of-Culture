// Minimal HTTP backend for Sanskriti Saathi — no external npm deps.
// Calls Azure OpenAI (Foundry-hosted GPT-4o) with a domain-restricted system prompt
// over the 3 priority sites: indianculture.gov.in, vedicheritage.gov.in, museumsofindia.gov.in.
//
// Run: node --env-file=.env server/index.mjs
// (Node 20.6+ for --env-file. For older Node we fall back to a tiny built-in parser below.)

import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { URL } from "node:url";

// --- Tiny .env loader so we don't need dotenv ---
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const PORT = Number(process.env.PORT) || 3001;
const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;          // https://<resource>.openai.azure.com
const API_KEY = process.env.AZURE_OPENAI_API_KEY;
const DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;       // your gpt-4o deployment name
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || "2024-08-01-preview";

// Optional Azure AI Search for proper RAG. Leave blank to use plain GPT-4o with site-aware prompt.
const SEARCH_ENDPOINT = process.env.AZURE_SEARCH_ENDPOINT || ""; // https://<search>.search.windows.net
const SEARCH_INDEX = process.env.AZURE_SEARCH_INDEX || "";
const SEARCH_KEY = process.env.AZURE_SEARCH_KEY || "";

const PRIORITY_SITES = [
  { name: "Indian Culture Portal", url: "https://indianculture.gov.in" },
  { name: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
  { name: "Museums of India",      url: "https://museumsofindia.gov.in" },
];

const SYSTEM_PROMPT = `You are **Sanskriti Saathi**, the official AI assistant of the Ministry of Culture, Government of India.

You answer questions about Indian cultural heritage, monuments, museums, manuscripts, classical arts, festivals, schemes, and history. Your knowledge is drawn primarily from three official portals:
1. Indian Culture Portal — https://indianculture.gov.in
2. Vedic Heritage Portal — https://vedicheritage.gov.in
3. Museums of India — https://museumsofindia.gov.in

CRITICAL RULES (follow every one):
- **Language mirror**: Respond in the SAME script and language as the user's question. If user types in Devanagari (हिंदी), reply in Hindi. If in Tamil/Telugu script, reply in that script. If user types Hindi using English letters ("tajmahal kaha hai"), reply in the same romanized Hindi style. Default to English only if the query is in English.
- **Specific, not generic**: When asked about a specific monument, museum, scheme, or text — give specific facts about THAT item. Never substitute a generic description of its category. "Humayun's Tomb" must return Humayun's Tomb details, not a general Mughal-architecture overview.
- **Cite the source portal** in a "Sources" line at the end with the relevant URL(s) from the three priority sites.
- **Be comprehensive for list queries**: If asked about "schemes of Ministry of Culture", list ALL relevant schemes, not 3–4 examples. Use numbered or bulleted lists.
- **Use markdown formatting**: bold for key facts, bullet lists for enumerations, headings for long answers.
- **Be honest**: If you genuinely don't know a specific detail, say so and point the user to the right portal. Never fabricate dates, names, or figures.
- **Stay on topic**: Only answer questions about Indian culture, heritage, or the Ministry of Culture. Politely decline unrelated queries.

Quality bar: an Indian Administrative Service officer is reading your answer to assess whether this AI is good enough to be the Ministry's public-facing assistant. Be precise, well-structured, and grounded.`;

function chatRequestBody(userMessage, history = []) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessage },
  ];
  const body = {
    messages,
    temperature: 0.3,
    max_tokens: 1200,
    top_p: 0.95,
  };
  if (SEARCH_ENDPOINT && SEARCH_INDEX && SEARCH_KEY) {
    // Azure OpenAI "On Your Data" — adds RAG over a pre-built AI Search index of the 3 sites.
    body.data_sources = [{
      type: "azure_search",
      parameters: {
        endpoint: SEARCH_ENDPOINT,
        index_name: SEARCH_INDEX,
        authentication: { type: "api_key", key: SEARCH_KEY },
        query_type: "vector_semantic_hybrid",
        in_scope: true,
        strictness: 3,
        top_n_documents: 5,
      },
    }];
  }
  return body;
}

async function callFoundry(userMessage, history) {
  if (!ENDPOINT || !API_KEY || !DEPLOYMENT) {
    throw new Error("Azure OpenAI not configured. Set AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT in .env");
  }
  const url = `${ENDPOINT.replace(/\/$/, "")}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=${API_VERSION}`;
  const t0 = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": API_KEY },
    body: JSON.stringify(chatRequestBody(userMessage, history)),
  });
  const ms = Date.now() - t0;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Azure OpenAI ${res.status}: ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  const choice = data.choices?.[0];
  const reply = choice?.message?.content || "";
  const citations = choice?.message?.context?.citations || [];
  return { reply, citations, latencyMs: ms, model: data.model, usage: data.usage };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let buf = "";
    req.on("data", (c) => (buf += c));
    req.on("end", () => {
      try { resolve(buf ? JSON.parse(buf) : {}); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

function send(res, status, payload, extra = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...extra,
  });
  res.end(JSON.stringify(payload));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // CORS preflight
  if (req.method === "OPTIONS") return send(res, 204, {});

  // Health check
  if (req.method === "GET" && url.pathname === "/api/health") {
    return send(res, 200, {
      ok: true,
      configured: Boolean(ENDPOINT && API_KEY && DEPLOYMENT),
      ragEnabled: Boolean(SEARCH_ENDPOINT && SEARCH_INDEX && SEARCH_KEY),
      prioritySites: PRIORITY_SITES,
      deployment: DEPLOYMENT || null,
    });
  }

  // Chat endpoint
  if (req.method === "POST" && url.pathname === "/api/chat") {
    try {
      const { query, history } = await readBody(req);
      if (!query || typeof query !== "string") {
        return send(res, 400, { error: "Missing 'query' string in body" });
      }
      const result = await callFoundry(query, Array.isArray(history) ? history : []);
      return send(res, 200, {
        reply: result.reply,
        sources: result.citations.map((c) => ({
          title: c.title || c.filepath || "Source",
          url: c.url || c.filepath || "",
          snippet: c.content?.slice(0, 220) || "",
        })),
        meta: { latencyMs: result.latencyMs, model: result.model, usage: result.usage },
      });
    } catch (err) {
      console.error("[/api/chat]", err.message);
      return send(res, 502, { error: "upstream_error", message: err.message });
    }
  }

  send(res, 404, { error: "not_found", path: url.pathname });
});

server.listen(PORT, () => {
  console.log(`Sanskriti Saathi backend listening on http://localhost:${PORT}`);
  console.log(`  Azure OpenAI:  ${ENDPOINT ? "configured" : "NOT configured (.env missing)"}`);
  console.log(`  Deployment:    ${DEPLOYMENT || "(not set)"}`);
  console.log(`  RAG (AI Search): ${SEARCH_ENDPOINT ? "enabled" : "disabled — set AZURE_SEARCH_* to enable"}`);
  console.log(`  Priority sites: ${PRIORITY_SITES.map(s => s.url).join(", ")}`);
});
