import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { DailyChallenge } from "@/models/DailyChallenge";
import { PRACTICE_MODES, isPracticeMode } from "@/lib/practice-modes";
import { PracticeRunner, type PracticeQuestion } from "@/components/practice/PracticeRunner";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PracticeModePage({ params }: { params: { mode: string } }) {
  if (!isPracticeMode(params.mode)) notFound();
  const config = PRACTICE_MODES[params.mode];

  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;
  const cls = user.class ?? 10;

  const base: Record<string, unknown> = { class: cls };

  let raw;
  switch (params.mode) {
    case "daily-challenge": {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const challenge = await DailyChallenge.findOne({ date: today }).lean();
      if (!challenge || challenge.questionIds.length === 0) {
        raw = await Question.find(base)
          .sort({ predictedProbability: -1 })
          .limit(config.questionCount)
          .lean();
      } else {
        raw = await Question.find({ _id: { $in: challenge.questionIds } }).lean();
        // Preserve the deterministic shuffled order from the challenge
        const idx = new Map(challenge.questionIds.map((id, i) => [String(id), i]));
        raw.sort((a, b) => (idx.get(String(a._id)) ?? 0) - (idx.get(String(b._id)) ?? 0));
      }
      break;
    }
    case "rapid-fire":
      raw = await Question.find({ ...base, type: "MCQ" })
        .sort({ predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
      break;
    case "pyq-marathon":
      raw = await Question.find({
        ...base,
        examType: "Board",
        "yearsAsked.0": { $exists: true },
      })
        .sort({ predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
      break;
    case "random":
      raw = await Question.aggregate([
        { $match: base },
        { $sample: { size: config.questionCount } },
      ]);
      break;
    case "weakness-hunter":
      raw = await Question.aggregate([
        { $match: { ...base, difficulty: { $in: ["Hard", "VeryHard"] } } },
        { $sample: { size: config.questionCount } },
      ]);
      break;
    default:
      raw = await Question.find(base)
        .sort({ predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
  }

  const questions: PracticeQuestion[] = raw.map((q) => ({
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
    predictedProbability: q.predictedProbability,
    xpReward: q.xpReward,
    expectedTime: q.expectedTime,
  }));

  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/practice"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All modes
      </Link>

      <PracticeRunner
        mode={{
          id: config.id,
          name: config.name,
          emoji: config.emoji,
          perQuestionSeconds: config.perQuestionSeconds ?? null,
          sessionSeconds: "sessionSeconds" in config ? config.sessionSeconds : null,
          locked: "locked" in config ? config.locked : false,
        }}
        questions={questions}
      />
    </div>
  );
}
