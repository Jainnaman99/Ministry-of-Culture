import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  // BarChart3,
  Activity,
  Clock,
  Shield,
  Server,
  Zap,
  FileText,
  Search,
  MessageSquare,
  // Eye,
  RefreshCw,
  Database,
  Cpu,
  CheckCircle2,
  // AlertTriangle,
  // ArrowUpRight,
  Layers,
  Monitor
} from "lucide-react";
import {
  LineChart,
  Line,
  // BarChart,
  // Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  // Legend
} from "recharts";

interface KpiData {
  total_queries:      { today: number; yesterday: number; change_pct: number };
  active_users:       { active_30min: number; concurrent_5min: number };
  avg_response_time:  { mean_seconds: number; p95_seconds: number; change_pct: number };
  rag_accuracy:       { pct: number; vector_hits: number; total_non_conversational: number };
  chatbot_sessions:   { today: number; avg_turns: number };
  system_uptime:      { uptime_seconds: number; uptime_human: string; started_at: string };
}

export function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today");
  const [kpis, setKpis] = useState<KpiData | null>(null);
  const [kpisLoading, setKpisLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchKpis = useCallback(() => {
    setKpisLoading(true);
    fetch("/metrics/kpis", { headers: { accept: "application/json" } })
      .then((r) => r.json())
      .then((data: KpiData) => {
        setKpis(data);
        setLastRefreshed(new Date());
      })
      .catch(() => {/* keep previous data on error */})
      .finally(() => setKpisLoading(false));
  }, []);

  useEffect(() => {
    fetchKpis();
    const interval = setInterval(fetchKpis, 30_000);
    return () => clearInterval(interval);
  }, [fetchKpis]);

  // --- DATA ---
  const queriesOverTime = [
    { time: "00:00", queries: 120, users: 45 },
    { time: "04:00", queries: 80, users: 22 },
    { time: "08:00", queries: 450, users: 180 },
    { time: "10:00", queries: 890, users: 340 },
    { time: "12:00", queries: 1240, users: 520 },
    { time: "14:00", queries: 1680, users: 650 },
    { time: "16:00", queries: 1520, users: 580 },
    { time: "18:00", queries: 1340, users: 490 },
    { time: "20:00", queries: 980, users: 370 },
    { time: "22:00", queries: 560, users: 210 },
  ];

  const weeklyData = [
    { time: "Mon", queries: 8240, users: 3200 },
    { time: "Tue", queries: 9680, users: 3800 },
    { time: "Wed", queries: 10520, users: 4100 },
    { time: "Thu", queries: 11890, users: 4600 },
    { time: "Fri", queries: 12140, users: 4900 },
    { time: "Sat", queries: 8780, users: 3400 },
    { time: "Sun", queries: 7560, users: 2900 },
  ];

  const monthlyData = [
    { time: "Week 1", queries: 52400, users: 18900 },
    { time: "Week 2", queries: 68100, users: 24300 },
    { time: "Week 3", queries: 74500, users: 28700 },
    { time: "Week 4", queries: 82300, users: 31200 },
  ];

  const topTopicsData = {
    today: [
      { topic: "Historical Monuments", count: 3420, pct: 22 },
      { topic: "Museums & Galleries", count: 2890, pct: 18 },
      { topic: "Classical Dance Forms", count: 2340, pct: 15 },
      { topic: "Vedic Heritage", count: 2120, pct: 14 },
      { topic: "UNESCO World Heritage", count: 1890, pct: 12 },
      { topic: "National Archives", count: 1540, pct: 10 },
      { topic: "Freedom Movement", count: 1380, pct: 9 },
    ],
    week: [
      { topic: "Taj Mahal & Agra", count: 18750, pct: 20 },
      { topic: "Museums & Galleries", count: 16420, pct: 18 },
      { topic: "Classical Dance Forms", count: 14380, pct: 15 },
      { topic: "Historical Monuments", count: 13200, pct: 14 },
      { topic: "Vedic Heritage", count: 11560, pct: 12 },
      { topic: "Cultural Schemes", count: 10890, pct: 12 },
      { topic: "Indian Festivals", count: 8340, pct: 9 },
    ],
    month: [
      { topic: "Museums & Galleries", count: 78450, pct: 21 },
      { topic: "Historical Monuments", count: 72100, pct: 19 },
      { topic: "UNESCO World Heritage", count: 58900, pct: 16 },
      { topic: "Classical Dance Forms", count: 52300, pct: 14 },
      { topic: "Vedic Heritage", count: 41200, pct: 11 },
      { topic: "Freedom Movement", count: 38500, pct: 10 },
      { topic: "Indian Languages", count: 32800, pct: 9 },
    ],
  };

  const languageDataAll = {
    today: [
      { name: "English", value: 62, color: "#0B1F3B" },
      { name: "Hindi", value: 31, color: "#C6A75E" },
      { name: "Other", value: 7, color: "#94a3b8" },
    ],
    week: [
      { name: "English", value: 55, color: "#0B1F3B" },
      { name: "Hindi", value: 34, color: "#C6A75E" },
      { name: "Telugu", value: 5, color: "#8B7355" },
      { name: "Tamil", value: 4, color: "#2d4a6d" },
      { name: "Other", value: 2, color: "#94a3b8" },
    ],
    month: [
      { name: "English", value: 51, color: "#0B1F3B" },
      { name: "Hindi", value: 36, color: "#C6A75E" },
      { name: "Telugu", value: 6, color: "#8B7355" },
      { name: "Tamil", value: 4, color: "#2d4a6d" },
      { name: "Other", value: 3, color: "#94a3b8" },
    ],
  };

  const sourceDataAll = {
    today: [
      { name: "indianculture.gov.in", queries: 4520, pct: 22 },
      { name: "mgmd.gov.in", queries: 3680, pct: 18 },
      { name: "vedicheritage.gov.in", queries: 3210, pct: 16 },
      { name: "museumsofindia.gov.in", queries: 2890, pct: 14 },
      { name: "gyanbharatam.com", queries: 2340, pct: 12 },
      { name: "abhilekh-patal.in", queries: 1980, pct: 10 },
      { name: "Other portals (60)", queries: 1640, pct: 8 },
    ],
    week: [
      { name: "indianculture.gov.in", queries: 24800, pct: 24 },
      { name: "museumsofindia.gov.in", queries: 18500, pct: 18 },
      { name: "mgmd.gov.in", queries: 16200, pct: 16 },
      { name: "vedicheritage.gov.in", queries: 13400, pct: 13 },
      { name: "abhilekh-patal.in", queries: 11800, pct: 11 },
      { name: "gyanbharatam.com", queries: 9600, pct: 9 },
      { name: "Other portals (60)", queries: 9200, pct: 9 },
    ],
    month: [
      { name: "indianculture.gov.in", queries: 98400, pct: 25 },
      { name: "museumsofindia.gov.in", queries: 72300, pct: 19 },
      { name: "vedicheritage.gov.in", queries: 58900, pct: 15 },
      { name: "mgmd.gov.in", queries: 52100, pct: 13 },
      { name: "abhilekh-patal.in", queries: 43600, pct: 11 },
      { name: "gyanbharatam.com", queries: 35200, pct: 9 },
      { name: "Other portals (60)", queries: 31300, pct: 8 },
    ],
  };

  const responseTimeToday = [
    { time: "00:00", avg: 1.1, p95: 2.1 },
    { time: "04:00", avg: 0.9, p95: 1.8 },
    { time: "08:00", avg: 1.3, p95: 2.4 },
    { time: "10:00", avg: 1.5, p95: 2.7 },
    { time: "12:00", avg: 1.8, p95: 2.9 },
    { time: "14:00", avg: 1.6, p95: 2.8 },
    { time: "16:00", avg: 1.4, p95: 2.5 },
    { time: "18:00", avg: 1.2, p95: 2.2 },
    { time: "20:00", avg: 1.1, p95: 2.0 },
    { time: "22:00", avg: 1.0, p95: 1.9 },
  ];

  const responseTimeWeekly = [
    { time: "Mon", avg: 1.3, p95: 2.4 },
    { time: "Tue", avg: 1.2, p95: 2.3 },
    { time: "Wed", avg: 1.4, p95: 2.6 },
    { time: "Thu", avg: 1.5, p95: 2.8 },
    { time: "Fri", avg: 1.6, p95: 2.9 },
    { time: "Sat", avg: 1.1, p95: 2.1 },
    { time: "Sun", avg: 1.0, p95: 1.9 },
  ];

  const responseTimeMonthly = [
    { time: "Week 1", avg: 1.4, p95: 2.6 },
    { time: "Week 2", avg: 1.3, p95: 2.5 },
    { time: "Week 3", avg: 1.2, p95: 2.3 },
    { time: "Week 4", avg: 1.1, p95: 2.2 },
  ];

  const recentQueriesData = {
    today: [
      { query: "Tell me about Konark Sun Temple", time: "2 min ago", source: "ASI", confidence: "High" },
      { query: "List of museums in Kolkata", time: "5 min ago", source: "Museums of India", confidence: "High" },
      { query: "What is Bharatanatyam?", time: "8 min ago", source: "Indian Culture", confidence: "High" },
      { query: "Vedic chanting traditions", time: "12 min ago", source: "Vedic Heritage", confidence: "Medium" },
      { query: "Hampi ruins history", time: "15 min ago", source: "ASI", confidence: "High" },
      { query: "Gandhi's role in Dandi March", time: "18 min ago", source: "MGMD", confidence: "High" },
    ],
    week: [
      { query: "UNESCO sites in South India", time: "1 hr ago", source: "Indian Culture", confidence: "High" },
      { query: "Ajanta cave paintings significance", time: "3 hr ago", source: "ASI", confidence: "High" },
      { query: "Kuchipudi dance origin", time: "5 hr ago", source: "Indian Culture", confidence: "High" },
      { query: "Gyan Bharatam ancient sciences", time: "8 hr ago", source: "Gyan Bharatam", confidence: "Medium" },
      { query: "Mahatma Gandhi digital archives", time: "12 hr ago", source: "MGMD", confidence: "High" },
      { query: "Abhilekh Patal freedom records", time: "1 day ago", source: "Abhilekh Patal", confidence: "High" },
    ],
    month: [
      { query: "Indus Valley Civilization overview", time: "2 days ago", source: "Indian Culture", confidence: "High" },
      { query: "Classical music instruments sitar", time: "3 days ago", source: "Indian Culture", confidence: "High" },
      { query: "Vedic heritage manuscripts", time: "5 days ago", source: "Vedic Heritage", confidence: "High" },
      { query: "Red Fort history and architecture", time: "1 week ago", source: "ASI", confidence: "High" },
      { query: "Durga Puja UNESCO inscription", time: "1 week ago", source: "Indian Culture", confidence: "Medium" },
      { query: "Museums of India virtual tours", time: "2 weeks ago", source: "Museums of India", confidence: "High" },
    ],
  };

  const systemHealth = [
    { label: "API Gateway", status: "operational", uptime: "99.97%" },
    { label: "LLM Inference", status: "operational", uptime: "99.92%" },
    { label: "Vector Database", status: "operational", uptime: "99.99%" },
    { label: "Web Crawler", status: "operational", uptime: "99.85%" },
    { label: "Search Index", status: "operational", uptime: "99.98%" },
    { label: "Bhashini API", status: "degraded", uptime: "98.50%" },
  ];

  const statsData = {
    today: [
      { title: "Total Queries", value: "12,456", change: "+12.5%", up: true, icon: Search, subtitle: "vs yesterday" },
      { title: "Active Users", value: "3,234", change: "+8.2%", up: true, icon: Users, subtitle: "concurrent now: 847" },
      { title: "Avg Response Time", value: "1.2s", change: "-0.3s", up: true, icon: Zap, subtitle: "P95: 2.4s" },
      { title: "RAG Verified", value: "9,847", change: "+1.1%", up: true, icon: Shield, subtitle: "96.3% of queries" },
      { title: "Chatbot Sessions", value: "4,821", change: "+15.3%", up: true, icon: MessageSquare, subtitle: "avg 4.2 turns" },
      { title: "System Uptime", value: "99.95%", change: "0.0%", up: true, icon: Server, subtitle: "last 30 days" },
    ],
    week: [
      { title: "Total Queries", value: "68,810", change: "+9.8%", up: true, icon: Search, subtitle: "vs last week" },
      { title: "Active Users", value: "18,920", change: "+6.1%", up: true, icon: Users, subtitle: "unique visitors" },
      { title: "Avg Response Time", value: "1.4s", change: "-0.1s", up: true, icon: Zap, subtitle: "P95: 2.6s" },
      { title: "RAG Verified", value: "54,210", change: "+0.7%", up: true, icon: Shield, subtitle: "95.8% of queries" },
      { title: "Chatbot Sessions", value: "28,450", change: "+11.2%", up: true, icon: MessageSquare, subtitle: "avg 3.8 turns" },
      { title: "System Uptime", value: "99.95%", change: "0.0%", up: true, icon: Server, subtitle: "last 30 days" },
    ],
    month: [
      { title: "Total Queries", value: "3,47,823", change: "+14.2%", up: true, icon: Search, subtitle: "vs last month" },
      { title: "Active Users", value: "1,56,789", change: "+10.5%", up: true, icon: Users, subtitle: "unique visitors" },
      { title: "Avg Response Time", value: "1.3s", change: "-0.2s", up: true, icon: Zap, subtitle: "P95: 2.5s" },
      { title: "RAG Verified", value: "2,18,540", change: "+2.1%", up: true, icon: Shield, subtitle: "96.1% of queries" },
      { title: "Chatbot Sessions", value: "1,12,340", change: "+18.7%", up: true, icon: MessageSquare, subtitle: "avg 4.0 turns" },
      { title: "System Uptime", value: "99.95%", change: "0.0%", up: true, icon: Server, subtitle: "last 30 days" },
    ],
  };

  const n = (v: number | null | undefined, fallback = 0) => v ?? fallback;

  const fmtChange = (pct: number | null | undefined, lowerIsBetter = false) => {
    const safe = n(pct);
    const up = lowerIsBetter ? safe <= 0 : safe >= 0;
    const label = `${safe >= 0 ? "+" : ""}${safe.toFixed(1)}%`;
    return { change: label, up };
  };

  const liveStats = kpis
    ? [
        {
          title: "Total Queries",
          value: n(kpis.total_queries.today).toLocaleString("en-IN"),
          ...fmtChange(kpis.total_queries.change_pct),
          icon: Search,
          subtitle: `yesterday: ${n(kpis.total_queries.yesterday).toLocaleString("en-IN")}`,
        },
        {
          title: "Active Users",
          value: n(kpis.active_users.active_30min).toLocaleString("en-IN"),
          change: "–",
          up: true,
          icon: Users,
          subtitle: `concurrent (5 min): ${n(kpis.active_users.concurrent_5min)}`,
        },
        {
          title: "Avg Response Time",
          value: `${n(kpis.avg_response_time.mean_seconds).toFixed(2)}s`,
          ...fmtChange(kpis.avg_response_time.change_pct, true),
          icon: Zap,
          subtitle: `P95: ${n(kpis.avg_response_time.p95_seconds).toFixed(2)}s`,
        },
        {
          title: "RAG Verified",
          value: n(kpis.rag_accuracy.vector_hits).toLocaleString("en-IN"),
          change: "–",
          up: true,
          icon: Shield,
          subtitle: `${n(kpis.rag_accuracy.pct).toFixed(1)}% of queries`,
        },
        {
          title: "Chatbot Sessions",
          value: n(kpis.chatbot_sessions.today).toLocaleString("en-IN"),
          change: "–",
          up: true,
          icon: MessageSquare,
          subtitle: `avg ${n(kpis.chatbot_sessions.avg_turns).toFixed(1)} turns`,
        },
        {
          title: "System Uptime",
          value: kpis.system_uptime.uptime_human ?? "–",
          change: "–",
          up: true,
          icon: Server,
          subtitle: kpis.system_uptime.started_at ? `since ${new Date(kpis.system_uptime.started_at).toLocaleDateString("en-IN")}` : "–",
        },
      ]
    : [
        { title: "Total Queries",     value: "–", change: "–", up: true, icon: Search,       subtitle: "loading…" },
        { title: "Active Users",      value: "–", change: "–", up: true, icon: Users,        subtitle: "loading…" },
        { title: "Avg Response Time", value: "–", change: "–", up: true, icon: Zap,          subtitle: "loading…" },
        { title: "RAG Verified",       value: "–", change: "–", up: true, icon: Shield,       subtitle: "loading…" },
        { title: "Chatbot Sessions",  value: "–", change: "–", up: true, icon: MessageSquare, subtitle: "loading…" },
        { title: "System Uptime",     value: "–", change: "–", up: true, icon: Server,       subtitle: "loading…" },
      ];

  const stats = timeRange === "today" ? liveStats : statsData[timeRange];
  const chartData = timeRange === "today" ? queriesOverTime : timeRange === "week" ? weeklyData : monthlyData;
  const responseTimeData = timeRange === "today" ? responseTimeToday : timeRange === "week" ? responseTimeWeekly : responseTimeMonthly;
  const topTopics = topTopicsData[timeRange];
  const languageData = languageDataAll[timeRange];
  const sourceData = sourceDataAll[timeRange];
  const recentQueries = recentQueriesData[timeRange];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f5f7' }}>
      {/* Header */}
      <header className="py-0 px-0 bg-[var(--navy)] text-white">
        <div className="max-w-[1440px] mx-auto">
          {/* Top Strip */}
          <div className="flex items-center justify-between px-6 py-2 text-[11px] border-b border-white/10">
            <div className="flex items-center gap-4">
              <span className="opacity-60">Government of India</span>
              <span className="opacity-30">|</span>
              <span className="opacity-60">Ministry of Culture</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="opacity-60">
                Last updated: {lastRefreshed.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <button
                onClick={fetchKpis}
                disabled={kpisLoading}
                className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-3 w-3 ${kpisLoading ? "animate-spin" : ""}`} />
                {kpisLoading ? "Loading…" : "Refresh"}
              </button>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--gold)' }}>
                  <Monitor className="h-5 w-5" style={{ color: 'var(--navy)' }} />
                </div>
                <div>
                  <h1 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                    AI System Dashboard
                  </h1>
                  <p className="text-xs opacity-60">
                    Ministry of Culture &middot; Semantic Search & Chatbot Analytics
                  </p>
                </div>
              </div>
            </div>

            {/* Time Range Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/10">
              {(["today", "week", "month"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className="px-4 py-1.5 rounded-md text-sm transition-all capitalize"
                  style={{
                    backgroundColor: timeRange === range ? 'var(--gold)' : 'transparent',
                    color: timeRange === range ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
                    fontWeight: timeRange === range ? 600 : 400,
                  }}
                >
                  {range === "today" ? "Today" : range === "week" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl border bg-white relative overflow-hidden"
                style={{ borderColor: '#e5e7eb' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: index === 0 ? 'rgba(11, 31, 59, 0.08)' : index === 3 ? 'rgba(34, 197, 94, 0.08)' : 'rgba(198, 167, 94, 0.08)' }}
                  >
                    <Icon className="h-4 w-4" style={{ color: index === 0 ? 'var(--navy)' : index === 3 ? '#166534' : 'var(--gold)' }} />
                  </div>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-0.5"
                    style={{
                      backgroundColor: stat.up ? '#dcfce7' : '#fee2e2',
                      color: stat.up ? '#166534' : '#991b1b'
                    }}
                  >
                    {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
                  {stat.value}
                </p>
                <p className="text-xs font-medium" style={{ color: '#6b7280' }}>{stat.title}</p>
                <p className="text-[10px] mt-1" style={{ color: '#9ca3af' }}>{stat.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Row 2: Traffic + Response Time */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>Query & User Traffic</h3>
                <p className="text-xs" style={{ color: '#9ca3af' }}>Real-time usage across all 66 portals</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--navy)' }}></span>Queries</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--gold)' }}></span>Users</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gradQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1F3B" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0B1F3B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6A75E" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#C6A75E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#0B1F3B" strokeWidth={2} fill="url(#gradQueries)" />
                <Area type="monotone" dataKey="users" stroke="#C6A75E" strokeWidth={2} fill="url(#gradUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time */}
          <div className="p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <div className="mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>Response Time</h3>
              <p className="text-xs" style={{ color: '#9ca3af' }}>Avg vs P95 latency (seconds)</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} domain={[0, 3.5]} unit="s" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="avg" name="Average" stroke="#0B1F3B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="p95" name="P95" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                {/* 3s SLA line */}
                <Line type="monotone" dataKey={() => 3} name="SLA (3s)" stroke="#22c55e" strokeWidth={1} strokeDasharray="8 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Top Topics + Language + Source Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Top Topics */}
          <div className="p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>Top Searched Topics</h3>
            <div className="space-y-3">
              {topTopics.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: 'var(--navy)' }}>{item.topic}</span>
                    <span className="text-[11px]" style={{ color: '#9ca3af' }}>{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.pct * 4}%`,
                        backgroundColor: i === 0 ? 'var(--navy)' : i === 1 ? 'var(--gold)' : i === 2 ? '#2d4a6d' : '#8B7355'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Distribution */}
          <div className="p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>Language Distribution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {languageData.map((lang, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: lang.color }} />
                    <span className="text-xs" style={{ color: 'var(--navy)' }}>{lang.name}</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--navy)' }}>{lang.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source Distribution */}
          <div className="p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>Portal-wise Queries</h3>
            <div className="space-y-3">
              {sourceData.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f3f4f6' }}>
                    <Globe className="h-3.5 w-3.5" style={{ color: '#6b7280' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--navy)' }}>{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                        <div className="h-full rounded-full" style={{ width: `${item.pct * 3.5}%`, backgroundColor: 'var(--gold)' }} />
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: '#9ca3af' }}>{item.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Recent Queries + System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Recent Queries */}
          <div className="p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>Recent Queries</h3>
              <span className="text-[11px] flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#166534' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-500"></span>
                Live
              </span>
            </div>
            <div className="space-y-1">
              {recentQueries.map((q, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(198, 167, 94, 0.1)' }}>
                    <Search className="h-3.5 w-3.5" style={{ color: 'var(--gold)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--navy)' }}>{q.query}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px]" style={{ color: '#9ca3af' }}>{q.time}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>{q.source}</span>
                    </div>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    style={{
                      backgroundColor: q.confidence === "High" ? '#dcfce7' : '#fef3c7',
                      color: q.confidence === "High" ? '#166534' : '#92400e'
                    }}
                  >
                    {q.confidence}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="p-5 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>System Health</h3>
              <span className="text-[11px] flex items-center gap-1.5 font-medium" style={{ color: '#166534' }}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                All Systems Operational
              </span>
            </div>
            <div className="space-y-2">
              {systemHealth.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#fafafa' }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-xs font-medium" style={{ color: 'var(--navy)' }}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px]" style={{ color: '#9ca3af' }}>Uptime: {item.uptime}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
                      style={{
                        backgroundColor: item.status === 'operational' ? '#dcfce7' : '#fef3c7',
                        color: item.status === 'operational' ? '#166534' : '#92400e'
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Infrastructure Stats */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#f0f0f0' }}>
              <p className="text-[10px] uppercase tracking-wider mb-3 font-medium" style={{ color: '#9ca3af' }}>Infrastructure</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fafafa' }}>
                  <Cpu className="h-4 w-4 mx-auto mb-1.5" style={{ color: 'var(--navy)' }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>64v</p>
                  <p className="text-[10px]" style={{ color: '#9ca3af' }}>CPU Cores</p>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fafafa' }}>
                  <Database className="h-4 w-4 mx-auto mb-1.5" style={{ color: 'var(--gold)' }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>128 GB</p>
                  <p className="text-[10px]" style={{ color: '#9ca3af' }}>RAM</p>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fafafa' }}>
                  <Layers className="h-4 w-4 mx-auto mb-1.5" style={{ color: '#2d4a6d' }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>2x 80GB</p>
                  <p className="text-[10px]" style={{ color: '#9ca3af' }}>GPU Nodes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Engagement Overview */}
        <div className="p-5 rounded-xl border bg-white mb-4" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>User Engagement Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Peak Usage", value: "2:00 – 4:00 PM", icon: Clock },
              { label: "Avg Session", value: "5m 32s", icon: Activity },
              { label: "Return Rate", value: "67.3%", icon: RefreshCw },
              { label: "Pages / Session", value: "3.8", icon: FileText },
              { label: "Bounce Rate", value: "18.2%", icon: TrendingDown },
              { label: "Portals Queried", value: "66 / 66", icon: Globe },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: '#fafafa' }}>
                  <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: i % 2 === 0 ? 'var(--navy)' : 'var(--gold)' }} />
                  <p className="text-lg font-bold mb-0.5" style={{ color: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>{item.value}</p>
                  <p className="text-[11px]" style={{ color: '#9ca3af' }}>{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-[11px]" style={{ color: '#9ca3af' }}>
            Ministry of Culture AI Dashboard &middot; Data refreshed every 30 seconds &middot; Hosted on MeitY-empanelled CSP &middot; NIC/MeghRaj compliant
          </p>
        </div>
      </main>
    </div>
  );
}
