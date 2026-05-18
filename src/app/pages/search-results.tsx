import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { SearchResultCard } from "../components/search-result-card";
import { AISearchBar } from "../components/ai-search-bar";
import { EmptyState } from "../components/empty-state";
import { ChatbotPopup } from "../components/chatbot-popup";
import { LoadingState } from "../components/loading-state";
import { ArrowLeft, Filter, Sparkles, Clock, Globe, MessageSquare, ChevronRight, ChevronLeft, Shield } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  keywords: string[];
  relevance?: number | null;
  image?: string;
  mediaType?: "article" | "image" | "video" | "audio" | "document";
}

// ===== URL â†’ readable source label =====
function sourceFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const map: Record<string, string> = {
      "culture.gov.in":          "Ministry of Culture",
      "indianculture.gov.in":    "Indian Culture Portal",
      "asi.nic.in":              "Archaeological Survey of India",
      "museumsofindia.gov.in":   "Museums of India",
      "vedicheritage.gov.in":    "Vedic Heritage Portal",
      "nationalarchives.nic.in": "National Archives of India",
      "ignca.gov.in":            "IGNCA",
    };
    return map[host] ?? host;
  } catch {
    return url;
  }
}


export function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page  = parseInt(searchParams.get("page") || "1", 10);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [relatedQueries, setRelatedQueries] = useState<string[]>([]);
  const [filters, setFilters] = useState({ website: "all", relevance: "all" });
  // const [searchTime, setSearchTime] = useState((0.4 + Math.random() * 0.8).toFixed(2)); // hidden for now
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    setError(false);

    fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, page, page_size: 10 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const seen = new Set<string>();
        const mapped: SearchResult[] = (data.results ?? [])
          .filter((r: { url?: string }) => {
            if (!r.url || seen.has(r.url)) return false;
            seen.add(r.url);
            return true;
          })
          .map((r: { title?: string; text?: string; url?: string; relevance?: number | null }, i: number) => ({
            id: String(i + 1),
            title: r.title ?? "",
            summary: r.text ?? "",
            url: r.url ?? "",
            source: sourceFromUrl(r.url ?? ""),
            keywords: [],
            relevance: r.relevance ?? null,
          }));
        setResults(mapped);
        setAiSummary(data.answer ?? data.summary ?? "");
        setRelatedQueries(data.relatedQueries ?? []);
        setTotalPages(data.total_pages ?? 1);
        setTotalResults(data.total_results ?? 0);
        // if (data.response_time_seconds != null) {
        //   setSearchTime(Number(data.response_time_seconds).toFixed(2));
        // }
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setResults([]);
        setAiSummary("");
        setRelatedQueries([]);
        setIsLoading(false);
      });
  }, [query, page]);

  const WEBSITE_DOMAINS: Record<string, string> = {
    indianculture: "indianculture.gov.in",
    vedic:         "vedicheritage.gov.in",
    museums:       "museumsofindia.gov.in",
    culture:       "culture.gov.in",
  };

  const RELEVANCE_THRESHOLDS: Record<string, number> = {
    high:   0.55,
    medium: 0.45,
  };

  const filteredResults = useMemo(() => {
    let r = results;
    if (filters.website !== "all") {
      const domain = WEBSITE_DOMAINS[filters.website];
      if (domain) r = r.filter((res) => res.url.includes(domain));
    }
    if (filters.relevance !== "all") {
      const threshold = RELEVANCE_THRESHOLDS[filters.relevance];
      if (threshold != null) {
        // Keep only results that have a relevance score meeting the threshold
        r = r.filter((res) => res.relevance != null && res.relevance >= threshold);
      }
    }
    return r;
  }, [results, filters]);

  const hasActiveFilters = filters.website !== "all" || filters.relevance !== "all";

  // Snap back to page 1 whenever the relevance filter is toggled
  useEffect(() => {
    if (page > 1) {
      navigate(`/search?q=${encodeURIComponent(query)}&page=1`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.relevance]);

  const handleNewSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const pageNumbers = (): (number | "â€¦")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums: (number | "â€¦")[] = [1];
    if (page > 3) nums.push("â€¦");
    for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) nums.push(p);
    if (page < totalPages - 2) nums.push("â€¦");
    nums.push(totalPages);
    return nums;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <header className="py-3 px-6 border-b bg-white/90 backdrop-blur-sm sticky top-0 z-10" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors">
              <ArrowLeft className="h-4 w-4" style={{ color: "var(--navy)" }} />
            </button>
            <div className="flex-1">
              <AISearchBar onSearch={handleNewSearch} placeholder={query} />
            </div>
            <button
              onClick={() => navigate("/chat")}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all hover:shadow-md flex-shrink-0"
              style={{ backgroundColor: "var(--navy)", color: "var(--ivory)" }}
            >
              <MessageSquare className="h-4 w-4" />
              Chat Instead
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-5 rounded-xl border sticky top-20" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" style={{ color: "var(--navy)" }} />
                  <h3 className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "var(--font-sans)" }}>Filters</h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() => setFilters({ website: "all", relevance: "all" })}
                    className="text-[11px] hover:underline"
                    style={{ color: "var(--maroon)" }}
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-5">
                {[
                  { label: "Website", key: "website" as const, options: [
                    { value: "all",           label: "All Sources" },
                    { value: "culture",        label: "Ministry of Culture" },
                    { value: "indianculture",  label: "Indian Culture Portal" },
                    { value: "museums",        label: "Museums of India" },
                    { value: "vedic",          label: "Vedic Heritage Portal" },
                  ]},
                ].map((filter) => (
                  <div key={filter.key}>
                    <label className="block mb-1.5 text-xs font-medium" style={{ color: "var(--navy)" }}>{filter.label}</label>
                    <select
                      value={filters[filter.key]}
                      onChange={(e) => setFilters({ ...filters, [filter.key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-[10px] uppercase tracking-wider font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>Quick Links</p>
                <div className="space-y-1.5">
                  {[
                    { label: "Ministry of Culture",    url: "https://culture.gov.in" },
                    { label: "Indian Culture Portal",  url: "https://indianculture.gov.in" },
                    { label: "Museums of India",       url: "https://museumsofindia.gov.in" },
                    { label: "Vedic Heritage Portal",  url: "https://vedicheritage.gov.in" },
                  ].map(({ label, url }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left text-xs px-2.5 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2"
                      style={{ color: "var(--navy)" }}
                    >
                      <ChevronRight className="h-3 w-3 opacity-40" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Results */}
          <main className="lg:col-span-3">
            {/* Query Header */}
            <div className="mb-5">
              <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Search results for</p>
              <h2 className="text-2xl mb-2" style={{ color: "var(--navy)" }}>{query}</h2>
              {!isLoading && (
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" />Portals searched</span>
                  <span className="opacity-30">|</span>
                  <span>
                    {hasActiveFilters
                      ? `${filteredResults.length} of ${totalResults > 0 ? totalResults : results.length} results`
                      : `${totalResults > 0 ? totalResults : results.length} results found`}
                  </span>
                </div>
              )}
            </div>

            {/* AI Summary */}
            {!isLoading && aiSummary && (
              <div className="mb-6 p-5 rounded-xl border-l-4 bg-white shadow-sm" style={{ borderLeftColor: "var(--gold)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(198,167,94,0.12)" }}>
                    <Sparkles className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "var(--font-sans)" }}>AI Summary</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>
                        <Shield className="h-2.5 w-2.5 inline mr-0.5" />RAG Verified
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{aiSummary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {isLoading ? (
              <LoadingState message="Searching across Ministry portals..." />
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-sm font-medium mb-1" style={{ color: "var(--navy)" }}>Search unavailable</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Could not reach the search service. Please check your connection and try again.
                </p>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <SearchResultCard key={result.id} {...result} />
                ))}
              </div>
            ) : (
              <EmptyState suggestions={["Indian classical dance", "Museums in Delhi", "Historical monuments"]} />
            )}

            {/* Relevance-filter note: pagination is disabled when filtering */}
            {!isLoading && filters.relevance !== "all" && totalPages > 1 && (
              <p className="mt-4 text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
                Relevance filter applies to the current page only.{" "}
                <button
                  onClick={() => setFilters((f) => ({ ...f, relevance: "all" }))}
                  className="underline"
                  style={{ color: "var(--maroon)" }}
                >
                  Clear filter
                </button>{" "}
                to browse all pages.
              </p>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && filters.relevance === "all" && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--gold)] hover:bg-[var(--muted)]"
                  style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>

                <div className="flex gap-1">
                  {pageNumbers().map((p, i) =>
                    p === "â€¦" ? (
                      <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm" style={{ color: "var(--muted-foreground)" }}>â€¦</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p as number)}
                        className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: p === page ? "var(--navy)" : "transparent",
                          color: p === page ? "var(--ivory)" : "var(--navy)",
                          border: p === page ? "none" : "1px solid var(--border)",
                        }}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--gold)] hover:bg-[var(--muted)]"
                  style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Related Searches */}
            {!isLoading && relatedQueries.length > 0 && (
              <div className="mt-8 p-5 rounded-xl bg-white border" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Related Searches</p>
                <div className="flex flex-wrap gap-2">
                  {relatedQueries.map((rq, i) => (
                    <button
                      key={i}
                      onClick={() => handleNewSearch(rq)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs border hover:border-[var(--gold)] hover:bg-[var(--muted)] transition-all"
                      style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                    >
                      <Sparkles className="h-3 w-3" style={{ color: "var(--gold)" }} />
                      {rq}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Chatbot */}
      <ChatbotPopup />
    </div>
  );
}
