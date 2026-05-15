# Sanskriti Saathi — Azure AI Foundry Setup

This document walks Naman / Venkat through standing up the live backend on Azure so the chatbot stops returning hard-coded answers and starts generating grounded responses via GPT-4o.

> **Target completion**: today, before EOD 13 May 2026, so Pervez can review on the 14th and the secretary demo on 18th/19th is solid.

---

## Architecture in 30 seconds

```
React frontend (this repo)
        │  fetch POST /api/chat  { query, history }
        ▼
server/index.mjs  (Node 20, no npm deps)
        │  POST /openai/deployments/.../chat/completions
        ▼
Azure AI Foundry → GPT-4o deployment in Central India (Hyderabad)
        │  optional: data_sources → Azure AI Search index of the 3 priority sites
        ▼
Reply (text + citations) streamed back to the chatbot
```

If `server/index.mjs` is unreachable or `.env` is missing, the chatbot **silently falls back to the local knowledge base** so the demo never fully breaks.

---

## Step 1 — Provision in the Azure portal

In the [Azure portal](https://portal.azure.com):

1. **Resource group**: create `moc-poc-rg` in region **Central India**.
2. **Azure AI Foundry** (formerly Azure AI Studio):
   - Resource type: **Azure AI services** → **Azure AI Foundry**.
   - Region: **Central India** (Hyderabad) for data-residency story. Fallback: **East US** if quota is restricted.
   - Name: `moc-foundry-poc`.
3. **Deploy GPT-4o** inside the Foundry resource:
   - Foundry → Models + endpoints → Deploy base model → `gpt-4o` (Global Standard).
   - Deployment name: `gpt-4o` (keep it short, you'll paste this into `.env`).
   - If quota is denied, request increase or temporarily use `gpt-4o-mini`.
4. **Grab two values** from Foundry → Models + endpoints → your deployment:
   - **Target URI** — looks like `https://moc-foundry-poc.openai.azure.com`
   - **Key** (Key 1 or Key 2)

### Optional but recommended — Step 1b: Azure AI Search (for proper RAG)

If you have an extra hour, this adds real grounding over the 3 priority sites:

1. Create **Azure AI Search** resource — name `moc-search-poc`, Basic tier (~₹6k/mo), same region.
2. In the Search service → **Import data**:
   - Source: **Web crawler** (preview) OR pre-crawl with a script.
   - Whitelist: `indianculture.gov.in`, `vedicheritage.gov.in`, `museumsofindia.gov.in`.
   - Wait for indexing (10–60 min depending on crawl depth).
3. Note the **index name** (e.g. `moc-3sites`) and **admin key**.

Skip this step initially — the backend works without it, just with weaker grounding.

---

## Step 2 — Configure the backend locally

In the project root:

```bash
cp .env.example .env
```

Edit `.env` and paste the values from Step 1:

```
AZURE_OPENAI_ENDPOINT=https://moc-foundry-poc.openai.azure.com
AZURE_OPENAI_API_KEY=<paste Key 1 here>
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2024-08-01-preview

# Leave these blank initially. Fill in after Step 1b.
AZURE_SEARCH_ENDPOINT=
AZURE_SEARCH_INDEX=
AZURE_SEARCH_KEY=

PORT=3001
```

> `.env` is gitignored; never commit it.

---

## Step 3 — Run the backend

Requires Node 20+ (uses native `fetch` and `--env-file` support).

```bash
npm run dev:server
```

Expected output:
```
Sanskriti Saathi backend listening on http://localhost:3001
  Azure OpenAI:  configured
  Deployment:    gpt-4o
  RAG (AI Search): disabled — set AZURE_SEARCH_* to enable
```

Sanity check from another terminal:
```bash
curl http://localhost:3001/api/health
```
Should return `"configured": true`.

Live chat test:
```bash
curl -X POST http://localhost:3001/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"query\": \"Where is Humayun's Tomb located?\"}"
```
You should get a real GPT-4o answer about Humayun's Tomb (not generic Mughal text).

---

## Step 4 — Run the frontend pointing at the backend

In a second terminal:

```bash
npm run dev
```

Vite serves the React app on `http://localhost:5173`. The dev server's `proxy` config forwards every `/api/*` call to `http://localhost:3001`, so the chatbot just works.

Open the floating Sanskriti Saathi avatar and try:
- **English**: "Tell me about Humayun's Tomb"
- **Hindi (Devanagari)**: "हुमायूँ का मकबरा कहाँ है?"
- **Romanized Hindi**: "humayun ka makbara kahan hai?"
- **List query**: "List all schemes of Ministry of Culture"

Each should return specific, grounded answers via GPT-4o — not the local KB fallback.

---

## Step 5 — Deploy

For the demo URL the secretary will visit:

### Option A — Azure Static Web Apps + Functions (single URL, recommended)

1. Push code to a GitHub repo.
2. Azure portal → **Static Web Apps** → create:
   - Repo: your GitHub repo
   - Build preset: **React (Vite)**
   - App location: `/`
   - Output location: `dist`
   - API location: `server` (Static Web Apps will run `server/index.mjs` as an API)
3. Add the same env vars (Azure OpenAI endpoint/key/deployment) under **Configuration**.
4. Wait for first build; you get a URL like `https://moc-poc.azurestaticapps.net`.

### Option B — Azure App Service (backend only) + Static Web Apps (frontend)

If you want them separate:
1. Deploy `server/` as an App Service (Linux, Node 20).
2. Deploy frontend with `VITE_API_BASE_URL=https://moc-backend.azurewebsites.net` baked in at build time.
3. Add the App Service URL to CORS allow-list (already wildcarded in `server/index.mjs` for the demo).

### Option C — Locally for the demo

Ship `npm run dev:server` + `npm run dev` running on the demo laptop. Crude but works if internet/firewall is unreliable on demo day.

---

## What I need from Naman before the demo

1. **The 4 known failures from the meeting** must return specific answers:
   - "Humayun's Tomb" → Humayun's Tomb facts, not generic Mughal Empire
   - "Allahabad Museum (Prayag)" → museum-specific details
   - "Schemes of Ministry of Culture" → all 17 schemes listed
   - Hindi script query → Hindi script answer
2. **Pre-warm the cache** for ~30 likely demo queries on the morning of 18 May. (Hit each from the backend health-check endpoint; Foundry's response cache will keep latency low for repeats.)
3. **Decide on hosting** — A vs B vs C above. Recommend **A** for the demo URL story, **C** as a hot backup.

---

## Pitfalls to watch for

- **Quota denial on GPT-4o India**: Microsoft sometimes throttles new deployments to 10 K TPM. Request increase at portal → Quotas → Azure OpenAI → request.
- **CORS in production**: If you split frontend and backend across two domains, update `Access-Control-Allow-Origin` in `server/index.mjs` from `*` to the actual frontend origin.
- **Latency on first cold call**: First call to a newly-deployed Azure App Service can take 10–20s. Hit `/api/health` once at startup to warm it before the demo opens.
- **Hindi script detection**: The system prompt in `server/index.mjs` already instructs the model to mirror the user's language. If it ever defaults to English on a Hindi query, double-check the prompt isn't being silently truncated by a too-low `max_tokens`.

---

## Cost estimate

| Service | Tier | Estimated cost (demo period) |
|---|---|---|
| Azure AI Foundry / GPT-4o | Pay-as-you-go | ₹0.50 – ₹1 per chat (in + out tokens) |
| Azure AI Search (optional) | Basic | ~₹6,000 / month |
| Azure Static Web Apps | Free tier | ₹0 |
| **Total for May–June demo period** | | **Under ₹10,000** (covered by Azure free credit if fresh subscription) |
