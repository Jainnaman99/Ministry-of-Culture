import { AISearchBar } from "../components/ai-search-bar";
import { ChatbotPopup } from "../components/chatbot-popup";
import { BhashiniLanguageSelector } from "../components/bhashini-language-selector";
import { useNavigate } from "react-router";
const GOVT_EMBLEM = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/250px-Emblem_of_India.svg.png";
import {
  Search,
  Landmark,
  BookOpen,
  Music,
  ScrollText,
  Globe,
  Calendar,
  FileText,
  Award,
  ArrowRight,
  ChevronRight,
  Monitor,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  {
    icon: Landmark,
    title: "Monuments & Heritage",
    desc: "3,696+ ASI-protected monuments, 42 UNESCO World Heritage Sites",
    query: "Historical monuments of India",
    tag: "ASI",
  },
  {
    icon: BookOpen,
    title: "Museums & Galleries",
    desc: "National Museum, Indian Museum, NGMA, Salar Jung & more",
    query: "List museums in India",
    tag: "800+",
  },
  {
    icon: Music,
    title: "Performing Arts",
    desc: "8 classical dance forms, Hindustani & Carnatic music traditions",
    query: "Indian classical dance forms",
    tag: "Living Heritage",
  },
  {
    icon: ScrollText,
    title: "Archives & Manuscripts",
    desc: "National Archives, Abhilekh Patal — 50M+ pages digitized",
    query: "National Archives of India",
    tag: "Digital",
  },
  {
    icon: Award,
    title: "Schemes & Fellowships",
    desc: "Senior/Junior Fellowships, Young Artist Scholarships, Grants",
    query: "Cultural schemes of government",
    tag: "Apply",
  },
  {
    icon: Globe,
    title: "Vedic & Traditional Knowledge",
    desc: "Vedas, Upanishads, Yoga, Ayurveda, ancient Indian sciences",
    query: "What are the Vedas?",
    tag: "Heritage",
  },
];

const latestUpdates = [
  { title: "Shantiniketan inscribed as UNESCO World Heritage Site", date: "18 Sep 2023", category: "UNESCO" },
  { title: "National Culture Fund — New grants announced for FY 2026-27", date: "15 Mar 2026", category: "Schemes" },
  { title: "Hoysala Sacred Ensembles added to World Heritage List", date: "18 Sep 2023", category: "UNESCO" },
  { title: "International Day of Yoga — AI-powered cultural content released", date: "21 Jun 2025", category: "Events" },
  { title: "Garba of Gujarat inscribed as UNESCO Intangible Heritage", date: "06 Dec 2023", category: "UNESCO" },
];

const upcomingEvents = [
  { title: "National Museum — Exhibition: Indus Valley Treasures", date: "10 Apr – 30 Jun 2026", venue: "New Delhi" },
  { title: "Sangeet Natak Akademi Festival of Dance", date: "15–22 Apr 2026", venue: "Kamani Auditorium, Delhi" },
  { title: "International Museum Day Celebrations", date: "18 May 2026", venue: "Pan-India" },
  { title: "World Heritage Day — Open Monument Programme", date: "18 Apr 2026", venue: "All ASI Sites" },
];

const portalDirectory = [
  { name: "Indian Culture Portal", url: "https://indianculture.gov.in", desc: "Digital heritage repository" },
  { name: "Archaeological Survey of India", url: "https://asi.gov.in", desc: "Monuments & conservation" },
  { name: "Museums of India", url: "https://museumsofindia.gov.in", desc: "800+ museums nationwide" },
  { name: "National Archives", url: "https://nationalarchives.nic.in", desc: "50M+ historical records" },
  { name: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in", desc: "Vedas & ancient texts" },
  { name: "IGNCA", url: "https://ignca.gov.in", desc: "Arts research & documentation" },
  { name: "Sangeet Natak Akademi", url: "https://sangeetnatak.gov.in", desc: "Performing arts academy" },
  { name: "Sahitya Akademi", url: "https://sahitya-akademi.gov.in", desc: "National literary academy" },
  { name: "Lalit Kala Akademi", url: "https://lalitkala.gov.in", desc: "Visual arts academy" },
  { name: "Gandhi Smriti", url: "https://gandhismriti.gov.in", desc: "Gandhi memorial & museum" },
  { name: "MGMD", url: "https://mgmd.gov.in", desc: "Mahatma Gandhi Digital Museum" },
  { name: "Abhilekh Patal", url: "https://abhilekh-patal.in", desc: "Digital archive access" },
  { name: "Gyan Bharatam", url: "https://gyanbharatam.com", desc: "Traditional knowledge" },
];

export function PortalPage() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      {/* Government Strip */}
      <div className="py-1.5 px-6 text-center text-[11px]" style={{ backgroundColor: "var(--navy)", color: "rgba(255,255,255,0.7)" }}>
        <span>Government of India &nbsp;|&nbsp; Ministry of Culture &nbsp;|&nbsp; भारत सरकार &nbsp;|&nbsp; संस्कृति मंत्रालय</span>
      </div>

      {/* Header */}
      <header className="py-4 px-6 border-b bg-white sticky top-0 z-50" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={GOVT_EMBLEM}
              alt="Government of India"
              className="h-16 md:h-[72px] w-auto object-contain"
            />
            <div className="border-l pl-5" style={{ borderColor: "#ccc" }}>
              <p className="text-xs md:text-sm font-semibold" style={{ color: "var(--navy)" }}>
                Government of India
              </p>
              <h1 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "var(--navy)" }}>
                Ministry of Culture
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                संस्कृति मंत्रालय
              </p>
            </div>
          </div>
          {/* AI-Powered Search — compact bar in header */}
          <div className="flex-1 max-w-2xl mx-4 flex flex-col">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--maroon)" }}>
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Search
            </div>
            <AISearchBar onSearch={handleSearch} compact />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {["Home", "About", "Organisations", "Schemes", "RTI", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--muted)]"
                style={{ color: "var(--navy)" }}
              >
                {link}
              </a>
            ))}
            <BhashiniLanguageSelector />
            <button
              onClick={() => navigate("/admin")}
              className="ml-2 text-sm px-3 py-2 rounded-lg border hover:bg-[var(--muted)] transition-colors inline-flex items-center gap-1.5"
              style={{ borderColor: "var(--border)", color: "var(--navy)" }}
            >
              <Monitor className="h-3.5 w-3.5" />
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Quick Access Grid */}
      <section className="py-10 px-6" style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg" style={{ color: "var(--navy)" }}>Explore Heritage</h3>
            <button
              onClick={() => navigate("/")}
              className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg border hover:border-[var(--gold)] transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--navy)" }}
            >
              View AI Platform
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSearch(item.query)}
                  className="group text-left p-5 rounded-xl border bg-white hover:shadow-lg hover:border-[var(--gold)] hover:-translate-y-0.5 transition-all"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-[var(--gold)] group-hover:shadow-md"
                      style={{ backgroundColor: i % 2 === 0 ? "rgba(11,31,59,0.06)" : "rgba(198,167,94,0.1)" }}
                    >
                      <Icon className="h-5 w-5 transition-colors group-hover:text-white" style={{ color: i % 2 === 0 ? "var(--navy)" : "var(--gold)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold group-hover:text-[var(--gold)] transition-colors" style={{ color: "var(--navy)" }}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "rgba(198,167,94,0.1)", color: "var(--gold)" }}>
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{item.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 mt-1 opacity-0 group-hover:opacity-100 transition-all" style={{ color: "var(--gold)" }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two Column: Latest Updates + Events */}
      <section className="py-10 px-6" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Updates */}
          <div className="p-6 rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-5">
              <FileText className="h-4 w-4" style={{ color: "var(--gold)" }} />
              <h3 className="text-base font-semibold" style={{ color: "var(--navy)" }}>Latest Updates</h3>
            </div>
            <div className="space-y-1">
              {latestUpdates.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "var(--gold)" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: "var(--navy)" }}>{item.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{item.date}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "rgba(198,167,94,0.1)", color: "var(--gold)" }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="p-6 rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="h-4 w-4" style={{ color: "var(--gold)" }} />
              <h3 className="text-base font-semibold" style={{ color: "var(--navy)" }}>Upcoming Events</h3>
            </div>
            <div className="space-y-1">
              {upcomingEvents.map((event, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium mb-1.5" style={{ color: "var(--navy)" }}>{event.title}</p>
                  <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.venue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portal Directory */}
      <section className="py-10 px-6" style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="h-4 w-4" style={{ color: "var(--gold)" }} />
            <h3 className="text-base font-semibold" style={{ color: "var(--navy)" }}>Ministry Portals</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(198,167,94,0.1)", color: "var(--gold)" }}>66 indexed</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {portalDirectory.map((portal, i) => (
              <a
                key={i}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border bg-white hover:shadow-md hover:border-[var(--gold)] transition-all"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(11,31,59,0.05)" }}>
                  <Globe className="h-4 w-4" style={{ color: "var(--navy)" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold truncate" style={{ color: "var(--navy)" }}>{portal.name}</p>
                  <p className="text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>{portal.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ backgroundColor: "var(--muted)", color: "var(--navy)" }}>
              + 54 more portals indexed and searchable
            </span>
          </div>
        </div>
      </section>

      {/* AI Platform CTA */}
      {/* Stats Strip */}
      <section className="py-8 px-6" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "66", label: "Portals Indexed", suffix: "+" },
              { value: "3,696", label: "Protected Monuments", suffix: "" },
              { value: "50M", label: "Archival Pages", suffix: "+" },
              { value: "<3s", label: "AI Response Time", suffix: "" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--gold)" }}>
                  {stat.value}<span className="text-sm">{stat.suffix}</span>
                </p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t" style={{ backgroundColor: "var(--navy)", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <img src={GOVT_EMBLEM} alt="Government of India" className="h-12 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              <div>
                <p className="text-sm font-semibold text-white">Ministry of Culture</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Government of India &nbsp;|&nbsp; संस्कृति मंत्रालय</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              {["About", "Privacy Policy", "Terms of Use", "Accessibility", "Sitemap", "RTI", "Contact"].map((link) => (
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
