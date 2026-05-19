import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { QuestionCard, type QuestionDoc } from "@/components/questions/QuestionCard";
import { Bookmark, Sparkles, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const bookmarkIds = user.bookmarks ?? [];

  if (bookmarkIds.length === 0) {
    return (
      <div className="space-y-6">
        <header>
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> Your saved questions
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Bookmarks 🔖
          </h1>
          <p className="mt-1 text-sm text-white/65">
            Tap the bookmark icon on any question to save it here for revision.
          </p>
        </header>

        <div className="card-glass !p-10 text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-grad-pink-purple text-5xl shadow-glow-pink animate-float">
            🔖
          </div>
          <h2 className="font-display text-xl font-bold">No bookmarks yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/65">
            When you're solving questions in the bank, tap the bookmark icon (top-right of each card) to save tricky ones. They'll show up here for quick revision.
          </p>
          <Link href="/dashboard/bank" className="btn-neon mt-5 inline-flex text-sm">
            Browse Question Bank <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const raw = await Question.find({ _id: { $in: bookmarkIds } })
    .sort({ predictedProbability: -1 })
    .lean();

  const questions: QuestionDoc[] = raw.map((q) => ({
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
  }));

  // Group by subject for the stats strip
  const bySubject = new Map<string, number>();
  questions.forEach((q) => {
    bySubject.set(q.subject, (bySubject.get(q.subject) ?? 0) + 1);
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="pill-neon-yellow">
            <Bookmark className="h-3 w-3" /> {questions.length} saved
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Bookmarks 🔖
          </h1>
          <p className="mt-1 text-sm text-white/65">
            Your saved questions, sorted by predicted probability.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {Array.from(bySubject.entries()).map(([s, n]) => (
            <span key={s} className="pill">
              {s}: <b className="ml-1 text-white">{n}</b>
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionCard key={q._id} q={q} index={i} isBookmarked={true} />
        ))}
      </div>
    </div>
  );
}
