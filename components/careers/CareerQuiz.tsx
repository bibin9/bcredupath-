"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, X, ArrowLeft, ArrowRight, Loader2, Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CAREER_QUIZ, SUBJECT_OPTIONS } from "@/lib/career-matcher";

type Phase = "subjects" | "interests";

export function CareerQuiz({ defaultInterests = [] }: { defaultInterests?: string[] }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("subjects");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, boolean>>(new Map());
  const [submitting, setSubmitting] = useState(false);

  const q = CAREER_QUIZ[idx];
  const total = CAREER_QUIZ.length;
  const isLast = idx === total - 1;

  function toggleSubject(id: string) {
    setSubjects((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function startInterestPhase() {
    if (subjects.length === 0) {
      toast.error("Pick at least one subject you enjoy");
      return;
    }
    setPhase("interests");
  }

  function pick(yes: boolean) {
    setAnswers((m) => {
      const next = new Map(m);
      next.set(q.id, yes);
      return next;
    });
    if (isLast) return;
    setIdx((i) => i + 1);
  }

  function back() {
    if (phase === "interests" && idx === 0) {
      setPhase("subjects");
      return;
    }
    setIdx((i) => Math.max(0, i - 1));
  }

  async function submit() {
    setSubmitting(true);
    const tags = new Set<string>(defaultInterests.filter((t) => !t.startsWith("q:")));
    for (const item of CAREER_QUIZ) {
      const yes = answers.get(item.id);
      if (yes) item.tags.forEach((t) => tags.add(t));
    }
    if (tags.size === 0 && subjects.length === 0) {
      toast.error("Pick at least one 'yes' or one subject to find matches");
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/careers/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: Array.from(tags),
          subjects,
          save: true,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Matches updated 🎯");
      router.push("/dashboard/careers");
      router.refresh();
    } catch {
      toast.error("Couldn't save — try again");
      setSubmitting(false);
    }
  }

  /* ─── SUBJECT PHASE ─── */
  if (phase === "subjects") {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <div className="card-glass">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-neon-cyan" />
            <span className="font-display text-base font-bold">Step 1 — Subjects you enjoy</span>
          </div>
          <p className="text-xs text-white/65">
            Pick the subjects you genuinely like. We'll match careers that use them.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SUBJECT_OPTIONS.map((s) => {
              const picked = subjects.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSubject(s.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition-all",
                    picked
                      ? "border-neon-purple/60 bg-neon-purple/15 shadow-glow-purple"
                      : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                  )}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span className="truncate font-semibold">{s.label}</span>
                  {picked && <Check className="ml-auto h-4 w-4 text-neon-purple shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-center text-xs text-white/55">
            <b className="text-white">{subjects.length}</b> selected · pick as many as you like
          </div>
        </div>

        <button
          onClick={startInterestPhase}
          disabled={subjects.length === 0}
          className="btn-neon w-full"
        >
          Next: interest questions <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  /* ─── INTEREST PHASE ─── */
  const yesCount = [...answers.values()].filter(Boolean).length;
  const noCount = [...answers.values()].filter((v) => !v).length;
  const progress = ((idx + 1) / total) * 100;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="card-glass !p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-white/55">
            Step 2 · <b className="text-white">{idx + 1}</b> / {total}
          </span>
          <div className="flex gap-2 text-[10px]">
            <span className="pill-neon-green !px-2 !py-0">✓ {yesCount}</span>
            <span className="pill !px-2 !py-0 !text-white/55">✗ {noCount}</span>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full bg-grad-pink-purple"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "relative overflow-hidden rounded-4xl border border-white/[0.08] bg-gradient-to-br p-8 text-center",
            "from-neon-purple/15 via-bg-2 to-neon-pink/10 shadow-glass"
          )}
        >
          <span className="pill-neon-cyan absolute left-4 top-4">
            <Sparkles className="h-3 w-3" /> Interest check
          </span>
          <div className="mt-12 mb-4 text-7xl">{q.emoji}</div>
          <p className="font-display text-2xl font-bold leading-snug">{q.text}</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => pick(false)}
          className="rounded-3xl border border-neon-pink/30 bg-neon-pink/10 px-4 py-4 text-base font-bold text-neon-pink transition-all hover:border-neon-pink hover:bg-neon-pink/20"
        >
          <X className="mx-auto mb-1 h-5 w-5" />
          Not me
        </button>
        <button
          onClick={() => pick(true)}
          className="rounded-3xl border border-neon-green/40 bg-neon-green/15 px-4 py-4 text-base font-bold text-neon-green transition-all hover:border-neon-green hover:bg-neon-green/25"
        >
          <Check className="mx-auto mb-1 h-5 w-5" />
          Yes, that's me
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={back} className="btn-ghost text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {isLast && answers.size > 0 ? (
          <button onClick={submit} disabled={submitting} className="btn-neon text-sm">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "See matches"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={() => setIdx(Math.min(total - 1, idx + 1))} className="btn-ghost text-sm">
            Skip <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
