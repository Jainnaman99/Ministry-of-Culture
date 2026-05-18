import { useState, useEffect, useRef, useCallback } from "react";
import { ChatBubble } from "./chat-bubble";
import { SaathiAvatar } from "./saathi-avatar";
import { LoadingState } from "./loading-state";
import type { Language } from "./language-toggle";
import { Mic, Send, Sparkles, Globe, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { findBestResponse, detectHinglish, generateGenericHinglish, type KBEntry } from "../data/knowledge-base";

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

export function ChatbotPopup() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "नमस्ते! 🙏 I'm **Sanskriti Saathi**, your AI companion for India's cultural heritage from the Ministry of Culture. Ask me about monuments, museums, manuscripts, or arts in English or Hindi (typing in English letters works too).",
      isUser: false,
      timestamp: "Just now",
      confidence: "High",
      followUps: ["Tell me about Ajanta caves", "tajmahal kaha he?", "List museums in India"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [unreadCount, setUnreadCount] = useState(0);
  const sessionId = useRef<string | null>(null);
  const localChatId = useRef<string | null>(null); // deduplication key only — never sent to API

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const streamResponse = useCallback((response: KBEntry, msgId: string, userQuery: string = "") => {
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
      charIndex += 2 + Math.floor(Math.random() * 3);
      if (charIndex >= fullText.length) {
        charIndex = fullText.length;
        clearInterval(streamInterval);
        setIsStreaming(false);
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
        if (!isOpen) setUnreadCount((c) => c + 1);
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: fullText.slice(0, charIndex), isStreaming: true } : m
          )
        );
      }
    }, 15);

    return () => clearInterval(streamInterval);
  }, [language, isOpen]);

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
          if (!isOpen) setUnreadCount((c) => c + 1);
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, text: text.slice(0, charIndex), isStreaming: true } : m
            )
          );
        }
      }, 12);
    },
    [isOpen]
  );

  const saveChatToRecents = () => {
    const userMessages = messages.filter((m) => m.isUser);
    if (userMessages.length === 0) return;
    const preview = userMessages[0].text.slice(0, 80);
    // localChatId is the stable recents slot identity — sessionId is API-only and never used here
    const chatKey = localChatId.current;
    const stored = localStorage.getItem("sanskriti_saathi_recents");
    const recents: { id: string; date: string; preview: string; messages: Message[]; sessionId?: string | null }[] =
      stored ? JSON.parse(stored) : [];
    const deduped = chatKey
      ? recents.filter((r) => r.sessionId !== chatKey)
      : recents;
    deduped.unshift({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      preview,
      messages,
      sessionId: chatKey,
    });
    localStorage.setItem("sanskriti_saathi_recents", JSON.stringify(deduped.slice(0, 20)));
  };

  const handleSend = async (overrideInput?: string) => {
    const queryText = overrideInput || input;
    if (!queryText.trim() || isLoading || isStreaming) return;

    if (!localChatId.current) localChatId.current = "chat_" + Date.now();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: queryText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

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

  return (
    <>
      {/* Floating Chat Button — Sanskriti Saathi avatar (AskDISHA-sized) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-24 h-24 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 hover:shadow-2xl overflow-hidden bg-white"
            style={{ border: "4px solid var(--maroon)" }}
            title="Ask Sanskriti Saathi"
            aria-label="Open Sanskriti Saathi chat"
          >
            <SaathiAvatar size={96} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"></span>
          </button>
          <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-white shadow-md" style={{ color: "var(--maroon)", border: "1.5px solid var(--maroon)" }}>
            ASK SANSKRITI SAATHI
          </span>
        </div>
      )}

      {/* Popup Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-5 z-50 w-[400px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            animation: "popupSlideIn 0.3s ease-out",
            height: "min(680px, calc(100vh - 48px))",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {/* Header */}
          <div className="flex-shrink-0" style={{ backgroundColor: "var(--maroon)", borderBottom: "2px solid #C9A961" }}>
            {/* Row 1 — Identity */}
            <div className="px-4 pt-3 pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: "#FFF6E5", border: "2px solid #C9A961" }}>
                    <SaathiAvatar size={48} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Sanskriti Saathi</h3>
                  <p className="text-[10px] leading-tight" style={{ color: "#C9A961" }}>NextGen Heritage AI Assistant</p>

                </div>
              </div>
              {/* CTA pill + Minimize */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/search?q=UNESCO+World+Heritage+Sites+India")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap shadow-lg hover:scale-105 hover:shadow-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #C9A961, #e8c97a)", color: "var(--maroon)" }}
                  title="Explore Heritage"
                >
                  <Sparkles className="h-3 w-3" />
                  हेरिटेज खोजें
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.28)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                  title="Minimize chat"
                  aria-label="Minimize chat"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Row 2 — Action strip */}
            <div
              className="px-3 py-1.5 flex items-center justify-between gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(0,0,0,0.18)" }}
            >
              {/* Language selector */}
              <div className="flex items-center gap-1.5">
                <Globe className="h-3 w-3 flex-shrink-0" style={{ color: "#e8c97a" }} />
                <div className="flex items-center rounded-full overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.35)" }}>
                  {([
                    { code: "en" as Language, label: "EN" },
                    { code: "hi" as Language, label: "हि" },
                    { code: "te" as Language, label: "తె" },
                    { code: "ta" as Language, label: "த" },
                  ]).map((lang, i, arr) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="px-2 py-0.5 text-[10px] font-bold transition-all"
                      style={{
                        backgroundColor: language === lang.code ? "#e8c97a" : "transparent",
                        color: language === lang.code ? "var(--maroon)" : "#ffffff",
                        borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.25)" : "none",
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-white/40 flex-shrink-0" />

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "sanskriti_saathi_active_chat",
                      JSON.stringify({ messages, sessionId: sessionId.current, localChatId: localChatId.current })
                    );
                    navigate("/chat");
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold transition-colors"
                  style={{ color: "#e8c97a" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#e8c97a")}
                  title="Open full view"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Full View
                </button>
                <div className="w-px h-3 bg-white/40" />
                <button
                  onClick={() => {
                    saveChatToRecents();
                    sessionId.current = null;
                    localChatId.current = null;
                    setMessages([{
                      id: "1",
                      text: "Chat saved to Recents. Start a fresh conversation!",
                      isUser: false,
                      timestamp: "Just now",
                      confidence: "High",
                      followUps: ["Tell me about Ajanta caves", "List museums in India", "What are the Vedas?"],
                    }]);
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold transition-colors"
                  style={{ color: "#e8c97a" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#e8c97a")}
                  title="Save chat to Recents and start fresh"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.43"/></svg>
                  Clear Chat
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4" style={{ backgroundColor: "#faf9f7" }}>
            {messages.map((message) => (
              <div key={message.id}>
                <ChatBubble {...message} />

                {!message.isUser && message.followUps && message.followUps.length > 0 && !message.isStreaming && (
                  <div className="ml-9 mb-4 flex flex-wrap gap-1.5">
                    {message.followUps.map((fq, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(fq)}
                        disabled={isLoading || isStreaming}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border-2 transition-all hover:shadow-sm hover:bg-white disabled:opacity-40"
                        style={{ borderColor: "var(--maroon)", color: "var(--maroon)", backgroundColor: "#FFF6E5" }}
                      >
                        <Sparkles className="h-2.5 w-2.5" style={{ color: "var(--maroon)" }} />
                        {fq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <LoadingState
                message={
                  language === "hi" ? "खोज रहा हूँ..." :
                  language === "te" ? "వెతుకుతోంది..." :
                  language === "ta" ? "தேடுகிறது..." :
                  "Searching..."
                }
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input — AskDISHA-style: rounded pill with globe (left) + text + mic-in-circle (right) */}
          <div className="px-3 pt-3 pb-2 bg-white flex-shrink-0 border-t" style={{ borderColor: "var(--border)" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 bg-white transition-colors"
              style={{ borderColor: "var(--border)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--maroon)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              {/* Globe — language selector trigger */}
              <button
                type="button"
                onClick={() => {
                  // Only cycle user-selectable languages. Mixed-script queries are auto-detected.
                  const langs: Language[] = ["en", "hi", "te", "ta"];
                  const idx = langs.indexOf(language);
                  const next = langs[(idx === -1 ? 0 : idx + 1) % langs.length];
                  setLanguage(next);
                }}
                className="p-1 rounded-full hover:bg-[var(--muted)] transition-colors flex-shrink-0"
                title={`Language: ${language.toUpperCase()} — click to change`}
              >
                <Globe className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === "hi" ? "कुछ भी पूछें..." :
                  language === "te" ? "ఏదైనా అడగండి..." :
                  language === "ta" ? "எதையும் கேளுங்கள்..." :
                  "Type or Ask Saathi..."
                }
                disabled={isStreaming}
                className="flex-1 px-1 py-1.5 bg-transparent focus:outline-none text-sm disabled:opacity-50"
                style={{ color: "var(--navy)" }}
              />
              {/* Send when typing, otherwise mic — AskDISHA-style blue circle */}
              {input.trim() ? (
                <button
                  type="submit"
                  disabled={isLoading || isStreaming}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:opacity-90 flex-shrink-0"
                  style={{ backgroundColor: "var(--maroon)", color: "#fff" }}
                  title="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-90 flex-shrink-0"
                  style={{ backgroundColor: "var(--maroon)", color: "#fff" }}
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>

          {/* Branded footer — AskDISHA-style partner attribution */}
          <div className="px-3 pb-2 bg-white flex items-center justify-between text-[10px] flex-shrink-0" style={{ color: "var(--muted-foreground)" }}>
            <a href="#" className="hover:underline">Terms of Use</a>
            <div className="flex items-center gap-1">
              <span className="font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>Sanskriti Saathi</span>
              <span>·</span>
              <span className="font-semibold" style={{ color: "#1B3E78" }}>Bhashini</span>
              <sup>™</sup>
            </div>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
