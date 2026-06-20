import Link from "next/link";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";
import { MockPaper } from "@/models/MockPaper";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { PaperGrid } from "@/components/mock-test/PaperGrid";
import { ArrowLeft, FileText, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MockTestSubjectPage({
  params,
}: {
  params: { subject: string };
}) {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;
  const cls = (user.class ?? 10) as 10 | 12;

  const allSubjects = [
    ...(SUBJECTS_BY_CLASS[10].all ?? []),
    ...(SUBJECTS_BY_CLASS[12].pcm ?? []),
    ...(SUBJECTS_BY_CLASS[12].pcb ?? []),
    ...(SUBJECTS_BY_CLASS[12].commerce ?? []),
    ...(SUBJECTS_BY_CLASS[12].humanities ?? []),
  ];
  const subjectMeta = allSubjects.find((s) => s.id === params.subject);

  const papers = await MockPaper.find({ subject: params.subject, class: cls })
    .sort({ paperNumber: 1 })
    .select("paperNumber title totalMarks durationMinutes sections")
    .lean();

  // Attempt tally per paper from practiceHistory
  const attempts = (user.practiceHistory ?? []).filter((h) =>
    h.mode?.startsWith?.(`mock-paper:${params.subject}:`)
  );
  const attemptByPaper: Record<number, { count: number; bestScore?: number }> = {};
  for (const h of attempts) {
    const m = h.mode?.match(/^mock-paper:[^:]+:(\d+)$/);
    if (!m) continue;
    const pn = Number(m[1]);
    const cur = attemptByPaper[pn] ?? { count: 0 };
    cur.count++;
    if (h.score !== undefined && (cur.bestScore === undefined || h.score > cur.bestScore)) {
      cur.bestScore = h.score;
    }
    attemptByPaper[pn] = cur;
  }

  const items = papers.map((p) => ({
    id: String(p._id),
    paperNumber: p.paperNumber,
    title: p.title,
    totalMarks: p.totalMarks,
    durationMinutes: p.durationMinutes,
    questionCount: p.sections.reduce((s, sec) => s + sec.questionIds.length, 0),
    attempts: attemptByPaper[p.paperNumber]?.count ?? 0,
    bestScore: attemptByPaper[p.paperNumber]?.bestScore,
  }));

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/mock-test"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Other subjects
      </Link>

      <header className="relative overflow-hidden rounded-4xl border border-neon-yellow/25 bg-gradient-to-br from-neon-yellow/15 via-bg-2 to-neon-pink/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-yellow/20 blur-3xl" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="pill-neon-yellow">
              <FileText className="h-3 w-3" /> {items.length} sample papers
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
              {subjectMeta?.emoji ?? "📝"} {subjectMeta?.name ?? params.subject}
            </h1>
            <p className="mt-1 text-sm text-white/65 md:text-base">
              Each paper is a full <b className="text-white">3-hour, 80-mark</b> CBSE-style
              Sample Question Paper. Same questions every visit — track scores across attempts.
            </p>
          </div>
          <div className="flex flex-col items-end text-xs text-white/55">
            <span><Clock className="mr-1 inline h-3 w-3" /> 3 hours each</span>
            <span>80 marks · ~38 questions</span>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="card-glass text-center text-sm text-white/65">
          No papers generated yet for this subject. Try another subject or run{" "}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-neon-cyan">
            npm run gen:papers
          </code>{" "}
          to populate.
        </div>
      ) : (
        <PaperGrid papers={items} />
      )}
    </div>
  );
}
