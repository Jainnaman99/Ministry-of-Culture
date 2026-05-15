import { Search, Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "../components/ui/utils";

interface AISearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showVoice?: boolean;
  className?: string;
  compact?: boolean;
}

export function AISearchBar({
  placeholder = "Ask anything about Indian culture, heritage, museums, archives...",
  onSearch,
  showVoice = true,
  className,
  compact = false,
}: AISearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
        <div
          className="flex items-center rounded-full border-2 bg-white transition-all focus-within:border-[var(--gold)] focus-within:shadow-md overflow-hidden px-3 gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <Search className="h-4 w-4 flex-shrink-0" style={{ color: "var(--navy)" }} />
          <div className="relative flex-1 overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
              className="w-full py-2.5 bg-transparent border-none focus:outline-none text-sm relative z-10"
              style={{ color: "var(--navy)" }}
            />
            {query === "" && (
              <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
                <span className="nav-search-roll text-sm" style={{ color: "#9ca3af" }}>
                  {placeholder + "   •   " + placeholder}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Voice input"
            >
              <Mic className="h-4 w-4" style={{ color: "var(--navy)" }} />
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: "var(--navy)", color: "var(--ivory)" }}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-6 h-5 w-5" style={{ color: 'var(--navy)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-5 pl-16 pr-28 rounded-full border-2 bg-white transition-all focus:outline-none focus:border-[var(--gold)] focus:shadow-lg"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--navy)'
          }}
        />
        <div className="absolute right-3 flex items-center gap-2">
          {showVoice && (
            <button
              type="button"
              className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
              aria-label="Voice input"
            >
              <Mic className="h-5 w-5" style={{ color: 'var(--navy)' }} />
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 rounded-full transition-all"
            style={{
              backgroundColor: 'var(--navy)',
              color: 'var(--ivory)'
            }}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
