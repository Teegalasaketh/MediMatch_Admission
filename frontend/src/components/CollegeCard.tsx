// Drop this into frontend/src/components/CollegeCard.tsx
// Has two action buttons: "Ask AI" (chat) and "Analyze" (stats graphs)

import { RecommendedCollege, AdmissionChance } from "@/lib/recommendation";
import { Badge } from "@/components/ui/badge";
import { MapPin, IndianRupee, Trophy, TrendingUp, Award, Hash, MessageCircle, BarChart3 } from "lucide-react";

const chanceConfig: Record<AdmissionChance, { label: string; className: string }> = {
  Safe:   { label: "🟢 Safe",   className: "bg-safe text-safe-foreground"     },
  Target: { label: "🟡 Target", className: "bg-target text-target-foreground" },
  Dream:  { label: "🟣 Dream",  className: "bg-dream text-dream-foreground"   },
};

interface CollegeCardProps {
  college:    RecommendedCollege;
  index:      number;
  onChat?:    (college: RecommendedCollege) => void;
  onAnalyze?: (college: RecommendedCollege) => void;
}

export default function CollegeCard({ college, index, onChat, onAnalyze }: CollegeCardProps) {
  const chance = chanceConfig[college.admissionChance];

  return (
    <div
      className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/20"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-display text-xs font-semibold text-muted-foreground">#{index + 1}</span>
            <Badge className={chance.className}>{chance.label}</Badge>
            <Badge variant="outline">{college.college_type}</Badge>
          </div>
          <h3 className="font-display text-lg font-bold text-card-foreground leading-tight mb-1">
            {college.college_name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {college.city}, {college.state}
          </div>
        </div>

        {/* Score badge */}
        <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-2 shrink-0 self-start">
          <span className="font-display text-2xl font-bold text-primary">{college.matchScore}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Hash      className="h-3.5 w-3.5" />} label="Closing Rank" value={college.closing_rank.toLocaleString()} />
        <Stat icon={<IndianRupee className="h-3.5 w-3.5" />} label="Annual Fees" value={`₹${college.average_fees.toLocaleString()}`} />
        <Stat icon={<Award     className="h-3.5 w-3.5" />} label="NIRF Rank"    value={`#${college.nirf_ranking}`}              />
        <Stat icon={<TrendingUp className="h-3.5 w-3.5" />} label="Placement"   value={`${college.placement_rate}%`}            />
      </div>

      {/* Explanation */}
      <div className="mt-4 rounded-lg bg-muted/50 p-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <Trophy className="mr-1 inline h-3.5 w-3.5 text-secondary" />
          {college.explanation}
        </p>
      </div>

      {/* Action buttons row */}
      <div className="mt-4 flex items-center gap-2">
        {/* Analyze button — primary CTA */}
        <button
          onClick={() => onAnalyze?.(college)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/8 px-4 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md active:scale-95 group/btn"
        >
          <BarChart3 className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
          Analyze Statistics
        </button>

        {/* Chat button — secondary */}
        <button
          onClick={() => onChat?.(college)}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5 active:scale-95 group/chat"
        >
          <MessageCircle className="h-3.5 w-3.5 transition-transform group-hover/chat:scale-110" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">{icon}{label}</div>
      <div className="text-sm font-semibold text-card-foreground">{value}</div>
    </div>
  );
}
