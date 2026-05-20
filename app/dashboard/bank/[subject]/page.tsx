import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { resolveSubjectFilter } from "@/lib/chapter-mapping";
import { Filters } from "@/components/questions/Filters";
import { QuestionCard, type QuestionDoc } from "@/components/questions/QuestionCard";
import { AiDisclaimer } from "@/components/shared/AiDisclaimer";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type Params = { subject: string };
type Search = {
  chapter?: string;
  type?: string;
  difficulty?: string;
  marks?: string;
  year?: string;
};

export default async function SubjectBankPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const allSubjects = [
    ...(SUBJECTS_BY_CLASS[10].all ?? []),
    ...(SUBJECTS_BY_CLASS[12].pcm ?? []),
    ...(SUBJECTS_BY_CLASS[12].pcb ?? []),
    ...(SUBJECTS_BY_CLASS[12].commerce ?? []),
    ...(SUBJECTS_BY_CLASS[12].humanities ?? []),
  ];
  const subject = allSubjects.find((s) => s.id === params.subject);
  if (!subject) notFound();

  const cls = (user.class ?? 10) as 10 | 12;
  const resolved = resolveSubjectFilter(params.subject, cls);
  const filter: Record<string, unknown> = { class: cls, subject: resolved.subject };
  if (searchParams.chapter) {
    filter.chapter = searchParams.chapter; // explicit chapter from filter UI wins
  } else if (resolved.chapter) {
    filter.chapter = resolved.chapter; // strand-restricted (Physics → physics chapters)
  }
  if (searchParams.type) filter.type = searchParams.type;
  if (searchParams.difficulty) filter.difficulty = searchParams.difficulty;
  if (searchParams.marks) filter.marks = Number(searchParams.marks);
  if (searchParams.year) filter.yearsAsked = Number(searchParams.year);

  // Chapters listing — restrict to the strand if user opened a sub-subject
  const chapterMatch: Record<string, unknown> = { class: cls, subject: resolved.subject };
  if (resolved.chapter) chapterMatch.chapter = resolved.chapter;
  const [questionsRaw, chaptersRaw, total] = await Promise.all([
    Question.find(filter)
      .sort({ predictedProbability: -1, createdAt: -1 })
      .limit(50)
      .lean(),
    Question.aggregate([
      { $match: chapterMatch },
      {
        $group: {
          _id: "$chapter",
          count: { $sum: 1 },
          avgProb: { $avg: "$predictedProbability" },
        },
      },
      { $sort: { avgProb: -1 } },
    ]),
    Question.countDocuments(filter),
  ]);

  const questions: QuestionDoc[] = questionsRaw.map((q) => ({
    _id: String(q._id),
    subject: q.subject,
    chapter: q.chapter,
    topic: q.topic,
    type: q.type,
    marks: q.marks,
    difficulty: q.difficulty,
    question: q.question,
    options: q.options,
    answer: q.answer,
    solution: q.solution,
    yearsAsked: q.yearsAsked,
    examType: q.examType,
    predictedProbability: q.predictedProbability,
    xpReward: q.xpReward,
    expectedTime: q.expectedTime,
    verified: q.verified ?? false,
  }));

  const bookmarks = new Set(user.bookmarks.map((id) => String(id)));

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/bank"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All subjects
      </Link>

      <header className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl">
              {subject.emoji}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {subject.name}
              </h1>
              <p className="text-xs text-white/55">Class {cls} · CBSE</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="stat-num text-2xl text-neon-cyan">{total}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/45">
            {Object.keys(searchParams).length > 0 ? "filtered" : "total"}
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="card-glass h-fit lg:sticky lg:top-24">
          <h2 className="mb-3 font-display text-lg font-bold">Filters</h2>
          <Filters chapters={chaptersRaw as { _id: string; count: number; avgProb: number }[]} />
        </aside>

        <div className="space-y-3 min-w-0">
          <AiDisclaimer compact />
          {questions.length === 0 ? (
            <div className="card-glass text-center text-sm text-white/65">
              No questions match these filters. Try clearing some.
            </div>
          ) : (
            questions.map((q, i) => (
              <QuestionCard
                key={q._id}
                q={q}
                index={i}
                isBookmarked={bookmarks.has(q._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
