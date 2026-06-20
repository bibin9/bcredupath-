"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Send, Bug, AlertTriangle, Lightbulb, BookOpen, Heart, MessageSquare, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "wrong-answer", label: "Wrong answer", icon: AlertTriangle, tint: "pink" },
  { id: "bug", label: "Bug / glitch", icon: Bug, tint: "yellow" },
  { id: "feature-request", label: "Feature idea", icon: Lightbulb, tint: "cyan" },
  { id: "content-gap", label: "Missing content", icon: BookOpen, tint: "purple" },
  { id: "praise", label: "Praise 💚", icon: Heart, tint: "green" },
  { id: "other", label: "Something else", icon: MessageSquare, tint: "white" },
] as const;

type Category = (typeof CATEGORIES)[number]["id"];

type PriorFeedback = {
  id: string;
  category: Category;
  subject: string;
  status: string;
  adminReply?: string;
  createdAt: string;
};

export function FeedbackForm() {
  const [category, setCategory] = useState<Category>("wrong-answer");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prior, setPrior] = useState<PriorFeedback[]>([]);
  const [loadingPrior, setLoadingPrior] = useState(true);
  const [context, setContext] = useState<string>("");

  // Capture context (referrer / current path) on mount
  useEffect(() => {
    const ref = document.referrer;
    setContext(ref && !ref.includes(window.location.host) ? "" : ref);
  }, []);

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((d) => setPrior(d.items ?? []))
      .catch(() => {})
      .finally(() => setLoadingPrior(false));
  }, [submitted]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (subject.trim().length < 3) {
      toast.error("Add a short subject line");
      return;
    }
    if (message.trim().length < 10) {
      toast.error("Tell us a bit more (at least 10 characters)");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, subject, message, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not submit");
      toast.success("Thanks! Bibin will read this.");
      setSubmitted(true);
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  const remainingChars = 5000 - message.length;

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="card-glass space-y-4">
        {/* Category picker */}
        <div>
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
            What kind of feedback?
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const active = category === c.id;
              const tintRing: Record<string, string> = {
                pink: "border-neon-pink/60 bg-neon-pink/15 text-neon-pink",
                yellow: "border-neon-yellow/60 bg-neon-yellow/15 text-neon-yellow",
                cyan: "border-neon-cyan/60 bg-neon-cyan/15 text-neon-cyan",
                purple: "border-neon-purple/60 bg-neon-purple/15 text-neon-purple",
                green: "border-neon-green/60 bg-neon-green/15 text-neon-green",
                white: "border-white/40 bg-white/[0.08] text-white",
              };
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border p-2.5 text-left text-xs transition-all",
                    active
                      ? tintRing[c.tint]
                      : "border-white/[0.08] bg-white/[0.03] text-white/65 hover:border-white/[0.18]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate font-semibold">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/45">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={200}
            placeholder={
              category === "wrong-answer"
                ? "e.g. Polynomial Q3 — wrong option marked correct"
                : category === "bug"
                  ? "e.g. Mock test timer resets when I scroll"
                  : "Short summary (5-10 words)"
            }
            className="h-11 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />
        </div>

        {/* Message */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/45">
            Details
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={5000}
            rows={6}
            placeholder={
              category === "wrong-answer"
                ? "Which subject + chapter? What did the question ask? Why is the marked answer wrong?"
                : category === "feature-request"
                  ? "What should we build? Why? How would you use it?"
                  : "Take your time. The more specific, the more we can do about it."
            }
            className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-sm leading-relaxed outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />
          <div className="mt-1 text-right text-[10px] text-white/45">
            {remainingChars} characters left
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-neon w-full text-sm"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send feedback
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-neon-green/30 bg-neon-green/10 p-3 text-xs"
          >
            <div className="flex items-center gap-1.5 font-bold text-neon-green">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved. Bibin will read it.
            </div>
            <p className="mt-0.5 text-white/70">
              You can send another one or close this tab. No reply by default —
              if your report fixes a question, you&apos;ll see it disappear from
              the bank within 48h.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prior feedback */}
      {prior.length > 0 && (
        <section className="card-glass !p-3">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
            Your recent feedback
          </div>
          <ul className="space-y-1.5">
            {prior.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs"
              >
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] capitalize text-white/65">
                  {f.category.replace("-", " ")}
                </span>
                <span className="truncate flex-1 text-white/85">{f.subject}</span>
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-widest",
                    f.status === "resolved"
                      ? "text-neon-green"
                      : f.status === "wontfix"
                        ? "text-white/40"
                        : f.status === "triaged"
                          ? "text-neon-yellow"
                          : "text-white/55"
                  )}
                >
                  {f.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {loadingPrior && (
        <div className="text-center text-[10px] text-white/45">Loading your history…</div>
      )}
    </div>
  );
}
