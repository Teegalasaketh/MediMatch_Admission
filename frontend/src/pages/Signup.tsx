import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";

/* Reuse the same animation styles — import from a shared module in production */
const ANIM_STYLES = `
  @keyframes floatLogo {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-16px) rotate(1deg); }
  }
  @keyframes pulsRing {
    0%   { transform: scale(1);   opacity: .55; }
    70%  { transform: scale(1.6); opacity: 0; }
    100% { transform: scale(1.6); opacity: 0; }
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
  @keyframes featurePop {
    0%   { opacity:0; transform:translateX(-18px); }
    100% { opacity:1; transform:translateX(0); }
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
    0%   { transform:translateY(-100%); opacity:0; }
    10%  { opacity:.13; }
    90%  { opacity:.13; }
    100% { transform:translateY(100vh); opacity:0; }
  }
  @keyframes floatBadge {
    0%,100% { transform:translateY(0) rotate(-2deg); }
    50%     { transform:translateY(-10px) rotate(2deg); }
  }
  .logo-float    { animation: floatLogo 4.2s ease-in-out infinite; }
  .pulse-ring    { animation: pulsRing 2.6s ease-out infinite; }
  .fade-up       { animation: fadeUp .7s ease both; }
  .feature-pop   { animation: featurePop .6s cubic-bezier(.22,.68,0,1.2) both; }
  .shimmer-txt {
    background: linear-gradient(90deg,#fff 0%,#f9a8d4 38%,#fff 55%,#a5b4fc 80%,#fff 100%);
    background-size:400px 100%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmerText 3.2s linear infinite;
  }
  .bg-anim {
    background: linear-gradient(135deg,#1a2f5e,#2d1b6b,#1e3555,#3a1f6a,#1a2f5e);
    background-size:400% 400%;
    animation: bgGrad 9s ease infinite;
  }
  .scan-line {
    position:absolute; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,rgba(249,168,212,.35),transparent);
    animation: scanLine 6s ease-in-out infinite;
    pointer-events:none;
  }
  .float-badge { animation: floatBadge 3s ease-in-out infinite; }
`;

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, size: 2.5 + (i%4)*1.5,
  left:(i*5.3)%100, top:30+(i*3.7)%55,
  delay:(i*.27)%5, dur:3.8+(i%4)*1.1,
  color: i%3===0 ? "rgba(249,168,212,.6)" : i%3===1 ? "rgba(165,180,252,.5)" : "rgba(253,230,138,.45)",
}));

const ORBIT_DOTS = [
  { color:"#f9a8d4", glow:"#f472b6", start:"60deg",  dur:"8s"  },
  { color:"#93c5fd", glow:"#60a5fa", start:"180deg", dur:"11s" },
  { color:"#fde68a", glow:"#fbbf24", start:"300deg", dur:"14s" },
];

const FEATURES = [
  { icon:"🎯", title:"Personalized Matches",   desc:"AI ranks colleges by rank, budget & state", delay:"0.2s" },
  { icon:"📊", title:"Safe / Target / Dream",  desc:"Know your admission probability instantly",  delay:"0.35s" },
  { icon:"🤖", title:"AI College Advisor",     desc:"Chat with AI for deep-dive college info",    delay:"0.5s" },
  { icon:"⚡", title:"Instant Results",        desc:"300+ colleges analyzed in under 2 seconds",  delay:"0.65s" },
];

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName]                     = useState("");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [showPassword, setShowPassword]     = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [loading, setLoading]               = useState(false);
  const [success, setSuccess]               = useState(false);

  const pwStrength = (() => {
    if (!password.length) return 0;
    let s = 0;
    if (password.length >= 8)       s++;
    if (/[A-Z]/.test(password))     s++;
    if (/[0-9]/.test(password))     s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strColors = ["bg-destructive","bg-orange-400","bg-yellow-400","bg-safe","bg-safe"];
  const strLabels = ["","Weak","Fair","Good","Strong"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{ redirectTo: window.location.origin },
    });
  };

  if (success) {
    return (
      <>
        <style>{ANIM_STYLES}</style>
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-safe/10">
              <CheckCircle2 className="h-10 w-10 text-safe" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Check your inbox</h1>
            <p className="text-muted-foreground mb-6">
              We've sent a confirmation link to <strong className="text-foreground">{email}</strong>.
              Click it to activate your account.
            </p>
            <Link to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Back to login <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{ANIM_STYLES}</style>
      <div className="min-h-screen bg-background flex">

        {/* ══ LEFT PANEL ══════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[52%] flex-col items-center justify-center relative overflow-hidden bg-anim">

          <div className="scan-line" />

          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:"linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px)",
              backgroundSize:"52px 52px",
            }}
          />

          {/* Glow blobs */}
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          {/* Particles */}
          {PARTICLES.map((p) => (
            <div key={p.id} className="absolute rounded-full pointer-events-none"
              style={{ width:p.size, height:p.size, left:`${p.left}%`, top:`${p.top}%`,
                background:p.color,
                animation:`particleDrift ${p.dur}s ${p.delay}s ease-in-out infinite` }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center px-10 text-center gap-7">

            {/* Logo */}
            <div className="relative flex items-center justify-center" style={{ width:230, height:230 }}>
              {[0, 0.9, 1.8].map((d,i) => (
                <div key={i} className="pulse-ring absolute rounded-full border-2 border-pink-400/35"
                  style={{ width:195, height:195, animationDelay:`${d}s`,
                    top:"50%", left:"50%", marginTop:-97.5, marginLeft:-97.5 }}
                />
              ))}
              {ORBIT_DOTS.map((dot,i) => (
                <div key={i} className="absolute" style={{
                  top:"50%", left:"50%", marginTop:-7, marginLeft:-7,
                  "--od-start": dot.start,
                  animation:`orbitDot ${dot.dur} linear infinite`,
                } as React.CSSProperties}>
                  <div className="rounded-full" style={{
                    width:13, height:13, background:dot.color,
                    boxShadow:`0 0 10px 3px ${dot.glow}88`,
                  }} />
                </div>
              ))}
              <div className="logo-float relative z-10">
                <img src="/logo.png" alt="College Admission Assistance Agent"
                  style={{
                    width:175, height:175, objectFit:"contain",
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
                Join thousands of students who found their perfect college using AI.
              </p>
            </div>

            {/* Feature list */}
            <div className="w-full max-w-[310px] space-y-2.5">
              {FEATURES.map(({ icon, title, desc, delay }) => (
                <div key={title} className="feature-pop flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-left"
                  style={{ animationDelay: delay }}>
                  <div className="text-xl shrink-0 float-badge">{icon}</div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">{title}</p>
                    <p className="text-white/45 text-[10px] mt-0.5 leading-tight">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Free badge */}
            <div className="fade-up text-white/40 text-xs" style={{ animationDelay:"0.8s" }}>
              ✦ Free forever · No credit card required ✦
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL — Form ══════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background overflow-y-auto">
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
              <h1 className="font-display text-3xl font-bold text-foreground">Create your account</h1>
              <p className="mt-1.5 text-muted-foreground text-sm">Free forever. No credit card needed.</p>
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
                <span className="bg-background px-3">or sign up with email</span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />{error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" required value={name} onChange={e=>setName(e.target.value)}
                    placeholder="Arjun Rao"
                    className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                </div>
              </div>

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
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type={showPassword?"text":"password"} required minLength={8}
                    value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  <button type="button" onClick={()=>setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i<=pwStrength ? strColors[pwStrength] : "bg-muted"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{strLabels[pwStrength]}</p>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all mt-2 shadow-sm">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>Creating account...
                  </span>
                ) : <><span>Create account</span><ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
