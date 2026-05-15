import { Globe } from "lucide-react";

export type Language = "en" | "hi" | "te" | "ta" | "hg";

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

// User-facing language toggle. "hg" is an internal mode for auto-detected mixed-script queries
// and is intentionally not listed here — the chatbot detects it from the query and responds
// accordingly without requiring users to choose it explicitly.
const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
];

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" style={{ color: 'var(--navy)' }} />
      <div className="flex rounded-full overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onToggle(lang.code)}
            className="px-3 py-1.5 text-xs transition-colors"
            style={{
              backgroundColor: language === lang.code ? 'var(--navy)' : 'transparent',
              color: language === lang.code ? 'var(--ivory)' : 'var(--navy)'
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
