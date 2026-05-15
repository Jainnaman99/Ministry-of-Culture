import { useState, useRef, useEffect } from "react";
import { usePageLanguage, type PageLanguage } from "../context/language-context";

const BHASHINI_LOGO = "https://upload.wikimedia.org/wikipedia/en/d/db/Bhashini_Logo.png";

// Languages we have static translations for. Mixed-script queries are handled by the chatbot's auto-detect.
const SUPPORTED_LANGS = new Set(["en", "hi", "te", "ta"]);

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "brx", label: "Bodo", native: "बड़ो" },
  { code: "doi", label: "Dogri", native: "डोगरी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ks", label: "Kashmiri", native: "कॉशुर" },
  { code: "kok", label: "Konkani", native: "कोंकणी" },
  { code: "mai", label: "Maithili", native: "मैथिली" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ne", label: "Nepali", native: "नेपाली" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "sa", label: "Sanskrit", native: "संस्कृतम्" },
  { code: "sat", label: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "sd", label: "Sindhi", native: "سنڌي" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ur", label: "Urdu", native: "اردو" },
];

export function BhashiniLanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("en");
  const { setLanguage } = usePageLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLang = languages.find((l) => l.code === selected) || languages[0];

  function handleSelect(code: string) {
    setSelected(code);
    setIsOpen(false);
    // Update page language if supported, otherwise default to English
    if (SUPPORTED_LANGS.has(code)) {
      setLanguage(code as PageLanguage);
    } else {
      setLanguage("en");
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger — compact अA box matching the accessibility icon row */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded border flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
        style={{
          borderColor: isOpen ? "var(--maroon)" : "#ddd",
          backgroundColor: isOpen ? "#FFF6E5" : "transparent",
          color: "var(--maroon)",
        }}
        title={`Change Language — Currently: ${selectedLang.label} (Powered by Bhashini)`}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="font-bold leading-none" style={{ fontFamily: "serif" }}>
          <span style={{ fontSize: "15px" }}>अ</span>
          <span style={{ fontSize: "12px" }}>A</span>
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-64 rounded shadow-xl border z-[100]"
          style={{ backgroundColor: "#fff", borderColor: "#ddd" }}
        >
          {/* Note about mixed-script queries — auto-detected by the chatbot */}
          <div className="px-3 py-2 text-[10px] border-b" style={{ backgroundColor: "#FFF6E5", color: "#7C1D2A", borderColor: "#E8D8A8" }}>
            Mixed-script queries (Hindi typed in English letters) are <strong>auto-detected</strong> by the AI chatbot.
          </div>

          <div className="max-h-[340px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors border-b flex items-center justify-between"
                style={{
                  borderColor: "#f0f0f0",
                  backgroundColor: selected === lang.code ? "#f0f7ff" : SUPPORTED_LANGS.has(lang.code) ? "rgba(34,139,34,0.06)" : "transparent",
                  color: "#333",
                  fontWeight: selected === lang.code ? 600 : 400,
                }}
              >
                <span>{lang.label} ({lang.native})</span>
                {SUPPORTED_LANGS.has(lang.code) && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#22883220", color: "#1a7a2e" }}>
                    LIVE
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2.5 border-t flex items-center justify-between"
            style={{ borderColor: "#ddd", backgroundColor: "#fafafa" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#555" }}>
              <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 20c0-2.8 1.8-4 4-4s4 1.2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#888" }}>Powered by</span>
              <img
                src={BHASHINI_LOGO}
                alt="Bhashini"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
