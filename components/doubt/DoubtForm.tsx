"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles, ThumbsUp, ThumbsDown, Trash2, History } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Latex } from "@/components/questions/Latex";

type Doubt = {
  id: string;
  subject?: string;
  chapter?: string;
  question: string;
  answer: string;
  helpful?: boolean | null;
  createdAt?: Date | string;
  /** True if this came from server history rather than the current session */
  _past?: boolean;
};

type Subject = { id: string; name: string; emoji: string };

const EXAMPLE_PROMPTS = [
  "Explain Ohm's law with a real-world example",
  "Why does $\\sqrt{2}$ have to be irrational?",
  "What's the difference between mitosis and meiosis?",
  "How to identify the type of chemical reaction in an equation?",
];

export function DoubtForm({ subjects }: { subjects: Subject[] }) {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // Current session only — fresh page = empty canvas. Past doubts are still
  // in DB and can be loaded on demand via "View previous" below.
  const [history, setHistory] = useState<Doubt[]>([]);
  const [showingPast, setShowingPast] = useState(false);
  const [loadingPast, setLoadingPast] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  async function loadPastDoubts() {
    if (showingPast) {
      // Toggle off — hide past doubts (keep only current session)
      setHistory((h) => h.filter((d) => !d.id.startsWith("past:") && !d._past));
      setShowingPast(false);
      return;
    }
    setLoadingPast(true);
    try {
      const r = await fetch("/api/ai/doubt");
      const d = await r.json();
      const past = (d.items ?? []).map((x: Doubt) => ({ ...x, _past: true }));
      // Show past underneath current-session items
      setHistory((current) => [...current, ...past]);
      setShowingPast(true);
    } catch {
      toast.error("Couldn't load past doubts");
    } finally {
      setLoadingPast(false);
    }
  }

  function clearSession() {
    setHistory((h) => h.filter((d) => d._past)); // keep past if shown, drop current session
  }

  async function ask(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (question.trim().length < 5) {
      toast.error("Ask a more specific question");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          subject: subject || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Couldn't reach the AI");

      const newDoubt: Doubt = {
        id: data.id,
        question: question.trim(),
        answer: data.answer,
        subject: subject || undefined,
        createdAt: new Date().toISOString(),
      };
      setHistory((h) => [newDoubt, ...h]);
      setQuestion("");
      setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* INPUT */}
      <form onSubmit={ask} className="card-glass">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-neon-pink" />
          <span className="font-display text-base font-bold">Ask your doubt</span>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) ask();
          }}
          placeholder="Type your doubt here. Ctrl+Enter to send. e.g. 'Why does the projectile follow a parabolic path?'"
          rows={3}
          className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {subjects.length > 0 && (
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-9 rounded-xl border border-white/[0.08] bg-bg-2 px-3 text-xs"
            >
              <option value="">Any subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {s.name}
                </option>
              ))}
            </select>
          )}
          <button
            type="submit"
            disabled={loading || question.trim().length < 5}
            className="btn-neon ml-auto text-sm"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Ask
          </button>
        </div>

        {history.length === 0 && !loading && (
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <div className="mb-2 text-[10px] uppercase tracking-widest text-white/45">
              Try one of these:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setQuestion(p)}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/65 hover:border-white/[0.18] hover:text-white"
                >
                  {p.length > 50 ? p.slice(0, 47) + "…" : p}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* LATEST ANSWER (anchor for scroll) */}
      {loading && (
        <div className="card-glass !p-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-3 text-5xl"
          >
            🧠
          </motion.div>
          <div className="font-display text-base font-bold">Thinking…</div>
          <p className="mt-1 text-xs text-white/55">Usually under 10 seconds</p>
        </div>
      )}

      {/* HISTORY */}
      <div ref={answerRef} className="space-y-3">
        {history.map((d, i) => (
          <DoubtCard key={d.id} doubt={d} isLatest={i === 0 && !loading && !d._past} />
        ))}
      </div>

      {/* SESSION CONTROLS */}
      {(history.some((d) => !d._past) || !showingPast) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          {history.some((d) => !d._past) && (
            <button
              type="button"
              onClick={clearSession}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-white/65 transition-all hover:border-white/[0.18] hover:text-white"
            >
              <Trash2 className="h-3 w-3" /> Clear this session
            </button>
          )}
          <button
            type="button"
            onClick={loadPastDoubts}
            disabled={loadingPast}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-white/65 transition-all hover:border-white/[0.18] hover:text-white"
          >
            {loadingPast ? <Loader2 className="h-3 w-3 animate-spin" /> : <History className="h-3 w-3" />}
            {showingPast ? "Hide previous doubts" : "View previous doubts"}
          </button>
        </div>
      )}
    </div>
  );
}

function DoubtCard({ doubt, isLatest }: { doubt: Doubt; isLatest: boolean }) {
  const [feedback, setFeedback] = useState<boolean | null>(doubt.helpful ?? null);

  function rate(helpful: boolean) {
    if (feedback === helpful) return;
    setFeedback(helpful);
    // Fire-and-forget — no UI cost on error
    fetch(`/api/ai/doubt/${doubt.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ helpful }),
    }).catch(() => {});
  }

  return (
    <AnimatePresence>
      <motion.article
        initial={isLatest ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "card-glass",
          isLatest && "border-neon-cyan/30 shadow-glow-cyan",
          doubt._past && "opacity-75"
        )}
      >
        {doubt._past && (
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/45">
            <History className="h-2.5 w-2.5" /> Previous
          </div>
        )}
        {/* Question */}
        <div className="mb-3 flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-sm font-bold">
            Q
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold leading-snug text-white">
              <Latex>{doubt.question}</Latex>
            </div>
            {doubt.subject && (
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/45">
                {doubt.subject}
                {doubt.chapter ? ` · ${doubt.chapter}` : ""}
              </div>
            )}
          </div>
        </div>

        {/* Answer */}
        <div className="rounded-2xl border border-neon-cyan/15 bg-neon-cyan/5 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neon-cyan">
            <Sparkles className="h-3 w-3" /> AI explanation
          </div>
          <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-white/85">
            <Latex>{doubt.answer}</Latex>
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
          <span>Did this help?</span>
          <div className="flex gap-1">
            <button
              onClick={() => rate(true)}
              className={cn(
                "rounded-lg border px-2 py-1 transition-all",
                feedback === true
                  ? "border-neon-green/50 bg-neon-green/15 text-neon-green"
                  : "border-white/[0.08] hover:border-white/[0.18] hover:text-white"
              )}
              aria-label="Helpful"
            >
              <ThumbsUp className="h-3 w-3" />
            </button>
            <button
              onClick={() => rate(false)}
              className={cn(
                "rounded-lg border px-2 py-1 transition-all",
                feedback === false
                  ? "border-neon-pink/50 bg-neon-pink/15 text-neon-pink"
                  : "border-white/[0.08] hover:border-white/[0.18] hover:text-white"
              )}
              aria-label="Not helpful"
            >
              <ThumbsDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
