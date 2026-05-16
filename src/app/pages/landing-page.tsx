import { AISearchBar } from "../components/ai-search-bar";
import { ChatbotPopup } from "../components/chatbot-popup";
import { BhashiniLanguageSelector } from "../components/bhashini-language-selector";
import { SaathiAvatar } from "../components/saathi-avatar";
import { usePageLanguage, t } from "../context/language-context";
import { useNavigate } from "react-router";
const GOVT_EMBLEM = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/250px-Emblem_of_India.svg.png";
import {
  MessageSquare,
  ExternalLink,
  BookOpen,
  Landmark,
  Music,
  ScrollText,
  Search,
  Sparkles,
  Globe,
  Shield,
  Zap,
  Brain,
  Languages,
  Mic,
  Database,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Bot,
  BarChart3,
  Monitor,
  Pause,
  Play,
  Volume2,
  Users,
  Building2,
  FileText,
  Award,
  Star,
  HelpCircle,
  Contrast,
  Droplet,
  Link2,
  ImageOff,
  MousePointer2,
  X,
} from "lucide-react";
import { useState, useEffect, type SyntheticEvent } from "react";

// Cultural heritage images (Unsplash - free to use, verified working)
const heroImages = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=75", // Taj Mahal front
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=75", // Taj Mahal sunset
  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=75", // Hawa Mahal
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=75", // India Gate
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=75", // Varanasi
];

// Inline onError handler — swaps broken image to a verified heritage image, runs only once per node
const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "true";
  // Cycle through verified heritage images by index hash, so fallbacks aren't all identical
  const idx = (img.dataset.fallbackIdx ? parseInt(img.dataset.fallbackIdx, 10) : 0) % heroImages.length;
  img.src = heroImages[idx];
};

const culturalCards = [
  {
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=75",
    title: "Monuments & Heritage Sites",
    desc: "3,696+ ASI-protected monuments across India",
    tag: "40 UNESCO Sites",
  },
  {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=75",
    title: "Museums & Galleries",
    desc: "National Museum, NGMA, Indian Museum & more",
    tag: "800+ Museums",
  },
  {
    image: "https://images.unsplash.com/photo-1583394293214-28a4b0a5dc6e?auto=format&fit=crop&w=600&q=75",
    title: "Performing Arts",
    desc: "8 classical dance forms, music & theatre traditions",
    tag: "Living Heritage",
  },
  {
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=75",
    title: "Archives & Manuscripts",
    desc: "50M+ pages of historical records digitized",
    tag: "Digital Archive",
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { language: lang, isTranslating } = usePageLanguage();
  const [currentBg, setCurrentBg] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [offeringsTab, setOfferingsTab] = useState<"schemes" | "vacancies" | "tenders">("schemes");
  const [gyanLogoFailed, setGyanLogoFailed] = useState(false);
  const [vandeLogoFailed, setVandeLogoFailed] = useState(false);
  // Accessibility controls — fontScale 0=100%, 1=110%, 2=120%, 3=130%, -1=90%
  const [fontScale, setFontScale] = useState(0);
  const [darkContrast, setDarkContrast] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [desaturate, setDesaturate] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  // Apply font scale to <html> root
  useEffect(() => {
    const sizes: Record<number, string> = { [-1]: "90%", 0: "100%", 1: "110%", 2: "120%", 3: "130%" };
    document.documentElement.style.fontSize = sizes[fontScale] || "100%";
    return () => { document.documentElement.style.fontSize = "100%"; };
  }, [fontScale]);

  // Apply accessibility toggles as body classes (CSS handles the rest)
  useEffect(() => {
    const map: [boolean, string][] = [
      [darkContrast, "a11y-dark-contrast"],
      [invertColors, "a11y-invert"],
      [desaturate, "a11y-desaturate"],
      [highlightLinks, "a11y-highlight-links"],
      [hideImages, "a11y-hide-images"],
      [bigCursor, "a11y-big-cursor"],
    ];
    map.forEach(([on, cls]) => document.body.classList.toggle(cls, on));
    return () => map.forEach(([_, cls]) => document.body.classList.remove(cls));
  }, [darkContrast, invertColors, desaturate, highlightLinks, hideImages, bigCursor]);

  const resetA11y = () => {
    setFontScale(0);
    setDarkContrast(false);
    setInvertColors(false);
    setDesaturate(false);
    setHighlightLinks(false);
    setHideImages(false);
    setBigCursor(false);
  };
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroImages.length).fill(false));
  const [typedText, setTypedText] = useState("");
  const typingQueries = [
    "Tell me about the Ajanta Caves...",
    "What are the classical dance forms of India?",
    "Show me museums in Delhi...",
    "Explain the significance of Vedic heritage...",
    "Who built the Konark Sun Temple?",
  ];
  const [queryIndex, setQueryIndex] = useState(0);

  // Preload all hero images
  useEffect(() => {
    heroImages.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      };
      img.src = src;
    });
  }, []);

  // Background image rotation — only start after first image loads
  useEffect(() => {
    if (!imagesLoaded[0]) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  // Carousel slide rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Typing animation
  useEffect(() => {
    const query = typingQueries[queryIndex];
    let charIndex = 0;
    setTypedText("");
    const typeInterval = setInterval(() => {
      if (charIndex <= query.length) {
        setTypedText(query.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setQueryIndex((prev) => (prev + 1) % typingQueries.length);
        }, 2000);
      }
    }, 60);
    return () => clearInterval(typeInterval);
  }, [queryIndex]);

  const suggestedQueries = [
    { text: "Tell me about Ajanta caves", icon: Landmark },
    { text: "List museums in India", icon: BookOpen },
    { text: "Indian classical dance forms", icon: Music },
    { text: "Historical monuments of India", icon: Landmark },
    { text: "What are the Vedas?", icon: ScrollText },
    { text: "National Archives of India", icon: Search },
  ];

  const features = [
    {
      icon: Brain,
      title: "LLM-Powered Semantic Search",
      desc: "Open-source Large Language Model with RAG architecture for context-aware, fact-grounded responses.",
    },
    {
      icon: Bot,
      title: "Agentic AI Chatbot",
      desc: "Conversational interface with Dynamic LLM Orchestration across 3+ models for accuracy and speed.",
    },
    {
      icon: Languages,
      title: "Multi-lingual Support",
      desc: "Search and chat in English, Hindi and other Indian languages with Bhashini API integration.",
    },
    {
      icon: Database,
      title: "66 Portals Indexed",
      desc: "Real-time semantic crawling and indexing across all Ministry of Culture websites and portals.",
    },
    {
      icon: Shield,
      title: "RAG Source Verification",
      desc: "Every response grounded in verified sources with citations, confidence scoring and hallucination prevention.",
    },
    {
      icon: Zap,
      title: "Sub-3s Response Time",
      desc: "GPU-accelerated inference on MeitY-empanelled infrastructure with 99.5% uptime SLA.",
    },
  ];

  // Primary sources: 3 portals targeting 80-90% accuracy in PoC (per Ministry technical team feedback, 13 May 2026)
  const portalSources = [
    { name: "indianculture.gov.in", full: "Indian Culture Portal", url: "https://indianculture.gov.in", priority: true },
    { name: "vedicheritage.gov.in", full: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in", priority: true },
    { name: "museumsofindia.gov.in", full: "Museums of India", url: "https://museumsofindia.gov.in/", priority: true },
    { name: "abhilekh-patal.in", full: "Abhilekh Patal", url: "https://abhilekh-patal.in", priority: false },
    { name: "mgmd.gov.in", full: "Mera Gaon Meri Dharohar", url: "https://mgmd.gov.in", priority: false },
    { name: "culture.gov.in", full: "Ministry of Culture", url: "https://culture.gov.in/", priority: false },
    { name: "asi.gov.in", full: "Archaeological Survey of India", url: "https://asi.gov.in", priority: false },
    { name: "nationalarchives.nic.in", full: "National Archives", url: "https://nationalarchives.nic.in", priority: false },
    { name: "ignca.gov.in", full: "IGNCA", url: "https://ignca.gov.in", priority: false },
    { name: "sangeetnatak.gov.in", full: "Sangeet Natak Akademi", url: "https://sangeetnatak.gov.in", priority: false },
    { name: "sahitya-akademi.gov.in", full: "Sahitya Akademi", url: "https://sahitya-akademi.gov.in", priority: false },
    { name: "lalitkala.gov.in", full: "Lalit Kala Akademi", url: "https://lalitkala.gov.in", priority: false },
    { name: "gandhismriti.gov.in", full: "Gandhi Smriti", url: "https://gandhismriti.gov.in", priority: false },
    { name: "nma.gov.in", full: "National Monuments Authority", url: "https://nma.gov.in", priority: false },
    { name: "gyanbharatam.com", full: "Gyan Bharatam", url: "https://gyanbharatam.com", priority: false },
  ];

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      {/* Bhashini translating overlay — shows briefly when user picks a new language */}
      {isTranslating && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: "rgba(11,31,59,0.55)" }}
          role="status"
          aria-live="polite"
        >
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex items-center gap-5" style={{ border: "2px solid #C9A961" }}>
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 animate-spin" style={{ borderColor: "var(--maroon)", borderTopColor: "transparent" }} />
              <div className="absolute inset-2 rounded-full" style={{ backgroundColor: "var(--maroon)" }} />
            </div>
            <div>
              <p className="text-base font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>
                {t("translating", lang)}
              </p>
              <p className="text-[11px] flex items-center gap-1 mt-1" style={{ color: "var(--muted-foreground)" }}>
                Powered by <span className="font-semibold" style={{ color: "#1B3E78" }}>BHASHINI</span> · Government of India
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Government Strip */}
      <div className="py-1.5 px-6 text-center text-[11px]" style={{ backgroundColor: "var(--navy)", color: "rgba(255,255,255,0.7)" }}>
        <span>{t("govStrip", lang)}</span>
      </div>

      {/* Header — culture.gov.in size-matched */}
      <header className="py-4 px-8 border-b bg-white sticky top-0 z-50" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between gap-6">
          {/* Left: Emblem + Title — larger to match original proportions */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <img
              src={GOVT_EMBLEM}
              alt="Government of India"
              className="h-16 md:h-20 w-auto object-contain"
            />
            <div className="pl-1">
              {/* Logo text — stays English regardless of language selection, brand identity */}
              <p className="text-base md:text-lg font-medium leading-tight" style={{ color: "var(--navy)" }}>
                Government of India
              </p>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight mt-0.5" style={{ color: "var(--navy)" }}>
                Ministry of Culture
              </h1>
            </div>
          </div>

          {/* Center: AI-Powered Search — compact bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 flex-col">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--maroon)" }}>
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Search
            </div>
            <AISearchBar onSearch={handleSearch} compact />
          </div>

          {/* Right: Gyan Bharatam + Vande Mataram + Accessibility + Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Gyan Bharatam logo — official image from culture.gov.in, SVG fallback if hotlink fails */}
            <div className="hidden lg:flex flex-col items-center justify-center leading-none">
              {!gyanLogoFailed ? (
                <img
                  src="https://culture.gov.in/files/inline-images/gyanlogo.png"
                  alt="Gyan Bharatam — National Mission for Manuscripts"
                  className="h-16 w-auto object-contain"
                  onError={() => setGyanLogoFailed(true)}
                />
              ) : (
                // Fallback only if the official URL is blocked/unreachable
                <>
                  <svg width="74" height="46" viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg" aria-label="Gyan Bharatam">
                    <rect x="6" y="58" width="128" height="22" rx="1" fill="#D9B17B" stroke="#6B3410" strokeWidth="0.8" />
                    <g stroke="#7B2A0C" strokeWidth="0.9" opacity="0.85">
                      <line x1="12" y1="63" x2="128" y2="64" />
                      <line x1="12" y1="68" x2="126" y2="69" />
                      <line x1="12" y1="73" x2="128" y2="74" />
                      <line x1="12" y1="77" x2="120" y2="78" />
                    </g>
                    <rect x="6" y="52" width="128" height="8" fill="#C99463" stroke="#6B3410" strokeWidth="0.6" />
                    <rect x="20" y="10" width="78" height="42" fill="#8B1A1A" stroke="#3D0A0A" strokeWidth="1.4" />
                    <rect x="30" y="18" width="58" height="26" fill="#E8C886" stroke="#6B3410" strokeWidth="0.6" />
                    <g>
                      <line x1="46" y1="6" x2="116" y2="80" stroke="#8B5A2B" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="116" cy="80" r="2" fill="#3D2510" />
                      <circle cx="46" cy="6" r="2.4" fill="#3D2510" />
                    </g>
                  </svg>
                  <span className="text-[11px] leading-tight font-bold italic mt-0.5" style={{ color: "#1a1a1a", fontFamily: "var(--font-serif)" }}>
                    ज्ञानभारतम्
                  </span>
                </>
              )}
            </div>
            {/* 150 Years of Vande Mataram — official banner from culture.gov.in, text fallback */}
            <div className="hidden lg:flex items-center">
              {!vandeLogoFailed ? (
                <img
                  src="https://culture.gov.in/files/home-page-banner-images/vande-mataram-logo.jpg"
                  alt="150 Years of Vande Mataram"
                  className="h-16 w-auto object-contain"
                  onError={() => setVandeLogoFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-start leading-none px-1">
                  <span className="text-base" style={{ color: "#1B3E78", fontFamily: "var(--font-serif)" }}>150 Years of</span>
                  <span
                    className="text-3xl font-bold italic mt-1"
                    style={{
                      color: "#1B3E78",
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      letterSpacing: "0.01em",
                      lineHeight: "1",
                    }}
                  >
                    Vande Mataram
                  </span>
                </div>
              )}
            </div>
            {/* Accessibility icons row — larger to match original */}
            <div className="hidden md:flex items-center gap-1.5 border-l pl-3 ml-1 relative" style={{ borderColor: "#ddd" }}>
              <BhashiniLanguageSelector />
              {/* Accessibility panel toggle */}
              <button
                onClick={() => setA11yOpen((o) => !o)}
                aria-label="Accessibility options"
                aria-expanded={a11yOpen}
                title="Accessibility options"
                className="w-9 h-9 rounded border flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                style={{
                  borderColor: darkContrast || a11yOpen ? "var(--maroon)" : "#ddd",
                  backgroundColor: darkContrast ? "#FFF6E5" : "transparent",
                  color: "var(--maroon)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="4" r="2" />
                  <path d="M12 6v6m-4-2h8m-6 2l-2 8m6-8l2 8" />
                </svg>
              </button>

              {/* Accessibility Controls — 8-button grid (GIGW-style govt a11y widget) */}
              {a11yOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-[440px] rounded-lg shadow-2xl border z-[100] p-5"
                  style={{ backgroundColor: "#fff", borderColor: "#ddd" }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--maroon)" }}>
                        <circle cx="12" cy="4" r="2" />
                        <path d="M12 6v6m-4-2h8m-6 2l-2 8m6-8l2 8" />
                      </svg>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--navy)" }}>Accessibility Controls</h3>
                    </div>
                    <button
                      onClick={() => setA11yOpen(false)}
                      className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* 2 × 4 grid of toggles */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        key: "darkContrast",
                        label: "Dark Contrast",
                        icon: <Contrast className="h-7 w-7" />,
                        active: darkContrast,
                        onClick: () => setDarkContrast((v) => !v),
                      },
                      {
                        key: "invert",
                        label: "Invert",
                        icon: (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a10 10 0 100 20V2z" />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                          </svg>
                        ),
                        active: invertColors,
                        onClick: () => setInvertColors((v) => !v),
                      },
                      {
                        key: "saturation",
                        label: "Saturation",
                        icon: <Droplet className="h-7 w-7" />,
                        active: desaturate,
                        onClick: () => setDesaturate((v) => !v),
                      },
                      {
                        key: "textInc",
                        label: "Text Size Increase",
                        icon: <span className="text-2xl font-bold leading-none">A<sup className="text-base">+</sup></span>,
                        active: fontScale > 0,
                        onClick: () => setFontScale((s) => Math.min(s + 1, 3)),
                      },
                      {
                        key: "textDec",
                        label: "Text Size Decrease",
                        icon: <span className="text-2xl font-bold leading-none">A<sup className="text-base">−</sup></span>,
                        active: fontScale < 0,
                        onClick: () => setFontScale((s) => Math.max(s - 1, -1)),
                      },
                      {
                        key: "links",
                        label: "Highlight Links",
                        icon: <Link2 className="h-7 w-7" />,
                        active: highlightLinks,
                        onClick: () => setHighlightLinks((v) => !v),
                      },
                      {
                        key: "images",
                        label: "Hide Images",
                        icon: <ImageOff className="h-7 w-7" />,
                        active: hideImages,
                        onClick: () => setHideImages((v) => !v),
                      },
                      {
                        key: "cursor",
                        label: "Default Cursor",
                        icon: <MousePointer2 className="h-7 w-7" />,
                        active: bigCursor,
                        onClick: () => setBigCursor((v) => !v),
                      },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={opt.onClick}
                        aria-pressed={opt.active}
                        className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg border-2 transition-all hover:bg-[#FFF6E5]"
                        style={{
                          borderColor: opt.active ? "var(--maroon)" : "#ddd",
                          backgroundColor: opt.active ? "#FFF6E5" : "#fff",
                          color: "var(--maroon)",
                        }}
                      >
                        <span className="flex items-center justify-center" style={{ color: "var(--maroon)" }}>{opt.icon}</span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-center px-1" style={{ color: "var(--maroon)" }}>
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Reset */}
                  <button
                    onClick={resetA11y}
                    className="w-full mt-4 text-xs px-3 py-2 rounded border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#ddd", color: "var(--navy)" }}
                  >
                    Reset all
                  </button>
                  <p className="text-[10px] text-center mt-2 opacity-60" style={{ color: "var(--navy)" }}>
                    Compliant with GIGW 3.0 · WCAG 2.1
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("/admin")}
              className="text-sm px-4 py-2.5 rounded-lg border hover:bg-[var(--muted)] transition-colors inline-flex items-center gap-1.5"
              style={{ borderColor: "var(--border)", color: "var(--navy)" }}
            >
              <Monitor className="h-4 w-4" />
              {t("dashboard", lang)}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Menu — culture.gov.in style: left-aligned, maroon active underline, with hover dropdowns */}
      <nav className="border-b bg-white z-40 relative" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 px-6 overflow-visible max-w-7xl mx-auto">
          {[
            { label: t("home", lang), items: [] as string[], active: true },
            { label: t("ministry", lang), items: ["About Ministry", "Organisation Chart", "Who's Who", "Subordinate Offices", "Autonomous Bodies", "Attached Offices", "Public Sector Undertakings"], active: false },
            { label: t("offerings", lang), items: ["Schemes", "Awards", "Vacancies and Advertisement", "Tenders", "Commemorations", "International Cultural Relations"], active: false },
            { label: t("documents", lang), items: ["Reports", "Act and Policies", "Circular, Orders and Notices", "Publications", "MoU / Others", "Press Release", "Gazettes Notifications", "Guidelines", "E-Sanskriti"], active: false },
            { label: t("media", lang), items: ["Photo Gallery", "Video Gallery", "Press Releases", "Newsletter"], active: false },
            { label: t("connect", lang), items: ["Contact Us", "Feedback", "Citizen Charter", "RTI", "Public Grievance"], active: false },
          ].map((item) => (
            <div key={item.label} className="relative group">
              <button
                className="px-6 py-5 text-lg font-medium transition-colors hover:text-[var(--maroon)] relative whitespace-nowrap inline-flex items-center gap-2 group-hover:bg-[#FCE9D9]"
                style={{ color: item.active ? "var(--maroon)" : "var(--navy)" }}
              >
                {item.label}
                {item.items.length > 0 && (
                  <ChevronRight className="h-4 w-4 rotate-90 group-hover:rotate-[270deg] transition-transform" />
                )}
                {item.active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[3px]" style={{ backgroundColor: "var(--maroon)" }}></span>
                )}
              </button>
              {/* Dropdown menu — appears on hover, dark maroon bg like culture.gov.in */}
              {item.items.length > 0 && (
                <div
                  className="absolute left-0 top-full min-w-[220px] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl"
                  style={{ backgroundColor: "rgba(46, 22, 16, 0.92)" }}
                >
                  {item.items.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-5 py-2.5 text-sm text-white text-center hover:bg-white/10 transition-colors"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* HERO SECTION — culture.gov.in style cream/beige carousel */}
      <section className="relative overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={() => setSlideIndex((prev) => (prev - 1 + 3) % 3)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#2A1A14", color: "#fff" }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {/* Right arrow */}
        <button
          onClick={() => setSlideIndex((prev) => (prev + 1) % 3)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#2A1A14", color: "#fff" }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* === SLIDE 1: Gyan Bharatam — saffron gradient with Hindi heading, phone mockup, PM Modi quote === */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            display: slideIndex === 0 ? "block" : "none",
            background: "linear-gradient(135deg, #E87722 0%, #D45F0E 60%, #B84A00 100%)",
            minHeight: "500px",
          }}
        >
          {/* Manuscript shelves backdrop texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583407723467-9b2d22504831?auto=format&fit=crop&w=1600&q=50')", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "overlay" }} />

          {/* Ministry of Culture seal — top-left, white */}
          <div className="absolute top-4 left-6 flex items-center gap-2 z-10">
            <img src={GOVT_EMBLEM} alt="" className="w-10 h-10 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            <div className="text-[10px] leading-tight text-white">
              <p className="font-bold">Ministry of Culture</p>
              <p>Government of India</p>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-14 pt-6 pb-3 grid grid-cols-12 gap-3 items-center min-h-[440px]">
            {/* Left: smartphone mockup with Gyan Bharatam app */}
            <div className="col-span-12 md:col-span-3 flex justify-center">
              <div className="relative w-44 h-80 rounded-[2rem] bg-gradient-to-br from-gray-800 to-black shadow-2xl p-1.5" style={{ border: "5px solid #1a1a1a" }}>
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-b-xl bg-black z-10" />
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-orange-50 flex flex-col items-center justify-start text-center px-2 pt-4">
                  <p className="text-[8px] text-gray-700 font-bold self-start ml-1">9:41</p>
                  {/* App logo */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-6 h-6 rounded bg-orange-200 flex items-center justify-center text-[6px] font-bold text-orange-800">ज्ञान</div>
                    <span className="text-[7px] font-bold text-orange-900">ज्ञानभारतम्</span>
                  </div>
                  <p className="text-[7px] mt-2 font-bold text-orange-900 leading-tight">Join India's Digital Survey for<br/>Manuscript Preservation</p>
                  <p className="text-[5.5px] mt-1 text-gray-700 leading-tight px-1">Submit your manuscripts for safe digitisation directly from your mobile.</p>
                  <button className="mt-2 text-[6px] bg-orange-600 text-white px-2 py-1 rounded font-semibold">Start Your Request →</button>
                  <p className="text-[6px] mt-3 font-bold text-orange-900 self-start ml-1">Featured Manuscripts</p>
                  <p className="text-[5px] text-gray-600 self-start ml-1">Explore Newly Digitised Manuscripts</p>
                  <div className="flex gap-1 mt-1">
                    <div className="w-10 h-12 rounded shadow-sm" style={{ background: "linear-gradient(135deg,#d97706,#92400e)" }} />
                    <div className="w-10 h-12 rounded shadow-sm" style={{ background: "linear-gradient(135deg,#b45309,#78350f)" }} />
                  </div>
                  <p className="text-[5px] mt-1 self-start ml-1 text-gray-700">Gilgit Manuscript</p>
                </div>
              </div>
            </div>

            {/* Center: English headline + QR section */}
            <div className="col-span-12 md:col-span-6 text-center text-white">
              <p className="text-base md:text-lg mb-1 italic" style={{ fontFamily: "var(--font-serif)" }}>
                Let Us Preserve India's Timeless Manuscript Heritage Together!
              </p>
              <p className="text-base md:text-lg italic mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                Join the
              </p>
              <h1
                className="text-5xl md:text-7xl font-extrabold leading-none mb-1"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#FFD23F",
                  textShadow: "3px 3px 0 rgba(120,40,0,0.5), 0 0 30px rgba(255,210,63,0.3)",
                  letterSpacing: "-0.02em",
                }}
              >
                Gyan Bharatam
              </h1>
              <h2 className="text-xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                National Survey Of Manuscripts
              </h2>
              <p className="text-sm md:text-base italic mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                To participate in the survey
              </p>

              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                {/* Column 1: App download */}
                <div className="text-center">
                  <p className="text-[11px] font-semibold mb-1">Download the Gyan Bharatam App</p>
                  <p className="text-[9px] opacity-85 mb-1.5">Scan the QR Code</p>
                  <div className="flex gap-1 justify-center mb-1.5">
                    <div className="bg-black rounded px-1.5 py-0.5 flex items-center gap-1">
                      <span className="text-[6px] text-white opacity-70 leading-none">GET IT ON</span>
                      <span className="text-[8px] text-white font-bold">▶ Google Play</span>
                    </div>
                    <div className="bg-black rounded px-1.5 py-0.5 flex items-center gap-1">
                      <span className="text-[6px] text-white opacity-70 leading-none">Download on the</span>
                      <span className="text-[8px] text-white font-bold">App Store</span>
                    </div>
                  </div>
                  <div className="bg-white p-1.5 rounded inline-block">
                    <svg width="64" height="64" viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><g fill="black"><rect x="8" y="8" width="22" height="22"/><rect x="14" y="14" width="10" height="10" fill="white"/><rect x="70" y="8" width="22" height="22"/><rect x="76" y="14" width="10" height="10" fill="white"/><rect x="8" y="70" width="22" height="22"/><rect x="14" y="76" width="10" height="10" fill="white"/><rect x="40" y="10" width="6" height="6"/><rect x="50" y="20" width="6" height="6"/><rect x="60" y="40" width="8" height="8"/><rect x="40" y="50" width="6" height="6"/><rect x="50" y="60" width="6" height="6"/><rect x="35" y="70" width="6" height="6"/><rect x="60" y="80" width="6" height="6"/><rect x="80" y="50" width="8" height="8"/><rect x="80" y="65" width="6" height="6"/></g></svg>
                  </div>
                </div>
                {/* Column 2: Survey online */}
                <div className="text-center">
                  <p className="text-[11px] font-semibold mb-1">Fill the Survey Online</p>
                  <div className="bg-black rounded-full inline-flex items-center gap-1 px-2.5 py-1 mb-1.5">
                    <Globe className="h-2.5 w-2.5 text-white" />
                    <span className="text-[10px] text-white font-semibold">gyanbharatam.com</span>
                  </div>
                  <p className="text-[9px] opacity-85 mb-1.5">Scan the QR Code</p>
                  <div className="bg-white p-1.5 rounded inline-block">
                    <svg width="64" height="64" viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><g fill="black"><rect x="8" y="8" width="22" height="22"/><rect x="14" y="14" width="10" height="10" fill="white"/><rect x="70" y="8" width="22" height="22"/><rect x="76" y="14" width="10" height="10" fill="white"/><rect x="8" y="70" width="22" height="22"/><rect x="14" y="76" width="10" height="10" fill="white"/><rect x="45" y="15" width="6" height="6"/><rect x="55" y="25" width="6" height="6"/><rect x="40" y="40" width="8" height="8"/><rect x="55" y="45" width="6" height="6"/><rect x="65" y="55" width="6" height="6"/><rect x="40" y="60" width="6" height="6"/><rect x="55" y="70" width="8" height="8"/><rect x="40" y="80" width="6" height="6"/><rect x="80" y="55" width="6" height="6"/><rect x="80" y="75" width="6" height="6"/></g></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: PM Modi photo + quote card */}
            <div className="col-span-12 md:col-span-3 flex flex-col items-center justify-end self-end">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait.png/440px-Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait.png"
                alt="PM Narendra Modi"
                className="h-72 w-auto object-contain object-bottom"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="bg-orange-50/95 rounded-lg p-3 max-w-[260px] shadow-xl -mt-2" style={{ border: "2px solid #FFE57F" }}>
                <p className="text-[10px] italic leading-snug mb-1.5" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>
                  <span className="text-lg leading-none">"</span>
                  In the ancient manuscripts of India, we observe the continuous flow of the nation's history. These manuscripts serve as both a manifesto and a declaration of our spirit of unity in diversity.
                  <span className="text-lg leading-none">"</span>
                </p>
                <p className="text-[10px] font-bold text-right" style={{ color: "var(--maroon)" }}>— Narendra Modi</p>
                <p className="text-[9px] text-right opacity-75" style={{ color: "var(--maroon)" }}>Prime Minister</p>
              </div>
            </div>
          </div>
        </div>

        {/* === SLIDE 2: Sanskriti Saathi AI Launch — cream/beige poster === */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            display: slideIndex === 1 ? "block" : "none",
            background: "linear-gradient(180deg, #F5E4C8 0%, #F0D9A8 100%)",
            minHeight: "500px",
          }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(124,29,42,0.3) 1px, transparent 0)", backgroundSize: "20px 20px" }} />

          <div className="relative max-w-7xl mx-auto px-14 py-5 grid grid-cols-12 gap-6 items-center min-h-[440px]">
            {/* Top banner: Ministry seal */}
            <div className="col-span-12 flex items-center justify-center gap-3 mb-2">
              <img src={GOVT_EMBLEM} alt="" className="w-12 h-12 object-contain" />
              <div className="text-center">
                <p className="text-xs font-semibold" style={{ color: "var(--maroon)" }}>Ministry of Culture</p>
                <p className="text-[10px]" style={{ color: "var(--maroon)" }}>Government of India</p>
              </div>
            </div>

            {/* Left: Indian-styled avatar illustration */}
            <div className="col-span-12 md:col-span-3 flex justify-center">
              <div className="relative w-44 h-56 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shadow-lg" style={{ border: "3px solid #C9A961" }}>
                <SaathiAvatar size={140} />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ backgroundColor: "var(--maroon)", color: "#fff" }}>
                  Sanskriti Saathi
                </div>
              </div>
            </div>

            {/* Center: Bilingual headline banner */}
            <div className="col-span-12 md:col-span-6 text-center" style={{ color: "var(--maroon)" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-[10px] font-bold tracking-widest" style={{ backgroundColor: "var(--maroon)", color: "#fff" }}>
                <Sparkles className="h-3 w-3" /> NOW LAUNCHING
              </div>
              {/* Banner-style title */}
              <div className="relative inline-block px-8 py-3 mb-3" style={{ background: "linear-gradient(135deg, #1B3E78 0%, #2A5A9F 100%)", clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)" }}>
                <p className="text-base md:text-lg font-semibold text-white" style={{ fontFamily: "var(--font-serif)" }}>
                  AI-Powered Cultural Heritage Assistant for
                </p>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-none mb-1" style={{ fontFamily: "var(--font-serif)", color: "#B84A00" }}>
                Sanskriti Saathi
              </h1>
              <p className="text-lg md:text-xl mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                आपका सांस्कृतिक साथी · Your Cultural Companion
              </p>
              <div className="border-t border-b py-2 my-2 inline-block px-6" style={{ borderColor: "rgba(124,29,42,0.3)" }}>
                <p className="text-base md:text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
                  Search · Ask · Explore  |  66 Cultural Portals
                </p>
              </div>
              <p className="text-sm">powered by <span className="font-bold">Open-source LLMs · RAG architecture · Bhashini multilingual</span></p>
            </div>

            {/* Right: feature highlights */}
            <div className="col-span-12 md:col-span-3 flex flex-col gap-2">
              {[
                { icon: Brain, label: "Semantic Search" },
                { icon: Languages, label: "22 Indian Languages" },
                { icon: Shield, label: "Source-Cited Answers" },
                { icon: Zap, label: "Sub-3s Response" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-lg shadow-sm" style={{ border: "1px solid #C9A961" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--maroon)" }}>
                    <f.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--maroon)" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === SLIDE 3: Sacred Exposition — cream with poster-style content === */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            display: slideIndex === 2 ? "block" : "none",
            backgroundColor: "#F5E4C8",
            minHeight: "500px",
          }}
        >
          {/* Ministry logo top-right */}
          <div className="absolute top-4 right-14 flex items-center gap-2">
            <img src={GOVT_EMBLEM} alt="" className="w-10 h-10 object-contain" />
            <div className="text-[10px] leading-tight" style={{ color: "var(--maroon)" }}>
              <p className="font-bold">Ministry of Culture</p>
              <p>Government of India</p>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-14 py-4 grid grid-cols-12 gap-4 items-center min-h-[360px]">
            {/* Left: Varanasi ghats — Indian sacred imagery */}
            <div className="col-span-12 md:col-span-3 flex justify-center">
              <div className="relative w-44 md:w-56 h-64 md:h-72 rounded-md overflow-hidden shadow-lg" style={{ border: "3px solid #C9A961" }}>
                <img
                  src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=75"
                  alt="Varanasi — sacred Indian heritage"
                  className="w-full h-full object-cover"
                  data-fallback-idx="4"
                  onError={handleImgError}
                />
              </div>
            </div>

            {/* Center: poster-style serif text */}
            <div className="col-span-12 md:col-span-6 text-center" style={{ color: "var(--maroon)" }}>
              <p className="text-base md:text-lg leading-snug mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                A Rare Spiritual Opportunity to Connect with
              </p>
              <p className="text-base md:text-lg leading-snug mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                Buddha's Universal Message of Humanity and Compassion
              </p>
              <h2 className="text-2xl md:text-3xl leading-tight" style={{ fontFamily: "var(--font-serif)", color: "#8B6914" }}>
                Sacred Exposition of the
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-3" style={{ fontFamily: "var(--font-serif)", color: "#8B6914" }}>
                Holy Relics of the Tathagata
              </h1>
              <div className="border-t pt-2 mb-2" style={{ borderColor: "rgba(124,29,42,0.3)" }}>
                <p className="text-lg md:text-xl italic" style={{ fontFamily: "var(--font-serif)", color: "#8B6914" }}>
                  peace beyond borders  |  1st to 14th May 2026
                </p>
              </div>
              <p className="text-sm md:text-base" style={{ fontFamily: "var(--font-serif)" }}>
                commemorating the <span className="font-bold">2569th Vesak Buddha Purnima</span>
              </p>
            </div>

            {/* Right: circular image collage — all verified Indian heritage sites */}
            <div className="col-span-12 md:col-span-3 flex justify-center">
              <div className="relative w-44 md:w-56 h-64 md:h-72">
                {[
                  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=75", // Hawa Mahal, Jaipur
                  "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75", // India Gate, Delhi
                  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75", // Taj Mahal, Agra
                ].map((img, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full overflow-hidden shadow-md"
                    style={{
                      width: "55%",
                      height: "45%",
                      top: `${i * 27}%`,
                      left: i % 2 === 0 ? "0%" : "40%",
                      border: "3px solid #C9A961",
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      data-fallback-idx={String(i % heroImages.length)}
                      onError={handleImgError}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Events strip — only on Sacred Exposition slide */}
          <div className="relative max-w-7xl mx-auto px-14 pb-4">
            <div className="flex justify-center mb-3">
              <span className="px-5 py-1 text-xs font-bold tracking-wider rounded-full" style={{ backgroundColor: "#FFF6E5", color: "var(--maroon)", border: "1.5px solid var(--maroon)", fontFamily: "var(--font-serif)" }}>
                Key Events
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
              {[
                { title: "Kushok Bakula Rinpoche\nMemorial Lecture Series", meta: "2nd May 2026  |  CIBS, Choglamsar, Leh" },
                { title: "Cultural Evening", meta: "2nd May 2026  |  Leh Market, Leh" },
                { title: "Silent Peace Walk", meta: "4th May 2026  |  Leh Market, Leh" },
                { title: "Exposition of the Holy Relics in Zanskar", meta: "11 to 13th May 2026  |  Zanskar" },
                { title: "Talk on Modern Science & Buddhist Philosophy", meta: "13th May 2026  |  CIBS, Choglamsar, Leh" },
              ].map((event, i, arr) => (
                <div
                  key={i}
                  className="px-3 py-1 text-center"
                  style={{ borderRight: i < arr.length - 1 ? "1.5px dotted rgba(124,29,42,0.4)" : "none" }}
                >
                  <p className="text-xs md:text-sm font-bold leading-tight mb-1 whitespace-pre-line" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>
                    {event.title}
                  </p>
                  <p className="text-[10px] md:text-[11px]" style={{ color: "var(--maroon)", opacity: 0.85 }}>
                    {event.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination dots + play/pause — pink dots like culture.gov.in */}
        <div className="absolute bottom-3 right-14 z-20 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className="rounded-full transition-all"
              style={{
                width: slideIndex === i ? "12px" : "10px",
                height: slideIndex === i ? "12px" : "10px",
                backgroundColor: slideIndex === i ? "var(--maroon)" : "#F5C4D0",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="ml-2 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90 shadow-md"
            style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "var(--maroon)" }}
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </div>
      </section>

      {/* Announcements Ticker — placed below hero, culture.gov.in style */}
      <div className="py-2.5 px-6 flex items-center gap-4 overflow-hidden" style={{ backgroundColor: "#E5E1DC" }}>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-base font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>
            {t("announcements", lang)}
          </span>
          <Volume2 className="h-4 w-4" style={{ color: "var(--maroon)" }} />
        </div>
        <div className="overflow-hidden flex-1">
          <div className="whitespace-nowrap animate-marquee text-sm" style={{ color: "#3a3a3a" }}>
            <span className="mx-6">▸ Request for Proposal (RFP) for engagement of an Event Management Agency for organizing the Parakram Diwas, 2026</span>
            <span className="mx-6">▸ Gyan Bharatam — National Survey of Manuscripts launched</span>
            <span className="mx-6">▸ Lalit Kala Akademi Scholarship Forms 2024-25 — Last date extended</span>
            <span className="mx-6">▸ Athirathram Vedic Ceremony documented at Kerala Kalamandalam</span>
            <span className="mx-6">▸ 150 Years of Vande Mataram — National Programme</span>
          </div>
        </div>
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90"
          style={{ backgroundColor: "var(--maroon)", color: "#fff" }}
          aria-label="Pause announcements"
        >
          <Pause className="h-3 w-3" />
        </button>
      </div>

      {/* QUICK ACCESS CARDS — culture.gov.in style: Our Ministry / Organisations / Performance */}
      <section className="py-8 px-6" style={{ backgroundColor: "#EEEAE5" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Users, label: t("ourMinistry", lang), desc: t("ourMinistryDesc", lang) },
              { icon: Building2, label: t("ourOrganisations", lang), desc: t("ourOrganisationsDesc", lang) },
              { icon: BarChart3, label: t("ourPerformance", lang), desc: t("ourPerformanceDesc", lang) },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <button
                  key={i}
                  className="group bg-white border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ borderColor: "var(--maroon)" }}
                >
                  <Icon className="h-8 w-8 mb-2 transition-transform group-hover:scale-110" style={{ color: "var(--maroon)", strokeWidth: 1.5 }} />
                  <h3 className="text-base font-bold mb-1" style={{ color: "var(--maroon)" }}>{card.label}</h3>
                  <p className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{card.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* KEY OFFERINGS + WHAT'S NEW — culture.gov.in two-column layout */}
      <section className="py-10 px-6" style={{ backgroundColor: "#EEEAE5" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Key Offerings with tabs (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFE4E6" }}>
                <Award className="h-5 w-5" style={{ color: "var(--maroon)" }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>{t("keyOfferings", lang)}</h2>
            </div>

            {/* Tabs — dark maroon active, light pink inactive */}
            <div className="grid grid-cols-3 gap-0">
              {(["schemes", "vacancies", "tenders"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setOfferingsTab(tab)}
                  className="py-3 text-base font-bold uppercase tracking-wider transition-colors"
                  style={{
                    backgroundColor: offeringsTab === tab ? "var(--maroon)" : "#FCE9D9",
                    color: offeringsTab === tab ? "#fff" : "var(--maroon)",
                  }}
                >
                  {t(tab, lang)}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="bg-white border border-t-0 p-2 max-h-72 overflow-y-auto" style={{ borderColor: "#E5E1DC" }}>
              {(() => {
                const items: Record<string, string[]> = {
                  schemes: [
                    "Financial Assistance for Tagore Cultural Complexes (TCC)",
                    "Financial Assistance for Allied Cultural Activities",
                    "Centenary and Anniversary Celebrations Scheme",
                    "Scheme of Financial Assistance under Seva Bhoj Yojna",
                    "Cultural Function & Production Grant",
                    "Senior & Junior Fellowships",
                    "Young Artists Scholarship Scheme",
                  ],
                  vacancies: [
                    "Director General, Archaeological Survey of India",
                    "Senior Research Officer — IGNCA",
                    "Assistant Director — National Museum",
                    "Conservation Specialist — Vedic Heritage Portal",
                    "Programme Officer — Sangeet Natak Akademi",
                  ],
                  tenders: [
                    "RFP — AI-Powered Semantic Search & Chatbot for 66 Cultural Portals",
                    "RFP — Event Management Agency for Parakram Diwas, 2026",
                    "Tender — Digitisation of Manuscripts under Gyan Bharatam Phase II",
                    "RFP — Conservation Services for ASI-Protected Monuments",
                    "Tender — Multilingual Content Creation (Bhashini integration)",
                  ],
                };
                return items[offeringsTab].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-[#FCE9D9]"
                    style={{ borderColor: "#E5E1DC", color: "var(--navy)" }}
                  >
                    <span className="text-sm">{item}</span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0" style={{ color: "var(--maroon)" }} />
                  </a>
                ));
              })()}
            </div>

            {/* View More button */}
            <div className="flex justify-end mt-3">
              <button className="px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-[#FCE9D9] transition-colors" style={{ backgroundColor: "#FFE4E6", color: "var(--maroon)" }}>
                {t("viewMore", lang)}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: What's New (1/3 width) */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFE4E6" }}>
                <Sparkles className="h-5 w-5" style={{ color: "var(--maroon)" }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>{t("whatsNew", lang)}</h2>
            </div>

            {/* Maroon panel with news items */}
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "var(--maroon)" }}>
              <div className="max-h-72 overflow-y-auto">
                {[
                  "Sewa Parv 2025: Viksit Bharat Ke Rang, Kala Ke Sang",
                  "Ministry of Culture Launches Swachhata Hi Seva 2025",
                  "Gyan Bharatam to Safeguard India's Manuscript Legacy",
                  "President Droupadi Murmu Inaugurates Two-Day National Literary Conference at Rashtrapati Bhavan",
                  "150 Years of Vande Mataram — National Programme launched",
                  "Sacred Exposition of Holy Relics of the Tathagata, Leh & Zanskar",
                ].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center justify-between gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-white/10 transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <span className="text-sm text-white leading-snug">{item}</span>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* View More button */}
            <div className="flex justify-end mt-3">
              <button className="px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-[#FCE9D9] transition-colors" style={{ backgroundColor: "#FFE4E6", color: "var(--maroon)" }}>
                {t("viewMore", lang)}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT DOCUMENTS + EXPLORE USER + IMPORTANT LINKS — culture.gov.in 3-column bottom strip */}
      <section className="py-10 px-6" style={{ backgroundColor: "#EEEAE5" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Documents */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFE4E6" }}>
                <FileText className="h-5 w-5" style={{ color: "var(--maroon)" }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>{t("recentDocuments", lang)}</h2>
            </div>
            <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "#E5E1DC" }}>
              {[
                "Annual Report 2024-25",
                "Outcome Budget 2025-26",
                "Citizens' Charter (Revised)",
                "Performance Dashboard Q3",
                "Public Grievance Status Report",
              ].map((doc, i) => (
                <a key={i} href="#" className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-[#FCE9D9] transition-colors" style={{ borderColor: "#E5E1DC" }}>
                  <span className="text-sm" style={{ color: "var(--navy)" }}>{doc}</span>
                  <ChevronRight className="h-4 w-4" style={{ color: "var(--maroon)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore User */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFE4E6" }}>
                <HelpCircle className="h-5 w-5" style={{ color: "var(--maroon)" }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>{t("exploreUser", lang)}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: t("researcher", lang), icon: BookOpen },
                { label: t("artist", lang), icon: Music },
                { label: t("student", lang), icon: ScrollText },
                { label: t("tourist", lang), icon: Globe },
                { label: t("institution", lang), icon: Building2 },
                { label: t("citizen", lang), icon: Users },
              ].map((u, i) => {
                const Icon = u.icon;
                return (
                  <button key={i} className="bg-white border-2 rounded-lg p-3 flex flex-col items-center gap-1 hover:bg-[#FFE4E6] transition-colors" style={{ borderColor: "#E5E1DC" }}>
                    <Icon className="h-5 w-5" style={{ color: "var(--maroon)" }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--maroon)" }}>{u.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Important Links */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFE4E6" }}>
                <Star className="h-5 w-5" style={{ color: "var(--maroon)" }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--maroon)", fontFamily: "var(--font-serif)" }}>{t("importantLinks", lang)}</h2>
            </div>
            <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "#E5E1DC" }}>
              {[
                { label: "Indian Culture Portal", url: "https://indianculture.gov.in" },
                { label: "Archaeological Survey of India", url: "https://asi.nic.in" },
                { label: "Sangeet Natak Akademi", url: "https://sangeetnatak.gov.in" },
                { label: "Lalit Kala Akademi", url: "https://lalitkala.gov.in" },
                { label: "Sahitya Akademi", url: "https://sahitya-akademi.gov.in" },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-[#FCE9D9] transition-colors" style={{ borderColor: "#E5E1DC" }}>
                  <span className="text-sm" style={{ color: "var(--navy)" }}>{link.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" style={{ color: "var(--maroon)" }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUGGESTED QUERIES */}
      <section className="py-12 px-6" style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>
              {t("popularSearches", lang)}
            </p>
            <h2 className="text-2xl" style={{ color: "var(--navy)" }}>
              {t("whatToExplore", lang)}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestedQueries.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSearch(item.text)}
                  className="group p-4 rounded-xl border bg-white text-left transition-all hover:shadow-lg hover:border-[var(--gold)] hover:-translate-y-1 flex items-center gap-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-[var(--gold)] group-hover:shadow-md"
                    style={{ backgroundColor: "rgba(198,167,94,0.1)" }}
                  >
                    <Icon className="h-5 w-5 transition-colors group-hover:text-white" style={{ color: "var(--gold)" }} />
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: "var(--navy)" }}>
                    {item.text}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" style={{ color: "var(--gold)" }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CULTURAL HERITAGE GALLERY */}
      <section className="py-16 px-6" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>
              Explore Heritage
            </p>
            <h2 className="text-3xl mb-3" style={{ color: "var(--navy)" }}>
              India's Living Culture
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
              From ancient monuments to living traditions — search and discover India's rich cultural tapestry through AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {culturalCards.map((card, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                style={{ borderColor: "var(--border)" }}
                onClick={() => handleSearch(card.title)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    data-fallback-idx={String(i % heroImages.length)}
                    onError={handleImgError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>
                    {card.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-[var(--gold)] transition-colors" style={{ color: "var(--navy)" }}>
                    {card.title}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-6" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "66", label: t("portalsIndexed", lang), suffix: "+" },
              { value: "3,696", label: t("protectedMonuments", lang), suffix: "" },
              { value: "50M", label: t("archivalPages", lang), suffix: "+" },
              { value: "<3s", label: t("aiResponseTime", lang), suffix: "" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}>
                  {stat.value}<span className="text-lg">{stat.suffix}</span>
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="py-16 px-6" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--maroon)" }}>
              Data Sources
            </p>
            <h2 className="text-2xl mb-3" style={{ color: "var(--navy)" }}>
              {t("searchingAcross", lang)}
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Content crawled and semantically indexed from all Ministry of Culture websites and affiliated institutions.
            </p>
          </div>

          {/* Primary Sources — 80-90% accuracy target */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider" style={{ backgroundColor: "var(--maroon)", color: "#fff" }}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                PRIMARY SOURCES
              </span>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                In-depth answers · 80-90% accuracy target
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {portalSources.filter((p) => p.priority).map((portal, i) => (
                <a
                  key={i}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-3 p-3.5 rounded-xl border-2 bg-white hover:shadow-md transition-all cursor-pointer"
                  style={{ borderColor: "var(--maroon)", backgroundColor: "#FFF6E5" }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--maroon)" }}>
                    <Globe className="h-4 w-4" style={{ color: "#fff" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold truncate" style={{ color: "var(--maroon)" }}>{portal.full}</p>
                    <p className="text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>{portal.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Sources — presented for data flow */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border" style={{ borderColor: "var(--navy)", color: "var(--navy)" }}>
                ADDITIONAL SOURCES
              </span>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Indexed for data flow & cross-reference
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {portalSources.filter((p) => !p.priority).map((portal, i) => (
                <a
                  key={i}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border bg-white hover:shadow-md hover:border-[var(--gold)] transition-all cursor-pointer"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(11,31,59,0.05)" }}>
                    <Globe className="h-4 w-4" style={{ color: "var(--navy)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold truncate" style={{ color: "var(--navy)" }}>{portal.full}</p>
                    <p className="text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>{portal.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full" style={{ backgroundColor: "var(--muted)", color: "var(--navy)" }}>
              <CheckCircle2 className="h-4 w-4" style={{ color: "#22c55e" }} />
              {t("morePortals", lang)}
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t" style={{ backgroundColor: "var(--navy)", borderColor: "rgba(255,255,255,0.05)" }}>
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div className="flex items-center gap-5">
              <img src={GOVT_EMBLEM} alt="Government of India" className="h-16 md:h-20 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#fff" }}>Ministry of Culture</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Government of India &nbsp;|&nbsp; संस्कृति मंत्रालय</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              {["About", "Privacy Policy", "Terms of Use", "Accessibility", "Data Sources", "Contact"].map((link) => (
                <a key={link} href="#" className="text-xs transition-colors hover:text-[var(--gold)]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              &copy; 2026 Ministry of Culture, Government of India. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span>Hosted on MeitY-empanelled CSP</span>
              <span>•</span>
              <span>NIC/MeghRaj Compliant</span>
              <span>•</span>
              <span>CERT-In Audited</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <ChatbotPopup />
    </div>
  );
}
