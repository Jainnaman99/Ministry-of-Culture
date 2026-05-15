import { useState, useEffect, useRef, useCallback } from "react";
import { ChatBubble } from "./chat-bubble";
import { SaathiAvatar } from "./saathi-avatar";
import { LoadingState } from "./loading-state";
import { LanguageToggle } from "./language-toggle";
import type { Language } from "./language-toggle";
import { Mic, Send, Sparkles, X, Minus, Maximize2, Globe, Plus } from "lucide-react";
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

    try {
      const res = await fetch("/chat-context", {
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
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl"
          style={{ backgroundColor: "var(--maroon)", border: "2px solid #C9A961" }}
        >
          <X className="h-6 w-6" style={{ color: "#FFF6E5" }} />
        </button>
      )}

      {/* Popup Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-[88px] right-5 z-50 w-[400px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            animation: "popupSlideIn 0.3s ease-out",
            height: "min(600px, calc(100vh - 120px))",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {/* Header — maroon GoI style with cartoon avatar + CTA pill (AskDISHA-inspired) */}
          <div
            className="px-4 py-3 flex items-center justify-between flex-shrink-0 relative"
            style={{ backgroundColor: "var(--maroon)", borderBottom: "2px solid #C9A961" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: "#FFF6E5", border: "2px solid #C9A961" }}>
                <SaathiAvatar size={44} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Sanskriti Saathi</h3>
                <p className="text-[10px] text-white/80 leading-tight">NextGen Heritage AI Assistant</p>
                {/* <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></div>
                  <span className="text-[9px] text-white/70">Online · 66 portals indexed</span>
                </div> */}
              </div>
            </div>
            {/* CTA pill — AskDISHA-style "टिकट बुक करें" equivalent */}
            <button
              onClick={() => navigate("/search?q=UNESCO+World+Heritage+Sites+India")}
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap shadow-md hover:scale-105 transition-all"
              style={{ backgroundColor: "#fff", color: "var(--maroon)", border: "1.5px solid #C9A961" }}
              title="Explore Heritage"
            >
              <Sparkles className="h-3 w-3" />
              हेरिटेज खोजें
            </button>
            {/* Window controls — inline flex, not absolute, to avoid overlapping the CTA pill */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => navigate("/chat")}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Open full view"
              >
                <Maximize2 className="h-3 w-3 text-white/80" />
              </button>
              <button
                onClick={() => {
                  sessionId.current = null;
                  setMessages([{
                    id: "1",
                    text: "Session cleared. Start a fresh conversation!",
                    isUser: false,
                    timestamp: "Just now",
                    confidence: "High",
                    followUps: ["Tell me about Ajanta caves", "List museums in India", "What are the Vedas?"],
                  }]);
                }}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                title="New Session (Clear History)"
              >
                <Plus className="h-3 w-3 text-white/80" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Minimize"
              >
                <Minus className="h-3 w-3 text-white/80" />
              </button>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="px-3 py-2 border-b flex justify-center" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
            <LanguageToggle language={language} onToggle={setLanguage} />
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
