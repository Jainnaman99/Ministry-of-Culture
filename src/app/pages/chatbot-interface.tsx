import { useState, useEffect, useRef, useCallback } from "react";
import { ChatBubble } from "../components/chat-bubble";
import { SaathiAvatar } from "../components/saathi-avatar";
import { LoadingState } from "../components/loading-state";
import { LanguageToggle } from "../components/language-toggle";
import { Mic, Send, Plus, Filter, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { findBestResponse, detectHinglish, generateGenericHinglish, type KBEntry } from "../data/knowledge-base";
import type { Language } from "../components/language-toggle";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  sources?: { title: string; url: string }[];
  confidence?: "High" | "Medium" | "Low";
  followUps?: string[];
  isStreaming?: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  sessionId?: string | null;
  savedMessages?: Message[];
}

export function ChatbotInterface() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! 🙏 I'm **Sanskriti Saathi**, your AI companion from the Ministry of Culture. I can help you explore India's rich cultural heritage across **66 official portals**.\n\nTry asking about monuments, museums, classical dance, Vedic texts, archives, or cultural schemes.",
      isUser: false,
      timestamp: "Just now",
      confidence: "High",
      followUps: ["Tell me about Ajanta caves", "List museums in India", "What are the Vedas?"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [showFilters, setShowFilters] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    // { id: "1", title: "Ajanta Caves Heritage", preview: "Tell me about Ajanta caves" },
    // { id: "2", title: "Museums in India", preview: "List museums in India" },
    // { id: "3", title: "Classical Dance Forms", preview: "Indian classical dance forms" },
    // { id: "4", title: "Vedic Heritage", preview: "What are the Vedas?" },
    // { id: "5", title: "National Archives", preview: "About Abhilekh Patal" },
  ]);

  const sessionId = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sanskriti_saathi_recents");
      if (!stored) return;
      const recents: { id: string; date: string; preview: string; messages: Message[] }[] = JSON.parse(stored);
      setChatHistory(
        recents.map((r) => ({
          id: r.id,
          title: r.preview.length > 30 ? r.preview.slice(0, 30) + "…" : r.preview,
          preview: r.preview,
          savedMessages: r.messages,
        }))
      );
    } catch {}
  }, []);

  // Streaming text effect
  const streamResponse = useCallback((response: KBEntry, msgId: string, userQuery: string = "") => {
    // Auto-detect Hinglish in user query — overrides language setting
    const isHinglish = language === "hg" || (language === "en" && detectHinglish(userQuery));
    let fullText: string;
    if (isHinglish) {
      fullText = response.textHinglish || generateGenericHinglish(response);
    } else if (language === "hi") {
      fullText = response.textHi;
    } else if (language === "te") {
      fullText = response.textTe;
    } else if (language === "ta") {
      fullText = response.textTa;
    } else {
      fullText = response.text;
    }
    let charIndex = 0;
    setIsStreaming(true);

    const streamInterval = setInterval(() => {
      charIndex += 2 + Math.floor(Math.random() * 3); // 2-4 chars at a time for speed
      if (charIndex >= fullText.length) {
        charIndex = fullText.length;
        clearInterval(streamInterval);
        setIsStreaming(false);
        // Add final message with sources and follow-ups
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  text: fullText,
                  isStreaming: false,
                  sources: response.sources,
                  confidence: response.confidence,
                  followUps: response.followUps,
                }
              : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: fullText.slice(0, charIndex), isStreaming: true } : m
          )
        );
      }
    }, 15);

    return () => clearInterval(streamInterval);
  }, [language]);

  // Stream raw text from the backend with the same typing animation as KB responses
  const streamPlainText = useCallback(
    (text: string, msgId: string, sources: { title: string; url: string }[] = []) => {
      let charIndex = 0;
      setIsStreaming(true);
      const interval = setInterval(() => {
        charIndex += 3 + Math.floor(Math.random() * 4);
        if (charIndex >= text.length) {
          clearInterval(interval);
          setIsStreaming(false);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId
                ? { ...m, text, isStreaming: false, sources, confidence: "High", followUps: [] }
                : m
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, text: text.slice(0, charIndex), isStreaming: true } : m
            )
          );
        }
      }, 12);
    },
    []
  );

  const handleSend = async (overrideInput?: string) => {
    const queryText = overrideInput || input;
    if (!queryText.trim() || isLoading || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: queryText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const historyTitle = queryText.length > 30 ? queryText.slice(0, 30) + "..." : queryText;

    try {
      const res = await fetch("/chat-hybrid-context", {
        method: "POST",
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ message: queryText, session_id: sessionId.current }),
      });
      if (!res.ok) throw new Error("API error " + res.status);
      const data = await res.json();
      if (data.session_id) sessionId.current = data.session_id;
      setIsLoading(false);

      setChatHistory((prev) => {
        const exists = prev.some((h) => h.preview.toLowerCase() === queryText.toLowerCase());
        if (exists) return prev;
        return [{ id: Date.now().toString(), title: historyTitle, preview: queryText, sessionId: sessionId.current }, ...prev].slice(0, 10);
      });

      const msgId = (Date.now() + 1).toString();
      const sources = (data.sources || []).map((s: any) => ({ title: s.title, url: s.link, snippet: s.snippet }));
      const aiMessage: Message = {
        id: msgId,
        text: "",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isStreaming: true,
        sources,
        confidence: "High",
        followUps: [],
      };
      setMessages((prev) => [...prev, aiMessage]);
      streamPlainText(data.answer || "", msgId, sources);
    } catch {
      setIsLoading(false);

      setChatHistory((prev) => {
        const exists = prev.some((h) => h.preview.toLowerCase() === queryText.toLowerCase());
        if (exists) return prev;
        return [{ id: Date.now().toString(), title: historyTitle, preview: queryText, sessionId: null }, ...prev].slice(0, 10);
      });

      const response = findBestResponse(queryText);
      const msgId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: msgId,
        text: "",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
      streamResponse(response, msgId, queryText);
    }
  };

  const handleNewChat = () => {
    sessionId.current = null;
    setMessages([
      {
        id: Date.now().toString(),
        text: language === "hi"
          ? "नमस्ते! 🙏 मैं **संस्कृति साथी** हूँ, संस्कृति मंत्रालय का आपका AI साथी।\n\nभारत की सांस्कृतिक विरासत के बारे में कुछ भी पूछें!"
          : language === "te"
          ? "నమస్కారం! 🙏 నేను **సంస్కృతి సాథి**, సంస్కృతి మంత్రిత్వ శాఖ నుండి మీ AI సహచరుడిని।\n\nభారతదేశ సాంస్కృతిక వారసత్వం గురించి ఏదైనా అడగండి!"
          : language === "ta"
          ? "வணக்கம்! 🙏 நான் **சன்ஸ்க்ருதி சாதி**, கலாச்சார அமைச்சகத்திலிருந்து உங்கள் AI துணை.\n\nஇந்தியாவின் கலாச்சார பாரம்பரியம் பற்றி எதையும் கேளுங்கள்!"
          : "Namaste! 🙏 I'm **Sanskriti Saathi**, your AI companion from the Ministry of Culture. Ask me anything about India's rich cultural heritage!",
        isUser: false,
        timestamp: "Just now",
        confidence: "High",
        followUps: ["Tell me about Ajanta caves", "List museums in India", "What are the Vedas?"],
      },
    ]);
  };

  const handleFollowUp = async (query: string) => {
    const item = chatHistory.find((x) => x.preview === query);
    if (item?.savedMessages && item.savedMessages.length > 0) {
      setMessages(item.savedMessages);
      return;
    }
    if (item?.sessionId && item.sessionId !== sessionId.current) {
      sessionId.current = item.sessionId;
      try {
        const res = await fetch(`/chat-hybrid-context/${item.sessionId}/history`);
        if (res.ok) {
          const data = await res.json();
          const msgs = Array.isArray(data) ? data : (data.history || []);
          setMessages([
            { id: "1", text: "Conversation history restored.", isUser: false, timestamp: "Just now", confidence: "High", followUps: [] },
            ...msgs.map((m: any, idx: number) => ({
              id: (idx + 2).toString(),
              text: m.content || m.message || "",
              isUser: m.role === "user",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            })),
          ]);
          return;
        }
      } catch {}
    }
    handleSend(query);
  };

  return (
    <div className="h-screen flex" style={{ backgroundColor: "var(--background)" }}>
      {/* Sidebar */}
      <aside
        className="w-72 border-r flex flex-col"
        style={{ backgroundColor: "var(--sidebar)", borderColor: "var(--sidebar-border)" }}
      >
        {/* Sidebar Header — Sanskriti Saathi brand */}
        <div className="p-4 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: "#FFF6E5", border: "2px solid #C9A961" }}>
              <SaathiAvatar size={40} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--sidebar-foreground)" }}>Sanskriti Saathi</p>
              <p className="text-[10px] opacity-70" style={{ color: "var(--sidebar-foreground)" }}>Ministry of Culture</p>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm hover:opacity-90 font-semibold"
            style={{ backgroundColor: "var(--maroon)", color: "#fff", border: "1px solid #C9A961" }}
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-[10px] uppercase tracking-wider mb-2 px-2 opacity-50" style={{ color: "var(--sidebar-foreground)" }}>
            Recent
          </p>
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <div key={chat.id} className="flex items-center gap-1 group">
                <button
                  onClick={() => handleFollowUp(chat.preview)}
                  className="flex-1 text-left px-3 py-2.5 rounded-lg transition-all hover:bg-[var(--sidebar-accent)] min-w-0"
                >
                  <p className="text-sm mb-0.5 truncate" style={{ color: "var(--sidebar-foreground)" }}>{chat.title}</p>
                  <p className="text-[11px] opacity-50 truncate" style={{ color: "var(--sidebar-foreground)" }}>{chat.preview}</p>
                </button>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (chat.sessionId) {
                      try { await fetch(`/chat-hybrid-context/${chat.sessionId}`, { method: "DELETE" }); } catch {}
                    }
                    setChatHistory((prev) => prev.filter((x) => x.id !== chat.id));
                    if (chat.sessionId === sessionId.current) {
                      sessionId.current = null;
                      handleNewChat();
                    }
                  }}
                  className="opacity-0 group-hover:opacity-40 hover:!opacity-100 p-1.5 rounded-md transition-all flex-shrink-0"
                  style={{ color: "var(--sidebar-foreground)" }}
                  title="Delete conversation"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 border-t" style={{ borderColor: "var(--sidebar-border)" }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm"
            style={{ backgroundColor: showFilters ? "var(--sidebar-accent)" : "transparent", color: "var(--sidebar-foreground)" }}
          >
            <span className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              Source Filters
            </span>
          </button>
          {showFilters && (
            <div className="mt-2 space-y-3 text-xs px-2" style={{ color: "var(--sidebar-foreground)" }}>
              <div>
                <p className="mb-1.5 opacity-50 uppercase tracking-wider text-[10px]">Websites</p>
                <div className="space-y-1.5">
                  {["Indian Culture Portal", "ASI", "Museums of India", "Vedic Heritage", "National Archives", "IGNCA", "Sangeet Natak Akademi"].map((site) => (
                    <label key={site} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>{site}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar — maroon to match home page palette and popup chatbot */}
        <header className="py-3 px-6 border-b-2 flex items-center justify-between" style={{ backgroundColor: "var(--maroon)", borderColor: "#C9A961" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <div>
              <h2 className="text-base font-bold text-white">Sanskriti Saathi</h2>
              <p className="text-xs text-white/75">Semantic search across 66 Ministry portals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }}></div>
              <span className="text-white">Online</span>
            </div>
            <LanguageToggle language={language} onToggle={setLanguage} />
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6" style={{ backgroundColor: "#faf9f7" }}>
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatBubble {...message} />

                {/* Follow-up Suggestions */}
                {!message.isUser && message.followUps && message.followUps.length > 0 && !message.isStreaming && (
                  <div className="ml-12 mb-5 flex flex-wrap gap-2">
                    {message.followUps.map((fq, i) => (
                      <button
                        key={i}
                        onClick={() => handleFollowUp(fq)}
                        disabled={isLoading || isStreaming}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border-2 transition-all hover:shadow-sm hover:bg-white disabled:opacity-40"
                        style={{ borderColor: "var(--maroon)", color: "var(--maroon)", backgroundColor: "#FFF6E5" }}
                      >
                        <Sparkles className="h-3 w-3" style={{ color: "var(--maroon)" }} />
                        {fq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && <LoadingState message={language === "hi" ? "सांस्कृतिक भंडारों में खोज रहा हूँ..." : language === "te" ? "సాంస్కృతిక భండారాలలో వెతుకుతోంది..." : language === "ta" ? "கலாச்சார களஞ்சியங்களில் தேடுகிறது..." : "Searching across cultural repositories..."} />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button type="button" className="p-2.5 rounded-full hover:bg-[var(--muted)] transition-colors flex-shrink-0" title="Voice input">
                <Mic className="h-4 w-4" style={{ color: "var(--maroon)" }} />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === "hi" ? "भारत की संस्कृति के बारे में पूछें..." : language === "te" ? "భారతదేశ సంస్కృతి గురించి అడగండి..." : language === "ta" ? "இந்திய கலாச்சாரம் பற்றி கேளுங்கள்..." : "Ask about monuments, museums, dance forms, Vedic texts..."}
                  disabled={isStreaming}
                  className="w-full px-5 py-3 rounded-2xl border-2 bg-white focus:outline-none transition-colors text-sm disabled:opacity-50"
                  style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--maroon)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isStreaming}
                className="p-3 rounded-full transition-all disabled:opacity-30 hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: "var(--maroon)", color: "#fff" }}
                title="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[10px] text-center mt-2 opacity-40" style={{ color: "var(--navy)" }}>
              {language === "hi"
                ? "AI प्रतिक्रियाएँ अनुक्रमित मंत्रालय डेटा से उत्पन्न। हमेशा आधिकारिक स्रोतों से सत्यापित करें।"
                : language === "te"
                ? "AI ప్రతిస్పందనలు మంత్రిత్వ శాఖ డేటా నుండి ఉత్పన్నమైనవి. అధికారిక వనరులతో ధృవీకరించండి."
                : language === "ta"
                ? "AI பதில்கள் அமைச்சக தரவுகளிலிருந்து உருவாக்கப்பட்டவை. அதிகாரப்பூர்வ ஆதாரங்களுடன் சரிபார்க்கவும்."
                : "AI responses generated from indexed Ministry of Culture data. Always verify with official sources."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
