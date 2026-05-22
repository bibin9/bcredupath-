import Link from "next/link";
import { Brain, ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

/**
 * "Ask AI" feature is paused. The route is kept (instead of 404) so any
 * existing in-app links / bookmarks render gracefully.
 */
export default function DoubtDisabledPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
      </Link>

      <section className="card-glass !p-10 text-center">
        <Brain className="mx-auto mb-3 h-10 w-10 text-neon-cyan" />
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          Ask AI is on pause
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/65">
          We&apos;ve temporarily disabled the AI-powered doubt resolver while
          we rework the model setup. Your question bank, predictor, careers,
          colleges, scholarships and practice modes are all unaffected.
        </p>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <Link
            href="/dashboard/bank"
            className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/8 p-3 text-sm font-semibold transition-all hover:border-neon-cyan/60"
          >
            📚 Question Bank
          </Link>
          <Link
            href="/dashboard/predictor"
            className="rounded-2xl border border-neon-pink/30 bg-neon-pink/8 p-3 text-sm font-semibold transition-all hover:border-neon-pink/60"
          >
            🔮 Predictor
          </Link>
          <Link
            href="/dashboard/practice"
            className="rounded-2xl border border-neon-yellow/30 bg-neon-yellow/8 p-3 text-sm font-semibold transition-all hover:border-neon-yellow/60"
          >
            🎯 Practice
          </Link>
        </div>

        <p className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] text-white/55">
          <Sparkles className="h-3 w-3 text-neon-yellow" />
          Most other features still work great
        </p>
      </section>
    </div>
  );
}
