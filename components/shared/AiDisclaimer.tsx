"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

const KEY = "bcr_ai_disclaimer_dismissed";

/**
 * Subtle banner shown on pages that surface AI-generated questions.
 * One-time dismiss persisted to localStorage.
 */
export function AiDisclaimer({ compact = false }: { compact?: boolean }) {
  const [hidden, setHidden] = useState(true); // hidden until we check localStorage

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(KEY);
    setHidden(!!dismissed);
  }, []);

  if (hidden) return null;

  function dismiss() {
    setHidden(true);
    if (typeof window !== "undefined") localStorage.setItem(KEY, String(Date.now()));
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-neon-yellow/25 bg-neon-yellow/8 px-3 py-2 text-[11px] text-white/80">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-neon-yellow" />
        <span className="flex-1">
          Some questions are AI-supplemented — always cross-check answers with your NCERT textbook.
        </span>
        <button onClick={dismiss} aria-label="Dismiss" className="text-white/45 hover:text-white">
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="card-glass !border-neon-yellow/25 !bg-neon-yellow/8 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon-yellow/15 text-neon-yellow">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <div className="font-semibold">A note on accuracy</div>
        <p className="mt-0.5 text-xs text-white/70">
          Questions tagged with years are sourced from past papers. Some are AI-supplemented
          to expand coverage — they follow CBSE patterns but always{" "}
          <b className="text-white">cross-check answers against your NCERT textbook</b>{" "}
          before relying on them for exams.
        </p>
      </div>
      <button onClick={dismiss} aria-label="Dismiss" className="shrink-0 text-white/45 hover:text-white">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
