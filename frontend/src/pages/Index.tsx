// Drop this into frontend/src/pages/Index.tsx

import { useState } from "react";
import FilterForm from "@/components/FilterForm";
import CollegeCard from "@/components/CollegeCard";
import CollegeDetailModal from "@/components/CollegeDetailModal";
import CollegeAnalyticsModal from "@/components/CollegeAnalyticsModal";
import {
  getRecommendationsFull,
  RecommendedCollege,
  StudentPreferences,
  RecommendationResponse,
} from "@/lib/recommendation";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Sparkles, Info, Zap, LogOut, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const { user, signOut } = useAuth();

  const [response, setResponse]       = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [useAI, setUseAI]             = useState(true);
  const [lastPrefs, setLastPrefs]     = useState<StudentPreferences | null>(null);

  // Chat modal
  const [chatCollege, setChatCollege]         = useState<RecommendedCollege | null>(null);
  // Analytics modal
  const [analyzeCollege, setAnalyzeCollege]   = useState<RecommendedCollege | null>(null);

  const handleSubmit = async (p: StudentPreferences) => {
    setIsLoading(true);
    setError(null);
    setLastPrefs(p);
    try {
      const data = await getRecommendationsFull({ ...p, useAI });
      setResponse(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  const results: RecommendedCollege[] = response?.results ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="gradient-hero px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          {/* Nav */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-primary-foreground text-sm">College Admission Guide</span>
            </div>
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1.5">
                  <User className="h-3.5 w-3.5 text-primary-foreground/80" />
                  <span className="text-xs text-primary-foreground/80 font-medium max-w-[120px] truncate">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </span>
                </div>
                <button onClick={signOut}
                  className="flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs text-primary-foreground/80 hover:bg-primary-foreground/20 transition-colors">
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </div>
            )}
          </div>

          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
              <Sparkles className="h-4 w-4" />
              AI-Powered College Recommendations
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
              Find Your Perfect College
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
              Enter your exam rank, budget, and preferences — get personalized college
              recommendations with admission probability analysis.
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* AI toggle */}
        <div className="mb-4 flex items-center justify-end gap-3">
          <Zap className="h-4 w-4 text-secondary" />
          <Label htmlFor="ai-toggle" className="text-sm text-muted-foreground cursor-pointer">AI Explanations</Label>
          <Switch id="ai-toggle" checked={useAI} onCheckedChange={setUseAI} />
          <span className="text-xs text-muted-foreground">{useAI ? "On (Groq LLM)" : "Off (instant)"}</span>
        </div>

        <FilterForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-6 flex items-start gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {response.student_summary}
          </div>
        )}

        {response !== null && (
          <section className="mt-6">
            {results.length > 0 ? (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Top {results.length} Matches
                  </h2>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-safe px-2 py-0.5 text-safe-foreground">Safe</span>
                    <span className="rounded-full bg-target px-2 py-0.5 text-target-foreground">Target</span>
                    <span className="rounded-full bg-dream px-2 py-0.5 text-dream-foreground">Dream</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {results.map((college, i) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      index={i}
                      onChat={setChatCollege}
                      onAnalyze={setAnalyzeCollege}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/40" />
                <h3 className="mt-4 font-display text-lg font-bold text-card-foreground">No Matches Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your budget, rank, or removing the state filter to see more results.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Colleage Admission Guide — Data is indicative. Always verify with official sources.
      </footer>

      {/* ── Modals ── */}

      {/* AI Chat modal */}
      <CollegeDetailModal
        college={chatCollege}
        studentRank={lastPrefs?.rank}
        studentBudget={lastPrefs?.budgetMax}
        onClose={() => setChatCollege(null)}
      />

      {/* Analytics / Statistics modal */}
      <CollegeAnalyticsModal
        college={analyzeCollege}
        allColleges={results}
        studentRank={lastPrefs?.rank}
        studentBudget={lastPrefs?.budgetMax}
        onClose={() => setAnalyzeCollege(null)}
      />
    </div>
  );
};

export default Index;
