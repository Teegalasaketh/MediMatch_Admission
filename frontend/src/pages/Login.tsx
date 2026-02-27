import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

const ANIM_STYLES = `
  @keyframes floatLogo {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-16px) rotate(1deg); }
  }
  @keyframes pulsRing {
    0%   { transform: scale(1);    opacity: 0.55; }
    70%  { transform: scale(1.6);  opacity: 0; }
    100% { transform: scale(1.6);  opacity: 0; }
  }
  @keyframes orbitDot {
    from { transform: rotate(var(--od-start)) translateX(115px) rotate(calc(-1 * var(--od-start))); }
    to   { transform: rotate(calc(var(--od-start) + 360deg)) translateX(115px) rotate(calc(-1 * (var(--od-start) + 360deg))); }
  }
  @keyframes shimmerText {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes cardPop {
    0%   { opacity:0; transform:scale(.86) translateY(14px); }
    100% { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes particleDrift {
    0%   { transform:translateY(0) translateX(0) scale(1);    opacity:.65; }
    50%  { transform:translateY(-38px) translateX(16px) scale(1.3); opacity:.35; }
    100% { transform:translateY(-76px) translateX(-8px) scale(.7); opacity:0; }
  }
  @keyframes bgGrad {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); opacity:0; }
    10%  { opacity:.15; }
    90%  { opacity:.15; }
    100% { transform: translateY(100vh); opacity:0; }
  }
  .logo-float  { animation: floatLogo 4.2s ease-in-out infinite; }
  .pulse-ring  { animation: pulsRing 2.6s ease-out infinite; }
  .fade-up     { animation: fadeUp .7s ease both; }
  .card-pop    { animation: cardPop .55s cubic-bezier(.22,.68,0,1.2) both; }
  .shimmer-txt {
    background: linear-gradient(90deg,#fff 0%,#f9a8d4 38%,#fff 55%,#a5b4fc 80%,#fff 100%);
    background-size: 400px 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3.2s linear infinite;
  }
  .bg-anim {
    background: linear-gradient(135deg,#1a2f5e,#2d1b6b,#1e3555,#3a1f6a,#1a2f5e);
    background-size:400% 400%;
    animation: bgGrad 9s ease infinite;
  }
  .scan-line {
    position:absolute; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,rgba(249,168,212,.4),transparent);
    animation: scanLine 6s ease-in-out infinite;
    pointer-events:none;
  }
`;

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 2.5 + (i % 4) * 1.5,
  left: (i * 5.1) % 100,
  top:  30 + (i * 3.7) % 55,
  delay: (i * 0.27) % 5,
  dur:   3.8 + (i % 4) * 1.1,
  color: i % 3 === 0 ? "rgba(249,168,212,.6)" : i % 3 === 1 ? "rgba(165,180,252,.5)" : "rgba(253,230,138,.5)",
}));

const ORBIT_DOTS = [
  { color: "#f9a8d4", glow: "#f472b6", start: "0deg",   dur: "7s"  },
  { color: "#93c5fd", glow: "#60a5fa", start: "120deg", dur: "10s" },
  { color: "#fde68a", glow: "#fbbf24", start: "240deg", dur: "13s" },
];

const STATS = [
  { v: "300+", l: "Colleges", d: "0.25s" },
  { v: "3",    l: "Exams",    d: "0.4s"  },
  { v: "95%",  l: "Accuracy", d: "0.55s" },
  { v: "10K+", l: "Students", d: "0.7s"  },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [showPassword, setShowPassword]     = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [loading, setLoading]               = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/");
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <>
      <style>{ANIM_STYLES}</style>
      <div className="min-h-screen bg-background flex">

        {/* ══ LEFT PANEL ══════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[52%] flex-col items-center justify-center relative overflow-hidden bg-anim">

          {/* Scan line effect */}
          <div className="scan-line" />

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:"linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px)",
              backgroundSize:"52px 52px",
            }}
          />

          {/* Glow blobs */}
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-pink-600/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          {/* Floating particles */}
          {PARTICLES.map((p) => (
            <div key={p.id} className="absolute rounded-full pointer-events-none"
              style={{ width:p.size, height:p.size, left:`${p.left}%`, top:`${p.top}%`,
                background:p.color,
                animation:`particleDrift ${p.dur}s ${p.delay}s ease-in-out infinite` }}
            />
          ))}

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center px-10 text-center gap-7">

            {/* Logo + orbit + pulse */}
            <div className="relative flex items-center justify-center" style={{ width:250, height:250 }}>

              {/* Pulse rings */}
              {[0, 0.9, 1.8].map((d, i) => (
                <div key={i} className="pulse-ring absolute rounded-full border-2 border-pink-400/35"
                  style={{ width:205, height:205, animationDelay:`${d}s`,
                    top:"50%", left:"50%", marginTop:-102.5, marginLeft:-102.5 }}
                />
              ))}

              {/* Orbit dots */}
              {ORBIT_DOTS.map((dot, i) => (
                <div key={i} className="absolute" style={{
                  top:"50%", left:"50%", marginTop:-7, marginLeft:-7,
                  "--od-start": dot.start,
                  animation:`orbitDot ${dot.dur} linear infinite`,
                } as React.CSSProperties}>
                  <div className="rounded-full" style={{
                    width:14, height:14,
                    background:dot.color,
                    boxShadow:`0 0 10px 3px ${dot.glow}88`,
                  }} />
                </div>
              ))}

              {/* Logo */}
              <div className="logo-float relative z-10">
                <img
                  src="/logo.png"
                  alt="College Admission Assistance Agent"
                  style={{
                    width:190, height:190, objectFit:"contain",
                    filter:"drop-shadow(0 10px 38px rgba(249,168,212,.55)) drop-shadow(0 2px 10px rgba(0,0,0,.45))",
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="fade-up" style={{ animationDelay:"0.1s" }}>
              <h2 className="shimmer-txt font-display text-3xl font-bold leading-snug mb-2">
                College Admission<br />Assistance Agent
              </h2>
              <p className="text-white/55 text-sm max-w-[280px] leading-relaxed mx-auto">
                AI-powered college matching based on your rank, budget, and location — instant results.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2.5 w-full max-w-[320px]">
              {STATS.map(({ v, l, d }) => (
                <div key={l} className="card-pop rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm py-3 px-1.5 text-center"
                  style={{ animationDelay:d }}>
                  <p className="font-display text-lg font-bold text-white leading-none">{v}</p>
                  <p className="text-white/45 text-[9px] mt-1 font-medium tracking-wide uppercase">{l}</p>
                </div>
              ))}
            </div>

            {/* Testimonial card */}
            <div className="fade-up rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-left max-w-[300px]"
              style={{ animationDelay:"0.9s" }}>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_,i) => (
                  <svg key={i} className="h-3.5 w-3.5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/75 text-xs leading-relaxed italic">
                "Match score of 87 for IIT Hyderabad. The AI explained exactly why it fit my rank and budget."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-400 to-indigo-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">AR</div>
                <div>
                  <p className="text-white text-xs font-semibold">Arjun Rao</p>
                  <p className="text-white/40 text-[10px]">JEE Rank 4,200 · IIT Hyderabad</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══ RIGHT PANEL — Form ══════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <img src="/logo.png" alt="logo" className="h-10 w-10 object-contain" />
              <div>
                <p className="font-display text-sm font-bold text-foreground leading-tight">College Admission</p>
                <p className="text-xs text-muted-foreground">Assistance Agent</p>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground">Welcome back</h1>
              <p className="mt-1.5 text-muted-foreground text-sm">Sign in to access your college recommendations</p>
            </div>

            <button onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-card py-3 px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors mb-6 shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs text-muted-foreground">
                <span className="bg-background px-3">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />{error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <button type="button" className="text-xs text-primary hover:underline"
                    onClick={async()=>{ if(!email) return; await supabase.auth.resetPasswordForEmail(email); alert("Password reset email sent!"); }}>
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type={showPassword?"text":"password"} required value={password}
                    onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  <button type="button" onClick={()=>setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all mt-2 shadow-sm">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>Signing in...
                  </span>
                ) : <><span>Sign in</span><ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
