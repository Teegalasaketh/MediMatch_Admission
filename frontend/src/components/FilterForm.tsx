import { useState } from "react";
import { EXAMS, COURSES, STATES, COLLEGE_TYPES, ExamType } from "@/data/colleges";
import { StudentPreferences } from "@/lib/recommendation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GraduationCap, Search } from "lucide-react";

interface FilterFormProps {
  onSubmit: (prefs: StudentPreferences) => void;
  isLoading: boolean;
}

const BUDGET_PRESETS: Record<ExamType, { min: number; max: number; step: number; defaultMax: number }> = {
  JEE: { min: 10000, max: 800000, step: 10000, defaultMax: 300000 },
  NEET: { min: 5000, max: 2000000, step: 25000, defaultMax: 500000 },
  CUET: { min: 3000, max: 700000, step: 5000, defaultMax: 100000 },
};

export default function FilterForm({ onSubmit, isLoading }: FilterFormProps) {
  const [exam, setExam] = useState<ExamType>("JEE");
  const [rank, setRank] = useState<string>("");
  const [budgetMax, setBudgetMax] = useState<number[]>([300000]);
  const [state, setState] = useState("Any");
  const [course, setCourse] = useState(COURSES.JEE[0]);
  const [collegeType, setCollegeType] = useState("Any");

  const budgetConfig = BUDGET_PRESETS[exam];

  const handleExamChange = (val: string) => {
    const e = val as ExamType;
    setExam(e);
    setCourse(COURSES[e][0]);
    setBudgetMax([BUDGET_PRESETS[e].defaultMax]);
  };

  const handleSubmit = () => {
    if (!rank || Number(rank) <= 0) return;
    onSubmit({
      exam,
      rank: Number(rank),
      budgetMin: 0,
      budgetMax: budgetMax[0],
      state,
      course,
      collegeType,
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-card-foreground">Student Profile</h2>
          <p className="text-sm text-muted-foreground">Enter your preferences to find matching colleges</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Exam Type</Label>
          <Select value={exam} onValueChange={handleExamChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {EXAMS.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Your Rank</Label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={rank}
            onChange={e => setRank(e.target.value)}
            min={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Course</Label>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COURSES[exam].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Preferred State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any State</SelectItem>
              {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>College Type</Label>
          <Select value={collegeType} onValueChange={setCollegeType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COLLEGE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Max Budget: ₹{budgetMax[0].toLocaleString()}/yr</Label>
          <Slider
            value={budgetMax}
            onValueChange={setBudgetMax}
            min={budgetConfig.min}
            max={budgetConfig.max}
            step={budgetConfig.step}
            className="mt-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{budgetConfig.min.toLocaleString()}</span>
            <span>₹{budgetConfig.max.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!rank || Number(rank) <= 0 || isLoading}
        className="mt-6 w-full gap-2"
        size="lg"
      >
        <Search className="h-4 w-4" />
        {isLoading ? "Finding colleges..." : "Get Recommendations"}
      </Button>
    </div>
  );
}
