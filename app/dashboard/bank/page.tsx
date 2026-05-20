import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { resolveSubjectFilter } from "@/lib/chapter-mapping";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiDisclaimer } from "@/components/shared/AiDisclaimer";

export const dynamic = "force-dynamic";

const ringMap: Record<string, string> = {
  "neon-cyan": "hover:border-neon-cyan/50 hover:shadow-glow-cyan",
  "neon-pink": "hover:border-neon-pink/50 hover:shadow-glow-pink",
  "neon-green": "hover:border-neon-green/50 hover:shadow-glow-green",
  "neon-yellow": "hover:border-neon-yellow/50 hover:shadow-glow-yellow",
  "neon-purple": "hover:border-neon-purple/50 hover:shadow-glow-purple",
};

export default async function BankIndex() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const subjects =
    user.class === 10
      ? SUBJECTS_BY_CLASS[10].all ?? []
      : (user.stream && SUBJECTS_BY_CLASS[12][user.stream]) ?? [];

  // For each subject (including virtual sub-subjects like physics/biology
  // that map to chapters of the combined science paper), count questions.
  const statsPairs = await Promise.all(
    subjects.map(async (s) => {
      const filter = resolveSubjectFilter(s.id, (user.class ?? 10) as 10 | 12);
      const match: Record<string, unknown> = { class: user.class, ...filter };
      const docs = await Question.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            topProb: { $max: "$predictedProbability" },
            hot: { $sum: { $cond: [{ $gte: ["$predictedProbability", 0.7] }, 1, 0] } },
          },
        },
      ]);
      const d = docs[0];
      return [s.id, d ? { total: d.total, topProb: d.topProb ?? 0, hot: d.hot ?? 0 } : null] as const;
    })
  );
  const byId = new Map<string, { total: number; topProb: number; hot: number }>();
  for (const [id, stats] of statsPairs) if (stats) byId.set(id, stats);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> Class {user.class} · CBSE
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Question Bank 📚
          </h1>
          <p className="mt-1 text-sm text-white/65">
            PYQs, sample papers and NCERT exercises. Sorted by predicted probability.
          </p>
        </div>
        <div className="card-glass !p-3 text-right text-xs text-white/65">
          <div className="font-display text-2xl font-bold text-neon-cyan">
            {await Question.countDocuments({ class: user.class })}
          </div>
          <div>questions indexed</div>
        </div>
      </header>

      <AiDisclaimer />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => {
          const stats = byId.get(s.id);
          const enabled = !!stats?.total;
          return (
            <Link
              key={s.id}
              href={enabled ? `/dashboard/bank/${s.id}` : "#"}
              aria-disabled={!enabled}
              className={cn(
                "group relative block overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all",
                enabled
                  ? `${ringMap[s.color]} hover:-translate-y-0.5 hover:bg-white/[0.06]`
                  : "cursor-not-allowed opacity-60"
              )}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                  {s.emoji}
                </div>
                {stats?.hot ? (
                  <span className="pill-neon-pink">🔥 {stats.hot} hot</span>
                ) : null}
              </div>
              <div className="font-display text-xl font-bold">{s.name}</div>
              <div className="mt-1 text-xs text-white/55">
                {enabled
                  ? `${stats!.total} questions · top match ${Math.round(stats!.topProb * 100)}%`
                  : "Coming soon"}
              </div>

              {enabled && (
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neon-cyan">
                  Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {byId.size === 0 && (
        <div className="card-glass text-center text-sm text-white/65">
          No questions seeded yet. Run{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-neon-cyan">npm run seed</code>{" "}
          to load the starter set.
        </div>
      )}
    </div>
  );
}
