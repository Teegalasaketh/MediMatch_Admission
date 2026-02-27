import { useState, useRef, useEffect, useCallback } from "react";
import {
  X, Send, Bot, User, Loader2, MapPin, IndianRupee,
  Award, TrendingUp, Hash, RefreshCw, Sparkles, ChevronRight
} from "lucide-react";
import { RecommendedCollege } from "@/lib/recommendation";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface CollegeDetailModalProps {
  college: RecommendedCollege | null;
  studentRank?: number;
  studentBudget?: number;
  onClose: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const SUGGESTED_QUESTIONS = [
  "What is the admission process?",
  "How is campus life here?",
  "What are the top recruiters?",
  "Compare this with similar colleges",
  "What branches are available?",
  "What is the hostel & fees structure?",
];

export default function CollegeDetailModal({
  college,
  studentRank,
  studentBudget,
  onClose,
}: CollegeDetailModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (college) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [college]);

  // Generate initial AI overview when modal opens
  useEffect(() => {
    if (college && !initialized) {
      setInitialized(true);
      generateInitialOverview();
    }
  }, [college]);

  // Cleanup on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  const generateInitialOverview = async () => {
    if (!college) return;
    setLoading(true);

    const systemPrompt = `You are an expert Indian college admission counselor with deep knowledge of all colleges, courses, placements, campus life, and admission processes. You give detailed, accurate, and personalized advice.`;

    const userPrompt = `Give me a comprehensive overview of ${college.college_name} for a student with rank ${studentRank ?? "unknown"} and budget ₹${studentBudget?.toLocaleString() ?? "unknown"}/year. The student's admission chance here is "${college.admissionChance}" with a match score of ${college.matchScore}/100.

Cover these in a flowing, conversational format (like ChatGPT would respond):
1. Quick college snapshot (type, location, NIRF rank #${college.nirf_ranking})  
2. Why this college suits this student (rank ${studentRank} vs closing rank ${college.closing_rank})
3. Fees (₹${college.average_fees.toLocaleString()}/yr) and scholarship opportunities
4. Placement highlights (${college.placement_rate}% rate) and top recruiters
5. Campus life & culture
6. Key tips for this student

Be warm, specific, and encouraging. Use natural paragraph breaks.`;

    await streamMessage(systemPrompt, userPrompt, true);
    setLoading(false);
  };

  const streamMessage = async (systemPrompt: string, userMessage: string, isInitial = false) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    if (!isInitial) {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    }

    const assistantMsg: Message = { role: "assistant", content: "", streaming: true };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch(`${API_BASE}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          college: {
            college_name: college!.college_name,
            state: college!.state,
            city: college!.city,
            course: college!.course,
            exam: college!.exam,
            closing_rank: college!.closing_rank,
            average_fees: college!.average_fees,
            college_type: college!.college_type,
            nirf_ranking: college!.nirf_ranking,
            placement_rate: college!.placement_rate,
            matchScore: college!.matchScore,
            admissionChance: college!.admissionChance,
          },
          student_rank: studentRank,
          student_budget: studentBudget,
          system_prompt: systemPrompt,
          user_message: userMessage,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`API error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Parse SSE lines
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            if (data) {
              try {
                const parsed = JSON.parse(data);
                const token = parsed.choices?.[0]?.delta?.content ?? "";
                fullText += token;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: fullText,
                    streaming: true,
                  };
                  return updated;
                });
              } catch {}
            }
          }
        }
      }

      // Mark streaming done
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: fullText, streaming: false };
        return updated;
      });
    } catch (err: any) {
      if (err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't connect to the AI service. Please ensure the backend is running.",
          streaming: false,
        };
        return updated;
      });
    }
  };

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setLoading(true);

    const systemPrompt = `You are an expert Indian college admission counselor specializing in ${college?.college_name}. Answer questions specifically about this college. Be informative, accurate, and conversational — like ChatGPT would respond. Use natural paragraphs with occasional bullet points for lists.`;

    await streamMessage(systemPrompt, msg);
    setLoading(false);
  };

  const handleReset = () => {
    setMessages([]);
    setInitialized(false);
    setLoading(false);
  };

  if (!college) return null;

  const chanceColors: Record<string, string> = {
    Safe: "text-safe bg-safe/10 border-safe/20",
    Target: "text-yellow-600 bg-yellow-50 border-yellow-200",
    Dream: "text-dream bg-dream/10 border-dream/20",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full sm:max-w-2xl h-[95vh] sm:h-[85vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in border border-border">

        {/* Header — College Info */}
        <div className="shrink-0 border-b border-border bg-card">
          <div className="flex items-start justify-between p-4 pb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${chanceColors[college.admissionChance]}`}>
                  {college.admissionChance === "Safe" ? "🟢" : college.admissionChance === "Target" ? "🟡" : "🟣"} {college.admissionChance}
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {college.college_type}
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {college.matchScore}/100 match
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-card-foreground leading-tight">
                {college.college_name}
              </h2>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {college.city}, {college.state}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-3 shrink-0">
              <button
                onClick={handleReset}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 gap-px border-t border-border bg-border">
            {[
              { icon: <Hash className="h-3 w-3" />, label: "Closing", value: college.closing_rank.toLocaleString() },
              { icon: <IndianRupee className="h-3 w-3" />, label: "Fees/yr", value: `₹${(college.average_fees / 100000).toFixed(1)}L` },
              { icon: <Award className="h-3 w-3" />, label: "NIRF", value: `#${college.nirf_ranking}` },
              { icon: <TrendingUp className="h-3 w-3" />, label: "Placed", value: `${college.placement_rate}%` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-card px-3 py-2 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1 text-muted-foreground">{icon}<span className="text-[10px]">{label}</span></div>
                <span className="text-sm font-bold text-card-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Ask anything about <strong className="text-foreground">{college.college_name}</strong>
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                msg.role === "assistant"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              }`}>
                <FormattedMessage content={msg.content} />
                {msg.streaming && (
                  <span className="inline-block w-2 h-4 ml-0.5 bg-current opacity-70 animate-pulse rounded-sm" />
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator for initial load */}
          {loading && messages.length === 0 && (
            <div className="flex gap-3">
              <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="block w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested questions (show when no user messages) */}
        {messages.filter(m => m.role === "user").length === 0 && messages.length > 0 && !loading && (
          <div className="shrink-0 px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {q} <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="shrink-0 border-t border-border p-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={`Ask about ${college.college_name}...`}
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-all"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            AI advisor · Data is indicative. Verify with official sources.
          </p>
        </div>
      </div>
    </div>
  );
}

// Renders markdown-like formatted text (bold, bullets, paragraphs)
function FormattedMessage({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Bullet list
    if (line.match(/^[-*•]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*•]\s/)) {
        items.push(lines[i].replace(/^[-*•]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-0.5 my-1 text-sm">
          {items.map((item, j) => (
            <li key={j}><InlineFormat text={item} /></li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-0.5 my-1 text-sm">
          {items.map((item, j) => (
            <li key={j}><InlineFormat text={item} /></li>
          ))}
        </ol>
      );
      continue;
    }

    // Heading (##)
    if (line.startsWith("## ")) {
      elements.push(
        <p key={i} className="font-semibold text-sm mt-2 mb-0.5">
          <InlineFormat text={line.slice(3)} />
        </p>
      );
      i++;
      continue;
    }

    // Normal paragraph
    elements.push(
      <p key={i} className="text-sm leading-relaxed">
        <InlineFormat text={line} />
      </p>
    );
    i++;
  }

  return <div className="space-y-1.5">{elements}</div>;
}

function InlineFormat({ text }: { text: string }) {
  // Handle **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
