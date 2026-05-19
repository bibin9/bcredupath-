import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { Sparkles, Calculator } from "lucide-react";
import { TopPredicted, type TopQ } from "@/components/predictor/TopPredicted";
import { HeatMap, type HeatRow } from "@/components/predictor/HeatMap";
import { SleeperAlert, type SleeperQuestion } from "@/components/predictor/SleeperAlert";

export const dynamic = "force-dynamic";

const CURRENT_YEAR = 2026;

export default async function PredictorPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;
  const cls = user.class ?? 10;

  const [top, heatmap, sleepersRaw] = await Promise.all([
    Question.find({ class: cls })
      .sort({ predictedProbability: -1 })
      .limit(10)
      .lean(),
    Question.aggregate([
      { $match: { class: cls } },
      {
        $group: {
          _id: { subject: "$subject", chapter: "$chapter" },
          count: { $sum: 1 },
          avgProb: { $avg: "$predictedProbability" },
          maxProb: { $max: "$predictedProbability" },
          hot: { $sum: { $cond: [{ $gte: ["$predictedProbability", 0.7] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          subject: "$_id.subject",
          chapter: "$_id.chapter",
          count: 1,
          avgProb: 1,
          maxProb: 1,
          hot: 1,
        },
      },
      { $sort: { avgProb: -1 } },
    ]),
    Question.find({ class: cls, frequencyScore: { $gte: 7 } }).lean(),
  ]);

  const sleepers: SleeperQuestion[] = sleepersRaw
    .filter((q) => {
      const last = q.yearsAsked?.length ? Math.max(...q.yearsAsked) : CURRENT_YEAR - 10;
      return CURRENT_YEAR - last >= 3;
    })
    .sort((a, b) => b.predictedProbability - a.predictedProbability)
    .slice(0, 5)
    .map((q) => ({
      _id: String(q._id),
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic,
      question: q.question,
      yearsAsked: q.yearsAsked,
      frequencyScore: q.frequencyScore,
      predictedProbability: q.predictedProbability,
    }));

  const topItems: TopQ[] = top.map((q) => ({
    _id: String(q._id),
    subject: q.subject,
    chapter: q.chapter,
    topic: q.topic,
    question: q.question,
    type: q.type,
    marks: q.marks,
    predictedProbability: q.predictedProbability,
  }));

  const heatRows: HeatRow[] = (heatmap as HeatRow[]).slice(0, 20);

  // "If I study top 20, expected score" — sum of marks
  const top20Score = await Question.aggregate([
    { $match: { class: cls } },
    { $sort: { predictedProbability: -1 } },
    { $limit: 20 },
    { $group: { _id: null, marks: { $sum: "$marks" } } },
  ]);
  const expectedMarks = (top20Score[0]?.marks as number | undefined) ?? 0;

  const totalQs = await Question.countDocuments({ class: cls });
  const hotCount = heatRows.reduce((sum, r) => sum + r.hot, 0);

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-4xl border border-neon-purple/25 bg-gradient-to-br from-neon-purple/15 via-bg-2 to-neon-pink/10 p-6 md:p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon-purple/25 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-neon-pink/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <span className="pill-neon-pink">
              <Sparkles className="h-3 w-3" /> AI Predictor
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
              What's actually <span className="grad-text">coming</span> 🔮
            </h1>
            <p className="mt-2 text-sm text-white/65 md:text-base">
              {totalQs} questions analysed across {heatRows.length} chapters using
              frequency, recency, topic weight and sleeper signals.
            </p>
          </div>

          {/* "If I study top 20" calculator */}
          <div className="glass-strong w-full max-w-sm rounded-3xl p-4 md:w-auto">
            <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-yellow">
              <Calculator className="h-3 w-3" /> If I study Top 20
            </div>
            <div className="flex items-baseline gap-2">
              <span className="stat-num text-4xl text-neon-yellow">
                ~{expectedMarks}
              </span>
              <span className="text-sm text-white/65">expected marks</span>
            </div>
            <Link
              href="/dashboard/practice/hot-20"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-grad-yellow-pink px-3 py-2 text-xs font-bold text-bg"
            >
              Start Hot 20 Sprint ⚡
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile emoji="🔥" label="Hot picks (≥70%)" value={hotCount} tone="pink" />
        <StatTile emoji="😴" label="Sleeper alerts" value={sleepers.length} tone="yellow" />
        <StatTile emoji="📚" label="Chapters tracked" value={heatRows.length} tone="cyan" />
        <StatTile emoji="📝" label="Questions analysed" value={totalQs} tone="green" />
      </section>

      {/* MAIN GRID */}
      <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <TopPredicted items={topItems} />
        <div className="space-y-5">
          <SleeperAlert items={sleepers} />
          <HeatMap rows={heatRows} />
        </div>
      </section>
    </div>
  );
}

function StatTile({
  emoji,
  label,
  value,
  tone,
}: {
  emoji: string;
  label: string;
  value: number | string;
  tone: "pink" | "yellow" | "cyan" | "green";
}) {
  const ring = {
    pink: "border-neon-pink/25 hover:shadow-glow-pink",
    yellow: "border-neon-yellow/25 hover:shadow-glow-yellow",
    cyan: "border-neon-cyan/25 hover:shadow-glow-cyan",
    green: "border-neon-green/25 hover:shadow-glow-green",
  }[tone];
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border bg-white/[0.03] p-3.5 transition-shadow ${ring}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl">
        {emoji}
      </div>
      <div className="min-w-0">
        <div className="stat-num text-xl">{value}</div>
        <div className="text-[11px] uppercase tracking-wider text-white/55">
          {label}
        </div>
      </div>
    </div>
  );
}
