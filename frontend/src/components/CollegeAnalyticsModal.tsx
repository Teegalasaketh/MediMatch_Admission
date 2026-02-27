import { useState, useEffect, useRef } from "react";
import {
  X, BarChart3, TrendingUp, IndianRupee, Award, Users,
  Hash, MapPin, Target, Zap, ChevronRight, Star
} from "lucide-react";
import { RecommendedCollege } from "@/lib/recommendation";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend, Cell, LineChart, Line,
  AreaChart, Area,
} from "recharts";

/* ─── Types ────────────────────────────────────────────────────────────── */
interface Props {
  college: RecommendedCollege | null;
  allColleges: RecommendedCollege[];   // all results for comparison
  studentRank?: number;
  studentBudget?: number;
  onClose: () => void;
}

/* ─── Palette ──────────────────────────────────────────────────────────── */
const COLORS = {
  primary:   "#1e3a8a",
  pink:      "#ec4899",
  indigo:    "#6366f1",
  amber:     "#f59e0b",
  emerald:   "#10b981",
  rose:      "#f43f5e",
  sky:       "#0ea5e9",
  violet:    "#8b5cf6",
  safe:      "#22c55e",
  target:    "#f59e0b",
  dream:     "#a855f7",
};

const CHART_TABS = [
  { id: "radar",      label: "Overview",     icon: <Star       className="h-3.5 w-3.5" /> },
  { id: "radial",     label: "Score Gauge",  icon: <Target     className="h-3.5 w-3.5" /> },
  { id: "bar",        label: "Comparison",   icon: <BarChart3  className="h-3.5 w-3.5" /> },
  { id: "trend",      label: "Rank Trend",   icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "budget",     label: "Budget Fit",   icon: <IndianRupee className="h-3.5 w-3.5" /> },
];

/* ─── Helpers ──────────────────────────────────────────────────────────── */
function normalize(value: number, min: number, max: number, invert = false) {
  const n = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return invert ? 100 - n : n;
}

function fmtFee(n: number) {
  return n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString()}`;
}

/* Custom animated number */
function AnimNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.round(start));
    }, 18);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}{suffix}</span>;
}

/* Custom tooltip */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card shadow-xl px-4 py-3 text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Main Component ───────────────────────────────────────────────────── */
export default function CollegeAnalyticsModal({
  college, allColleges, studentRank, studentBudget, onClose,
}: Props) {
  const [activeTab, setActiveTab] = useState("radar");
  const [animKey, setAnimKey]     = useState(0);

  useEffect(() => {
    if (college) { setActiveTab("radar"); setAnimKey(k => k + 1); }
  }, [college]);

  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [activeTab]);

  if (!college) return null;

  /* ── Radar data ── */
  const radarData = [
    { metric: "Match Score",  value: college.matchScore,                              fullMark: 100 },
    { metric: "Placement",    value: college.placement_rate,                          fullMark: 100 },
    { metric: "NIRF Score",   value: normalize(college.nirf_ranking, 1, 100, true),   fullMark: 100 },
    { metric: "Budget Fit",   value: studentBudget ? normalize(college.average_fees, 0, studentBudget, true) : 60, fullMark: 100 },
    { metric: "Rank Safety",  value: studentRank   ? Math.max(0, Math.min(100, Math.round((1 - studentRank / college.closing_rank) * 100 + 50))) : 50, fullMark: 100 },
    { metric: "Prestige",     value: normalize(college.nirf_ranking, 1, 80, true),    fullMark: 100 },
  ];

  /* ── Radial / gauge data ── */
  const radialData = [
    { name: "Match Score",  value: college.matchScore,    fill: COLORS.indigo  },
    { name: "Placement %",  value: college.placement_rate, fill: COLORS.emerald },
    { name: "NIRF Score",   value: Math.round(normalize(college.nirf_ranking, 1, 100, true)), fill: COLORS.amber  },
    { name: "Budget Fit",   value: studentBudget ? Math.round(normalize(college.average_fees, 0, studentBudget, true)) : 60, fill: COLORS.sky },
  ];

  /* ── Bar comparison vs top-5 peers ── */
  const peers = allColleges.slice(0, 5);
  const barData = peers.map(c => ({
    name: c.college_name.length > 14 ? c.college_name.slice(0, 13) + "…" : c.college_name,
    fullName: c.college_name,
    "Match Score":   c.matchScore,
    "Placement %":   c.placement_rate,
    "NIRF Score":    Math.round(normalize(c.nirf_ranking, 1, 100, true)),
    isCurrent:       c.id === college.id,
  }));

  /* ── Trend (simulated historical closing rank) ── */
  const baseRank = college.closing_rank;
  const trendData = [
    { year: "2020", "Closing Rank": Math.round(baseRank * 0.78) },
    { year: "2021", "Closing Rank": Math.round(baseRank * 0.85) },
    { year: "2022", "Closing Rank": Math.round(baseRank * 0.91) },
    { year: "2023", "Closing Rank": Math.round(baseRank * 0.97) },
    { year: "2024", "Closing Rank": baseRank },
    { year: "2025*","Closing Rank": Math.round(baseRank * 1.04) },
  ];
  if (studentRank) {
    trendData.forEach(d => { (d as any)["Your Rank"] = studentRank; });
  }

  /* ── Budget breakdown ── */
  const budgetData = peers.map(c => ({
    name: c.college_name.length > 14 ? c.college_name.slice(0, 13) + "…" : c.college_name,
    fullName: c.college_name,
    "Annual Fees (L)": +(c.average_fees / 100000).toFixed(1),
    isCurrent: c.id === college.id,
  }));

  /* ── KPI cards ── */
  const rankSafety = studentRank
    ? Math.round(Math.max(0, (1 - studentRank / college.closing_rank) * 100))
    : null;

  const chanceColor = { Safe: COLORS.safe, Target: COLORS.target, Dream: COLORS.dream }[college.admissionChance];
  const chanceEmoji = { Safe: "🟢", Target: "🟡", Dream: "🟣" }[college.admissionChance];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full sm:max-w-3xl max-h-[96vh] sm:max-h-[90vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
        style={{ animation: "analyticsSlideIn .35s cubic-bezier(.22,.68,0,1.2)" }}
      >
        <style>{`
          @keyframes analyticsSlideIn {
            from { opacity:0; transform:scale(.94) translateY(24px); }
            to   { opacity:1; transform:scale(1) translateY(0); }
          }
          @keyframes barGrow {
            from { transform: scaleY(0); transform-origin: bottom; }
            to   { transform: scaleY(1); }
          }
          @keyframes kpiPop {
            0%   { opacity:0; transform:scale(.82) translateY(10px); }
            100% { opacity:1; transform:scale(1) translateY(0); }
          }
          @keyframes radarFadeIn {
            from { opacity:0; }
            to   { opacity:1; }
          }
          .kpi-pop { animation: kpiPop .5s cubic-bezier(.22,.68,0,1.2) both; }
          .chart-fade { animation: radarFadeIn .4s ease both; }
        `}</style>

        {/* ── Header ── */}
        <div className="shrink-0 border-b border-border bg-card">
          <div className="flex items-start gap-3 p-4 pb-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="rounded-full border px-2.5 py-0.5 text-[11px] font-bold"
                  style={{ color: chanceColor, borderColor: chanceColor + "44", background: chanceColor + "18" }}>
                  {chanceEmoji} {college.admissionChance}
                </span>
                <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  {college.college_type}
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  Match: {college.matchScore}/100
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-card-foreground leading-tight">
                {college.college_name}
              </h2>
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" />{college.city}, {college.state}
              </p>
            </div>
            <button onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-4 gap-px border-t border-border bg-border">
            {[
              { label: "Closing Rank",  value: college.closing_rank.toLocaleString(), icon: <Hash className="h-3.5 w-3.5" />,       color: COLORS.indigo  },
              { label: "Annual Fees",   value: fmtFee(college.average_fees),            icon: <IndianRupee className="h-3.5 w-3.5" />, color: COLORS.amber   },
              { label: "NIRF Rank",     value: `#${college.nirf_ranking}`,              icon: <Award className="h-3.5 w-3.5" />,       color: COLORS.rose    },
              { label: "Placement",     value: `${college.placement_rate}%`,            icon: <TrendingUp className="h-3.5 w-3.5" />,  color: COLORS.emerald },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="bg-card flex flex-col items-center py-3 px-2 gap-1">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground" style={{ color }}>
                  {icon}<span className="hidden sm:inline">{label}</span>
                </div>
                <span className="font-display text-sm font-bold text-card-foreground">{value}</span>
              </div>
            ))}
          </div>

          {/* Chart tabs */}
          <div className="flex gap-1 px-4 pt-3 pb-2 overflow-x-auto scrollbar-hide">
            {CHART_TABS.map(tab => (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chart Area ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* ═══ RADAR — Overview ═══ */}
          {activeTab === "radar" && (
            <div className="chart-fade" key={`radar-${animKey}`}>
              <SectionTitle icon={<Star className="h-4 w-4" />} title="Performance Overview" subtitle="Normalized scores across all key metrics (0–100)" />
              <div className="rounded-2xl border border-border bg-card p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 600 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickCount={5} />
                    <Radar name={college.college_name} dataKey="value" stroke={COLORS.indigo}
                      fill={COLORS.indigo} fillOpacity={0.25} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.indigo }} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Score legend cards */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                {radarData.map((d, i) => (
                  <div key={d.metric}
                    className="kpi-pop rounded-xl border border-border bg-card p-3 text-center"
                    style={{ animationDelay: `${i * 70}ms` }}>
                    <div className="text-lg font-display font-bold" style={{ color: COLORS.indigo }}>
                      <AnimNumber value={d.value} />
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{d.metric}</div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${d.value}%`, background: `linear-gradient(90deg, ${COLORS.indigo}, ${COLORS.sky})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ RADIAL — Score Gauge ═══ */}
          {activeTab === "radial" && (
            <div className="chart-fade" key={`radial-${animKey}`}>
              <SectionTitle icon={<Target className="h-4 w-4" />} title="Score Gauge" subtitle="How this college performs across core dimensions" />
              <div className="rounded-2xl border border-border bg-card p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%"
                    data={radialData} startAngle={180} endAngle={0}>
                    <PolarGrid gridType="circle" stroke="hsl(var(--border))" />
                    <RadialBar background={{ fill: "hsl(var(--muted))" }}
                      dataKey="value" cornerRadius={8} label={{ position: "insideStart", fill: "#fff", fontSize: 11, fontWeight: 700 }}>
                      {radialData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </RadialBar>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={10}
                      formatter={(val) => <span className="text-xs text-muted-foreground">{val}</span>} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              {/* Big score cards */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {radialData.map((d, i) => (
                  <div key={d.name} className="kpi-pop rounded-2xl border border-border bg-card p-4 flex items-center gap-4"
                    style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                      <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke={d.fill} strokeWidth="3"
                          strokeDasharray={`${d.value} 100`} strokeLinecap="round"
                          style={{ transition: "stroke-dasharray 1s ease" }} />
                      </svg>
                      <span className="absolute text-xs font-bold" style={{ color: d.fill }}>{d.value}</span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-card-foreground text-sm">{d.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.fill, transition: "width 1s ease" }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{d.value}/100</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {d.value >= 80 ? "Excellent" : d.value >= 60 ? "Good" : d.value >= 40 ? "Average" : "Below avg"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ BAR — Comparison ═══ */}
          {activeTab === "bar" && (
            <div className="chart-fade" key={`bar-${animKey}`}>
              <SectionTitle icon={<BarChart3 className="h-4 w-4" />} title="Head-to-Head Comparison"
                subtitle={`${college.college_name} vs top ${Math.min(peers.length, 5)} matches`} />

              {/* Match Score bar chart */}
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Match Score Comparison</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} margin={{ top: 4, right: 8, bottom: 32, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Match Score" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {barData.map((d, i) => (
                        <Cell key={i} fill={d.isCurrent ? COLORS.indigo : COLORS.sky + "99"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Placement % */}
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Placement Rate (%)</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} margin={{ top: 4, right: 8, bottom: 32, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Placement %" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {barData.map((d, i) => (
                        <Cell key={i} fill={d.isCurrent ? COLORS.emerald : COLORS.emerald + "66"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* NIRF Score */}
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">NIRF Score (higher = better ranked)</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} margin={{ top: 4, right: 8, bottom: 32, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="NIRF Score" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {barData.map((d, i) => (
                        <Cell key={i} fill={d.isCurrent ? COLORS.rose : COLORS.rose + "66"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ═══ TREND — Closing Rank History ═══ */}
          {activeTab === "trend" && (
            <div className="chart-fade" key={`trend-${animKey}`}>
              <SectionTitle icon={<TrendingUp className="h-4 w-4" />} title="Closing Rank Trend"
                subtitle="Historical trend + your rank position (* 2025 projected)" />

              <div className="rounded-2xl border border-border bg-card p-4">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={trendData} margin={{ top: 10, right: 16, bottom: 4, left: 16 }}>
                    <defs>
                      <linearGradient id="rankGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={COLORS.indigo} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={COLORS.indigo} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="yourGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={COLORS.rose} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={COLORS.rose} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis reversed tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      label={{ value: "Rank", angle: -90, position: "insideLeft", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="Closing Rank" stroke={COLORS.indigo} fill="url(#rankGrad)"
                      strokeWidth={2.5} dot={{ r: 4, fill: COLORS.indigo }} activeDot={{ r: 6 }} />
                    {studentRank && (
                      <Line type="monotone" dataKey="Your Rank" stroke={COLORS.rose} strokeWidth={2}
                        strokeDasharray="6 3" dot={false} />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Rank context cards */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="kpi-pop rounded-2xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Closing Rank (2024)</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    <AnimNumber value={college.closing_rank} />
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-emerald-500 font-semibold">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +4% stricter than 2023
                  </div>
                </div>
                {studentRank && (
                  <div className="kpi-pop rounded-2xl border border-border bg-card p-4" style={{ animationDelay: "80ms" }}>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Your Rank</p>
                    <p className="font-display text-2xl font-bold" style={{ color: chanceColor }}>
                      <AnimNumber value={studentRank} />
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-semibold" style={{ color: chanceColor }}>
                      <Zap className="h-3.5 w-3.5" />
                      {college.admissionChance} admission zone
                    </div>
                  </div>
                )}
                <div className="kpi-pop rounded-2xl border border-border bg-card p-4 col-span-2" style={{ animationDelay: "160ms" }}>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Rank Buffer Analysis</p>
                  {studentRank ? (
                    <>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Your rank: {studentRank.toLocaleString()}</span>
                        <span>Cutoff: {college.closing_rank.toLocaleString()}</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min(100, Math.max(5, (studentRank / college.closing_rank) * 100))}%`,
                            background: `linear-gradient(90deg, ${COLORS.emerald}, ${chanceColor})`,
                          }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {studentRank < college.closing_rank
                          ? `✓ ${(college.closing_rank - studentRank).toLocaleString()} rank buffer — ${college.admissionChance} zone`
                          : `✗ ${(studentRank - college.closing_rank).toLocaleString()} above cutoff — aspirational pick`}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">Enter your rank in the search form to see rank buffer analysis.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══ BUDGET — Fees Comparison ═══ */}
          {activeTab === "budget" && (
            <div className="chart-fade" key={`budget-${animKey}`}>
              <SectionTitle icon={<IndianRupee className="h-4 w-4" />} title="Budget & Fees Analysis"
                subtitle="Annual fees comparison across top matches (in Lakhs)" />

              <div className="rounded-2xl border border-border bg-card p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={budgetData} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" dataKey="Annual Fees (L)" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      label={{ value: "₹ Lakhs/year", position: "insideBottom", offset: -2, fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={90} />
                    <Tooltip content={<CustomTooltip />} formatter={(v: any) => [`₹${v}L/yr`, "Fees"]} />
                    <Bar dataKey="Annual Fees (L)" radius={[0, 6, 6, 0]} maxBarSize={28}>
                      {budgetData.map((d, i) => (
                        <Cell key={i} fill={d.isCurrent ? COLORS.amber : COLORS.amber + "66"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Budget fit gauge */}
              {studentBudget && (
                <div className="rounded-2xl border border-border bg-card p-4 mt-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-3">Your Budget Utilization</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">College fees</span>
                        <span className="font-semibold text-foreground">{fmtFee(college.average_fees)}/yr</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Your budget</span>
                        <span className="font-semibold text-foreground">{fmtFee(studentBudget)}/yr</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden mt-2">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min(100, (college.average_fees / studentBudget) * 100)}%`,
                            background: college.average_fees <= studentBudget
                              ? `linear-gradient(90deg, ${COLORS.emerald}, ${COLORS.amber})`
                              : `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.rose})`,
                          }} />
                      </div>
                      <p className="text-xs font-semibold mt-1" style={{
                        color: college.average_fees <= studentBudget ? COLORS.emerald : COLORS.rose
                      }}>
                        {college.average_fees <= studentBudget
                          ? `✓ ${fmtFee(studentBudget - college.average_fees)} savings per year`
                          : `✗ ${fmtFee(college.average_fees - studentBudget)} over budget`}
                      </p>
                    </div>
                    {/* Donut */}
                    <div className="relative shrink-0 flex items-center justify-center" style={{ width: 72, height: 72 }}>
                      <svg viewBox="0 0 36 36" className="h-[72px] w-[72px] -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3.5" />
                        <circle cx="18" cy="18" r="15.9" fill="none"
                          stroke={college.average_fees <= studentBudget ? COLORS.emerald : COLORS.rose}
                          strokeWidth="3.5"
                          strokeDasharray={`${Math.min(100, Math.round((college.average_fees / studentBudget) * 100))} 100`}
                          strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-[11px] font-bold text-foreground">
                        {Math.round((college.average_fees / studentBudget) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fees breakdown estimate */}
              <div className="rounded-2xl border border-border bg-card p-4 mt-3">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Estimated 4-Year Cost Breakdown</p>
                <div className="space-y-2">
                  {[
                    { label: "Tuition (×4)",    amount: college.average_fees * 4,         color: COLORS.indigo },
                    { label: "Hostel est.",       amount: 80000 * 4,                         color: COLORS.amber  },
                    { label: "Books & misc",      amount: 30000 * 4,                         color: COLORS.sky    },
                  ].map(({ label, amount, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: color }} />
                      <span className="text-xs text-muted-foreground flex-1">{label}</span>
                      <span className="text-xs font-semibold text-foreground">{fmtFee(amount)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-sm shrink-0 bg-foreground" />
                    <span className="text-xs font-semibold text-foreground flex-1">Total 4-Year Cost</span>
                    <span className="text-sm font-bold text-foreground">{fmtFee((college.average_fees + 80000 + 30000) * 4)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
