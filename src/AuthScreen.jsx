import { useEffect, useState } from "react";
import { LogIn, UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { supabase, supabaseConfigured } from "./lib/supabase";

export default function AuthScreen() {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setMessage("");
  }, [mode]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    if (!supabaseConfigured || !supabase) {
      setError("Supabase is not configured. Add the production environment variables first.");
      setBusy(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setBusy(false);
      return;
    }

    try {
      if (mode === "signup") {
        if (!fullName.trim()) throw new Error("Enter your full name.");
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: window.location.origin,
          },
        });
        if (authError) throw authError;
        if (data.session) {
          setMessage("Account created. You're signed in.");
        } else {
          setMessage("Account created. Check your email to confirm your address, then sign in.");
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (authError) throw authError;
      }
    } catch (err) {
      setError(err?.message || "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f6f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <span className="text-4xl font-black uppercase tracking-tight text-amber-500">Anytime</span>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mt-1">Learn Anytime</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-7">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 rounded-md text-xs font-mono uppercase tracking-wide ${mode === "signin" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-md text-xs font-mono uppercase tracking-wide ${mode === "signup" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <label className="block">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">Full name</span>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-9 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900" autoComplete="name" />
                </div>
              </label>
            )}

            <label className="block">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">Email</span>
              <div className="relative mt-1">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900" autoComplete="email" />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">Password</span>
              <div className="relative mt-1">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-9 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900" autoComplete={mode === "signup" ? "new-password" : "current-password"} />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Minimum 8 characters.</span>
            </label>

            {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p>}
            {message && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">{message}</p>}

            <button disabled={busy} className="w-full py-3 rounded-lg bg-slate-950 text-amber-400 font-mono font-semibold uppercase tracking-wide disabled:opacity-60 flex items-center justify-center gap-2">
              {busy ? <Loader2 size={16} className="animate-spin" /> : mode === "signin" ? <LogIn size={16} /> : <UserPlus size={16} />}
              {busy ? "Please wait" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
