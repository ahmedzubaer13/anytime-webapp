import { useState, useEffect } from "react";
import {
  Search, Clock, ArrowLeft, Check, GraduationCap,
  X, Wallet, History, CalendarCheck, Plus, Circle,
  Sparkles, Globe, ChevronLeft, ChevronRight,
  Camera, Timer, ShieldCheck, Zap, Upload, Brain,
  MessageCircle, BookOpen, Star, UserCheck, RotateCcw, SlidersHorizontal,
} from "lucide-react";

const TEACHERS = [
  {
    id: 1, name: "Maria Chen", subjects: ["Algebra", "Calculus"], rate: 18,
    rating: 4.9, reviews: 132, color: "amber",
    bio: "Ten years tutoring high schoolers through algebra and calculus. I build from what you already understand instead of starting over.",
    tags: ["Exam prep", "Patient"],
    verified: true, response: 2, repeatRate: 78, sessions: 418, level: "High school · University",
    minuteRate: 0.30, languages: ["English"],
    slots: ["Today 4:00 PM", "Today 6:30 PM", "Tomorrow 10:00 AM"],
  },
  {
    id: 2, name: "Daniel Okafor", subjects: ["Physics"], rate: 22,
    rating: 4.8, reviews: 89, color: "sky",
    bio: "Former lab instructor. I teach physics through the questions you'd actually ask in a lab, not just the formulas.",
    tags: ["Problem sets", "Visual explainer"],
    verified: true, response: 3, repeatRate: 74, sessions: 286, level: "High school · University",
    minuteRate: 0.37, languages: ["English"],
    slots: ["Today 5:00 PM", "Tomorrow 9:00 AM", "Tomorrow 2:00 PM"],
  },
  {
    id: 3, name: "Sofia Reyes", subjects: ["Spanish"], rate: 15,
    rating: 5.0, reviews: 210, color: "rose",
    bio: "Native speaker from Madrid. Conversational focus from lesson one — you'll be speaking, not just memorizing verb tables.",
    tags: ["Conversation", "Beginner friendly"],
    verified: true, response: 1, repeatRate: 84, sessions: 612, level: "Beginner · Intermediate",
    minuteRate: 0.25, languages: ["English", "Spanish"],
    slots: ["Today 3:00 PM", "Today 7:00 PM", "Tomorrow 11:00 AM"],
  },
  {
    id: 4, name: "James Whitfield", subjects: ["Python", "Data Structures"], rate: 25,
    rating: 4.7, reviews: 64, color: "emerald",
    bio: "Backend engineer by day. I teach Python and data structures the way I wish someone had taught me — with real code, not slides.",
    tags: ["Interview prep", "Live coding"],
    verified: true, response: 4, repeatRate: 71, sessions: 203, level: "University · Professional",
    minuteRate: 0.42, languages: ["English"],
    slots: ["Today 8:00 PM", "Tomorrow 1:00 PM", "Tomorrow 6:00 PM"],
  },
  {
    id: 5, name: "Aiko Tanaka", subjects: ["Piano", "Music Theory"], rate: 20,
    rating: 4.9, reviews: 97, color: "violet",
    bio: "Classically trained, but I teach whatever you want to play — classical, pop, or film scores. Theory taught through your own pieces.",
    tags: ["All levels", "Repertoire choice"],
    verified: true, response: 3, repeatRate: 81, sessions: 344, level: "All levels",
    minuteRate: 0.33, languages: ["English", "Japanese"],
    slots: ["Today 4:30 PM", "Tomorrow 10:30 AM", "Tomorrow 3:00 PM"],
  },
  {
    id: 6, name: "Ben Torres", subjects: ["English Writing"], rate: 16,
    rating: 4.8, reviews: 145, color: "orange",
    bio: "Former newspaper editor. I help with essays, applications, and just writing sentences that sound like you.",
    tags: ["College essays", "Editing"],
    verified: true, response: 2, repeatRate: 76, sessions: 391, level: "High school · University",
    minuteRate: 0.27, languages: ["English"],
    slots: ["Today 6:00 PM", "Tomorrow 9:30 AM", "Tomorrow 5:00 PM"],
  },
];

const AVATAR_BG = {
  amber: "bg-amber-500", sky: "bg-sky-500", rose: "bg-rose-500",
  emerald: "bg-emerald-600", violet: "bg-violet-500", orange: "bg-orange-500",
};

const DURATIONS = [30, 60, 90];
const BARCODE_WIDTHS = [2,1,3,1,2,4,1,1,3,2,1,4,2,1,1,3,2,4,1,2,3,1,1,2,4,1,3,2,1,1,2,3];

const SLIDES = [
  { icon: GraduationCap, eyebrow: "LEARN ANYTIME", title: "Any subject. Any hour.", body: "Real teachers, ready when you are — not just during office hours." },
  { icon: Sparkles, eyebrow: "TRY FIRST", title: "Every teacher offers a free trial", body: "15 minutes, no cost, so you know it's a fit before you spend a cent." },
  { icon: Wallet, eyebrow: "PAY BY THE MINUTE", title: "Recharge once, hire anyone", body: "Your balance carries across every teacher on Anytime." },
  { icon: Globe, eyebrow: "ALWAYS SOMEONE ON", title: "Someone's active right now", body: "Teachers across time zones mean help is closer than it looks." },
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
function money(n) {
  return `$${n.toFixed(2)}`;
}
function isActive(slot) {
  return slot.startsWith("Today");
}

function Barcode() {
  return (
    <div className="flex items-end gap-[2px] h-6 opacity-70">
      {BARCODE_WIDTHS.map((w, i) => (
        <div key={i} className="bg-slate-500" style={{ width: `${w}px`, height: "100%" }} />
      ))}
    </div>
  );
}

function StatusTag({ slot }) {
  const active = isActive(slot);
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider ${active ? "text-emerald-400" : "text-slate-400"}`}>
      <Circle size={7} className={active ? "fill-emerald-400 text-emerald-400" : "fill-slate-500 text-slate-500"} />
      {active ? "Active" : `Next: ${slot}`}
    </span>
  );
}

function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative bg-slate-950 rounded-xl overflow-hidden mb-7 border border-slate-800 shadow-xl shadow-slate-950/10">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="min-w-full px-6 py-9 sm:px-10 sm:py-11 flex items-center gap-5 sm:gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                <Icon className="text-amber-400" size={22} />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{s.eyebrow}</p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-50 mt-1">{s.title}</h2>
                <p className="text-slate-400 text-sm mt-1.5 max-w-md">{s.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/90 text-slate-300 hover:text-amber-400 flex items-center justify-center border border-slate-700"
        aria-label="Previous slide"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/90 text-slate-300 hover:text-amber-400 flex items-center justify-center border border-slate-700"
        aria-label="Next slide"
      >
        <ChevronRight size={16} />
      </button>

      <div className="flex justify-center gap-1.5 pb-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-amber-400" : "w-1.5 bg-slate-700"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Sidebar({ activeCount, subjectCounts, onFilter, balance, onAddFunds }) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="bg-slate-950 rounded-sm p-4 border border-slate-800">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Live board</p>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Active now</span>
            <span className="font-mono text-amber-400 text-sm">{activeCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Sessions today</span>
            <span className="font-mono text-amber-400 text-sm">128</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Avg reply time</span>
            <span className="font-mono text-amber-400 text-sm">4 min</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Popular subjects</p>
        <div className="flex flex-col">
          {subjectCounts.map(([subj, count]) => (
            <button
              key={subj}
              onClick={() => onFilter(subj)}
              className="flex items-center justify-between text-sm text-slate-700 hover:text-slate-900 py-1.5 border-b border-slate-100 last:border-0 text-left"
            >
              <span>{subj}</span>
              <span className="font-mono text-xs text-slate-400">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">How it works</p>
        <ol className="flex flex-col gap-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="font-mono text-amber-600">1</span>Browse & compare teachers</li>
          <li className="flex gap-2"><span className="font-mono text-amber-600">2</span>Book a free trial</li>
          <li className="flex gap-2"><span className="font-mono text-amber-600">3</span>Hire by the minute</li>
        </ol>
      </div>

      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Balance</p>
          <p className="font-mono text-amber-400 text-lg">{money(balance)}</p>
        </div>
        <button onClick={onAddFunds} className="text-[11px] font-mono uppercase tracking-wide px-3 py-1.5 rounded-sm bg-amber-400 text-slate-950 hover:bg-amber-300">
          Add funds
        </button>
      </div>
    </aside>
  );
}

function TeacherRow({ teacher, onOpen }) {
  return (
    <button
      onClick={() => onOpen(teacher.id)}
      className="w-full grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 gap-y-1 px-4 py-3.5 border-b border-slate-800/70 last:border-b-0 hover:bg-slate-900/80 text-left transition-all duration-200 focus:outline-none focus:bg-slate-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
    >
      <div className={`w-9 h-9 rounded-full ${AVATAR_BG[teacher.color]} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
        {initials(teacher.name)}
      </div>
      <div className="min-w-0">
        <p className="text-slate-100 font-semibold truncate">{teacher.name}</p>
        <p className="text-xs font-mono text-slate-500 truncate tracking-wide">{teacher.subjects.join(" · ").toUpperCase()}</p>
      </div>
      <span className="col-start-2 sm:col-start-3 font-mono text-amber-400 text-sm justify-self-start sm:justify-self-end">
        {money(teacher.rate)}/HR
      </span>
      <span className="col-start-2 sm:col-start-4 justify-self-start">
        <StatusTag slot={teacher.slots[0]} />
      </span>
      <span className="col-start-2 sm:col-start-5 font-mono text-amber-300/90 text-xs justify-self-start sm:justify-self-end">
        ★ {teacher.rating} ({teacher.reviews})
      </span>
    </button>
  );
}

function TeacherDetail({ teacher, trialUsed, onBack, onBookTrial, onHire, balance }) {
  const [duration, setDuration] = useState(60);
  const [slot, setSlot] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cost = Math.round(teacher.rate * (duration / 60) * 100) / 100;

  function handleTrial() {
    onBookTrial(teacher);
    setSuccess("Trial booked. Check My Bookings for the time.");
    setError("");
  }

  function handleHireClick() {
    if (!slot) {
      setError("Pick a time slot first.");
      return;
    }
    if (balance < cost) {
      setError(`Not enough balance. Add ${money(cost - balance)} more to book this session.`);
      return;
    }
    onHire(teacher, duration, slot, cost);
    setSuccess(`Session booked with ${teacher.name} for ${slot}.`);
    setError("");
    setSlot(null);
  }

  return (
    <div className="max-w-3xl mx-auto animate-[fadeIn_.25s_ease-out]">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-mono text-slate-500 hover:text-slate-800 mb-4">
        <ArrowLeft size={16} /> Back to teachers
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${AVATAR_BG[teacher.color]} text-white flex items-center justify-center text-xl font-bold shrink-0`}>
            {initials(teacher.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{teacher.name}</h2>
            <p className="text-sm font-mono text-slate-500 tracking-wide">{teacher.subjects.join(" · ").toUpperCase()}</p>
            <p className="text-sm font-mono text-amber-600 mt-1">★ {teacher.rating} · {teacher.reviews} reviews</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {teacher.tags.map((t) => (
            <span key={t} className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-sm">{t}</span>
          ))}
        </div>
        <div className="border-t border-slate-200 my-4" />
        <p className="text-slate-700 leading-relaxed">{teacher.bio}</p>
        <p className="font-mono text-sm font-semibold text-slate-900 mt-3">{money(teacher.rate)} / hour</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-950 text-slate-100 rounded-sm p-5 border border-dashed border-slate-700 relative overflow-hidden">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Boarding pass · Trial</p>
          <p className="text-2xl font-black uppercase mt-1 text-amber-400">15 min · Free</p>
          <p className="text-sm text-slate-400 mt-2">One trial per teacher, so you can see if it's a fit before spending anything.</p>
          <button
            onClick={handleTrial}
            disabled={trialUsed}
            className="mt-4 w-full py-2.5 rounded-lg font-mono text-sm font-semibold uppercase tracking-wide bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 transition-colors"
          >
            {trialUsed ? "Trial already used" : "Start free trial"}
          </button>
          <div className="mt-4">
            <Barcode />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900">
            <CalendarCheck size={16} />
            <h3 className="text-lg font-bold">Hire for a session</h3>
          </div>

          <p className="text-xs font-mono text-slate-500 mt-3 mb-1 tracking-wide">DURATION</p>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-1.5 rounded-sm text-sm font-mono border ${
                  duration === d
                    ? "bg-slate-900 text-amber-400 border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"
                }`}
              >
                {d}m
              </button>
            ))}
          </div>

          <p className="text-xs font-mono text-slate-500 mt-3 mb-1 tracking-wide">TIME SLOT</p>
          <div className="flex flex-col gap-1.5">
            {teacher.slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`text-left px-3 py-1.5 rounded-sm text-sm font-mono border flex items-center gap-2 ${
                  slot === s
                    ? "bg-slate-900 text-amber-400 border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"
                }`}
              >
                <Clock size={13} /> {s}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-200 my-3" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-mono text-slate-500 tracking-wide">TOTAL</span>
            <span className="font-mono text-lg font-semibold text-slate-900">{money(cost)}</span>
          </div>

          <button
            onClick={handleHireClick}
            className="w-full py-2.5 rounded-lg font-mono text-sm font-semibold uppercase tracking-wide bg-slate-900 text-amber-400 hover:bg-slate-800 transition-colors"
          >
            Confirm & pay {money(cost)}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-sm font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded-sm px-3 py-2">
          <X size={14} /> {error}
        </div>
      )}
      {success && (
        <div className="mt-4 flex items-center gap-2 text-sm font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm px-3 py-2">
          <Check size={14} /> {success}
        </div>
      )}
    </div>
  );
}

function SessionView({ teacher, seconds, onEnd }) {
  const minutes = Math.max(0, seconds / 60);
  const liveCost = Math.round(minutes * teacher.minuteRate * 100) / 100;
  return (
    <div className="max-w-2xl mx-auto animate-[fadeIn_.25s_ease-out]">
      <div className="bg-slate-950 text-slate-100 rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Session active</p>
            <h2 className="text-2xl font-black mt-1">{teacher.name}</h2>
            <p className="text-sm text-slate-400">{teacher.subjects.join(" · ")}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"><Timer className="text-emerald-400"/></div>
        </div>
        <div className="text-center py-10">
          <p className="font-mono text-6xl font-black text-amber-400 tracking-tight">{formatSessionTime(seconds)}</p>
          <p className="font-mono text-slate-400 mt-3">${teacher.minuteRate.toFixed(2)}/minute · current estimate ${liveCost.toFixed(2)}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-900 rounded-lg p-3"><p className="text-[10px] text-slate-500">Billing</p><p className="font-mono text-sm">Per minute</p></div>
          <div className="bg-slate-900 rounded-lg p-3"><p className="text-[10px] text-slate-500">Connection</p><p className="font-mono text-sm text-emerald-400">Excellent</p></div>
          <div className="bg-slate-900 rounded-lg p-3"><p className="text-[10px] text-slate-500">Protection</p><p className="font-mono text-sm">5-min grace</p></div>
        </div>
        <button onClick={onEnd} className="w-full py-3 rounded-lg bg-amber-400 text-slate-950 font-mono font-bold uppercase tracking-wide">End session & save notes</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mt-4">
        <div className="flex items-center gap-2"><Brain size={17}/><h3 className="font-bold">AI session assistant</h3></div>
        <p className="text-sm text-slate-500 mt-2">After the session, Anytime can generate a recap, key concepts, mistakes, and practice questions.</p>
      </div>
    </div>
  );
}

function WalletView({ balance, transactions, onRecharge }) {
  const [custom, setCustom] = useState("");

  return (
    <div className="max-w-2xl mx-auto animate-[fadeIn_.25s_ease-out]">
      <div className="bg-slate-950 text-slate-100 rounded-xl p-6 shadow-xl shadow-slate-950/10">
        <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Current balance</p>
        <p className="text-4xl font-black text-amber-400 mt-1">{money(balance)}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm p-5 mt-4">
        <h3 className="text-lg font-bold text-slate-900 mb-3">Add funds</h3>
        <div className="flex gap-2 flex-wrap">
          {[10, 25, 50, 100].map((amt) => (
            <button
              key={amt}
              onClick={() => onRecharge(amt)}
              className="px-4 py-2 rounded-sm font-mono text-sm border border-slate-300 bg-white hover:border-slate-900 hover:text-slate-900"
            >
              +{money(amt)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="Custom amount"
            className="flex-1 px-3 py-2 rounded-sm border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <button
            onClick={() => {
              const n = parseFloat(custom);
              if (n > 0) { onRecharge(n); setCustom(""); }
            }}
            className="px-4 py-2 rounded-sm font-mono text-sm font-semibold uppercase tracking-wide bg-slate-900 text-amber-400 hover:bg-slate-800 flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2 text-slate-500">
          <History size={16} />
          <h3 className="text-lg font-bold text-slate-900">Transaction history</h3>
        </div>
        {transactions.length === 0 ? (
          <p className="text-sm font-mono text-slate-500">No transactions yet.</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-sm px-3 py-2">
                <div>
                  <p className="text-sm text-slate-800">{t.note}</p>
                  <p className="text-[11px] font-mono text-slate-400">{t.date}</p>
                </div>
                <span className={`font-mono text-sm font-semibold ${t.amount >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {t.amount >= 0 ? "+" : ""}{money(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingsView({ bookings, onBrowse, onCancel }) {
  if (bookings.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 animate-[fadeIn_.25s_ease-out]">
        <GraduationCap className="mx-auto text-slate-400" size={40} />
        <p className="text-xl font-bold text-slate-800 mt-3">No classes booked yet</p>
        <p className="text-sm text-slate-500 mt-1">Browse teachers to book a trial or hire someone for your next session.</p>
        <button onClick={onBrowse} className="mt-4 px-5 py-2 rounded-sm font-mono text-sm font-semibold uppercase tracking-wide bg-slate-900 text-amber-400 hover:bg-slate-800">
          Browse teachers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-3 animate-[fadeIn_.25s_ease-out]">
      {bookings.map((b) => (
        <div key={b.id} className="bg-white border border-slate-200 border-l-4 border-l-amber-400 rounded-sm px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900">{b.teacherName} <span className="text-slate-300">·</span> <span className="text-slate-500 text-sm font-normal">{b.subject}</span></p>
            <p className="text-xs font-mono text-slate-400 mt-0.5 tracking-wide">{b.slot.toUpperCase()} · {b.duration} MIN</p>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm ${b.type === "trial" ? "bg-slate-100 text-slate-600" : "bg-slate-900 text-amber-400"}`}>
              {b.type === "trial" ? "Trial" : "Booked"}
            </span>
            <p className="font-mono text-sm text-slate-800 mt-1">{b.amount === 0 ? "Free" : money(b.amount)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const UI_STYLES = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default function Anytime() {
  const [tab, setTab] = useState("browse");
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [balance, setBalance] = useState(50);
  const [transactions, setTransactions] = useState([
    { id: 1, note: "Welcome bonus", amount: 50, date: "Aug 19, 2026" },
  ]);
  const [bookings, setBookings] = useState([]);
  const [trialsUsed, setTrialsUsed] = useState(new Set());
  const [problem, setProblem] = useState("");
  const [problemSubject, setProblemSubject] = useState("All");
  const [session, setSession] = useState(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [notes, setNotes] = useState([]);
  const [refunds, setRefunds] = useState([]);

  const subjects = ["All", ...new Set(TEACHERS.flatMap((t) => t.subjects))];
  const activeCount = TEACHERS.filter((t) => isActive(t.slots[0])).length;
  const subjectCounts = Object.entries(
    TEACHERS.flatMap((t) => t.subjects).reduce((acc, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const filtered = TEACHERS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesSubject = subjectFilter === "All" || t.subjects.includes(subjectFilter);
    return matchesSearch && matchesSubject;
  });

  const selected = TEACHERS.find((t) => t.id === selectedId);

  useEffect(() => {
    if (!session) return;
    const id = setInterval(() => setSessionSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [session]);

  useEffect(() => {
    if (autoRecharge && balance < 3) handleRecharge(10);
  }, [balance, autoRecharge]);

  function openTeacher(id) {
    setSelectedId(id);
    setTab("teacher");
  }

  function formatSessionTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function startNow(teacher) {
    setSelectedId(teacher.id);
    setTab("session");
    setSession({ teacherId: teacher.id, startedAt: Date.now() });
    setSessionSeconds(0);
  }

  function endSession() {
    if (!session) return;
    const teacher = TEACHERS.find((t) => t.id === session.teacherId);
    const minutes = Math.max(1, Math.ceil(sessionSeconds / 60));
    const cost = Math.round(minutes * teacher.minuteRate * 100) / 100;
    if (balance < cost) {
      setTab("wallet");
      setSession(null);
      setSuccessGlobal(`Session ended. Add ${money(cost - balance)} to settle the session.`);
      return;
    }
    setBalance((b) => b - cost);
    setTransactions((tx) => [
      { id: Date.now(), note: `Live session with ${teacher.name} · ${minutes} min`, amount: -cost, date: "Aug 19, 2026" },
      ...tx,
    ]);
    setBookings((b) => [
      { id: Date.now(), teacherName: teacher.name, subject: teacher.subjects[0], duration: minutes, slot: "Completed now", amount: cost, type: "live" },
      ...b,
    ]);
    setNotes((n) => [
      { id: Date.now(), teacherName: teacher.name, subject: teacher.subjects[0], minutes, text: `AI-generated recap: review ${teacher.subjects[0]} concepts discussed in this ${minutes}-minute session.` },
      ...n,
    ]);
    setSession(null);
    setSessionSeconds(0);
    setTab("bookings");
  }

  function cancelBooking(id) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    if (booking.amount > 0) {
      setBalance((b) => b + booking.amount);
      setTransactions((tx) => [
        { id: Date.now(), note: `Refund · ${booking.teacherName}`, amount: booking.amount, date: "Aug 19, 2026" },
        ...tx,
      ]);
    }
    setRefunds((r) => [...r, id]);
    setBookings((b) => b.filter((x) => x.id !== id));
  }

  function setSuccessGlobal(message) {
    setTransactions((tx) => tx);
    window.setTimeout(() => {}, 0);
  }

  function handleRecharge(amount) {
    setBalance((b) => b + amount);
    setTransactions((tx) => [
      { id: Date.now(), note: "Balance recharge", amount, date: "Aug 19, 2026" },
      ...tx,
    ]);
  }

  function handleBookTrial(teacher) {
    setTrialsUsed((prev) => new Set(prev).add(teacher.id));
    setBookings((b) => [
      { id: Date.now(), teacherName: teacher.name, subject: teacher.subjects[0], duration: 15, slot: teacher.slots[0], amount: 0, type: "trial" },
      ...b,
    ]);
  }

  function handleHire(teacher, duration, slot, cost) {
    setBalance((b) => b - cost);
    setTransactions((tx) => [
      { id: Date.now(), note: `Session with ${teacher.name}`, amount: -cost, date: "Aug 19, 2026" },
      ...tx,
    ]);
    setBookings((b) => [
      { id: Date.now(), teacherName: teacher.name, subject: teacher.subjects[0], duration, slot, amount: cost, type: "paid" },
      ...b,
    ]);
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-slate-900 selection:bg-amber-200 selection:text-slate-950">
      <header className="bg-slate-950/95 backdrop-blur-md text-slate-100 sticky top-0 z-20 border-b border-slate-800 shadow-lg shadow-slate-950/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-black uppercase tracking-tight text-amber-400 hover:text-amber-300 transition-colors">Anytime</span>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 -mt-1">Learn Anytime</p>
          </div>
          <nav className="hidden sm:flex items-center gap-1 font-mono text-sm">
            {[
              ["browse", "Browse"],
              ["bookings", "My Bookings"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-3 py-1.5 rounded-sm uppercase tracking-wide text-xs transition-colors ${tab === key ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:bg-slate-900"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setTab("wallet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-sm border ${tab === "wallet" ? "bg-amber-400 text-slate-950 border-amber-400" : "border-slate-700 text-slate-100 hover:border-amber-400"}`}
          >
            <Wallet size={14} /> {money(balance)}
          </button>
        </div>
        <div className="sm:hidden flex justify-center gap-1 font-mono text-xs pb-2">
          {[
            ["browse", "Browse"],
            ["bookings", "Bookings"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-3 py-1 rounded-sm uppercase tracking-wide ${tab === key ? "bg-amber-400 text-slate-950" : "text-slate-300"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-7 sm:py-9">
        {tab === "browse" && (
          <>
            <Slideshow />
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600">Need help now?</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">Post your problem. Find an expert.</h2>
                  <p className="text-sm text-slate-500 mt-1 max-w-2xl">Describe the problem, upload a photo later, and we’ll surface teachers who can help right now.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                  <Circle size={7} className="fill-emerald-500 text-emerald-500" /> {activeCount} available now
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="e.g. I can't understand projectile motion..." className="w-full pl-10 pr-3 py-3 rounded-lg border border-slate-300 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
                </div>
                <button onClick={() => setProblemSubject(subjectFilter)} className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-mono flex items-center gap-2"><SlidersHorizontal size={15}/> {problemSubject}</button>
                <button onClick={() => { if (!problem.trim()) return; setSubjectFilter(problemSubject === "All" ? "All" : problemSubject); }} className="px-5 py-2.5 rounded-lg bg-slate-950 text-amber-400 font-mono text-sm font-semibold">Find an expert</button>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                <button className="text-xs font-mono px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-slate-500"><Upload size={13} className="inline mr-1"/> Upload problem</button>
                <span className="text-xs text-slate-400 self-center">AI can classify your problem and match the right teacher.</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-end justify-between mb-3">
                <div><p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Available right now</p><h3 className="text-xl font-black text-slate-900">Get help in minutes</h3></div>
                <span className="text-xs font-mono text-slate-500">Pay only for time used</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TEACHERS.filter(t => isActive(t.slots[0])).slice(0,3).map(t => (
                  <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${AVATAR_BG[t.color]} text-white flex items-center justify-center font-bold text-xs`}>{initials(t.name)}</div>
                      <div className="min-w-0"><p className="font-semibold truncate">{t.name}</p><p className="text-xs text-slate-500 truncate">{t.subjects.join(" · ")}</p></div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs font-mono"><span className="text-emerald-600">● {t.response} min response</span><span>${t.minuteRate.toFixed(2)}/min</span></div>
                    <div className="flex justify-between items-center mt-3"><span className="text-xs text-amber-600">★ {t.rating}</span><button onClick={() => startNow(t)} className="px-3 py-1.5 rounded-lg bg-slate-950 text-amber-400 text-xs font-mono font-semibold">Start now</button></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
              <div>
                <div className="mb-5">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name or subject"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap mt-3">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSubjectFilter(s)}
                        className={`px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-wide border ${
                          subjectFilter === s
                            ? "bg-slate-900 text-amber-400 border-slate-900"
                            : "bg-white text-slate-600 border-slate-300 hover:border-slate-900"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl shadow-slate-950/10">
                  <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-3 px-4 py-2 border-b border-slate-800 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    <span className="w-9" />
                    <span>Teacher</span>
                    <span className="justify-self-end">Rate</span>
                    <span>Status</span>
                    <span className="justify-self-end">Rating</span>
                  </div>
                  {filtered.length === 0 ? (
                    <p className="text-sm font-mono text-slate-500 text-center py-12">No teachers match that search.</p>
                  ) : (
                    filtered.map((t) => <TeacherRow key={t.id} teacher={t} onOpen={openTeacher} />)
                  )}
                </div>
              </div>

              <Sidebar
                activeCount={activeCount}
                subjectCounts={subjectCounts}
                onFilter={setSubjectFilter}
                balance={balance}
                onAddFunds={() => setTab("wallet")}
              />
            </div>
          </>
        )}

        {tab === "teacher" && selected && (
          <TeacherDetail
            teacher={selected}
            trialUsed={trialsUsed.has(selected.id)}
            balance={balance}
            onBack={() => setTab("browse")}
            onBookTrial={handleBookTrial}
            onHire={handleHire}
          />
        )}

        {tab === "wallet" && (
          <WalletView balance={balance} transactions={transactions} onRecharge={handleRecharge} />
        )}

        {tab === "bookings" && (
          <>
            <BookingsView bookings={bookings} onBrowse={() => setTab("browse")} onCancel={cancelBooking} />
            <LearningNotes notes={notes} />
          </>
        )}

        {tab === "session" && session && (
          <SessionView
            teacher={TEACHERS.find((t) => t.id === session.teacherId)}
            seconds={sessionSeconds}
            onEnd={endSession}
          />
        )}
      </main>
    </div>
  );
}
