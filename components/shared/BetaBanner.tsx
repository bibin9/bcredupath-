"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, MessageCircle } from "lucide-react";

const DISMISS_KEY = "bcr-beta-banner-dismissed-v1";

/**
 * Small dismissible banner across the top of every dashboard page.
 * Dismissed state persists in localStorage so a returning user doesn't
 * see it again. Bump the v in DISMISS_KEY to force a re-show after a
 * major beta milestone.
 */
export function BetaBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY) === "1";
      setShow(!dismissed);
    } catch {
      setShow(true);
    }
  }, []);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode / quota — fine, banner just won't persist */
    }
  }

  if (!show) return null;

  return (
    <div className="mb-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-neon-yellow/25 bg-gradient-to-r from-neon-yellow/10 via-neon-pink/5 to-neon-purple/10 px-4 py-2.5 text-xs">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-neon-yellow/20 text-neon-yellow">
        <Sparkles className="h-3.5 w-3.5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-bold text-white">Beta v1</span>
          <span className="text-white/70">
            Question bank growing daily · CBSE-official + AI practice
          </span>
        </div>
        <div className="text-[10px] text-white/55">
          Spotted a gap or wrong answer? Tell us — every report helps the next
          student.
        </div>
      </div>

      <Link
        href="/dashboard/doubt"
        className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-neon-yellow/30 bg-neon-yellow/10 px-2.5 py-1 text-[11px] font-semibold text-neon-yellow transition-all hover:border-neon-yellow/60 hover:bg-neon-yellow/20"
      >
        <MessageCircle className="h-3 w-3" />
        Report
      </Link>

      <button
        onClick={dismiss}
        aria-label="Dismiss beta banner"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/55 transition-all hover:border-white/[0.18] hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
