import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { PRACTICE_MODES, isPracticeMode } from "@/lib/practice-modes";
import { resolveSubjectFilter } from "@/lib/chapter-mapping";

export const dynamic = "force-dynamic";

/**
 * GET /api/practice/start?mode=hot-20&subject=
 *
 * Returns the question set for a given practice mode.
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") ?? "";
  if (!isPracticeMode(mode)) {
    return NextResponse.json({ error: "Unknown mode" }, { status: 400 });
  }

  const subjectFilter = searchParams.get("subject");
  await connectDB();

  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const cls = (user.class ?? 10) as 10 | 12;

  const base: Record<string, unknown> = { class: cls };
  if (subjectFilter) {
    const resolved = resolveSubjectFilter(subjectFilter, cls);
    base.subject = resolved.subject;
    if (resolved.chapter) base.chapter = resolved.chapter;
  }

  const config = PRACTICE_MODES[mode];
  let questions;

  switch (mode) {
    case "hot-20":
      questions = await Question.find(base)
        .sort({ predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
      break;

    case "rapid-fire":
      questions = await Question.find({ ...base, type: "MCQ" })
        .sort({ predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
      break;

    case "pyq-marathon":
      questions = await Question.find({
        ...base,
        examType: "Board",
        "yearsAsked.0": { $exists: true },
      })
        .sort({ "yearsAsked.0": -1, predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
      break;

    case "random":
      questions = await Question.aggregate([
        { $match: base },
        { $sample: { size: config.questionCount } },
      ]);
      break;

    case "weakness-hunter": {
      // Find chapters where user got wrong > right (fall back to random low-prob if no history)
      const history = user.practiceHistory ?? [];
      // Simplified: if user has any history, just pick from low-confidence chapters
      // (in production: track per-question correctness)
      if (history.length === 0) {
        questions = await Question.aggregate([
          { $match: { ...base, difficulty: { $in: ["Hard", "VeryHard"] } } },
          { $sample: { size: config.questionCount } },
        ]);
      } else {
        questions = await Question.find({
          ...base,
          difficulty: { $in: ["Medium", "Hard"] },
        })
          .sort({ predictedProbability: -1 })
          .limit(config.questionCount)
          .lean();
      }
      break;
    }

    case "predicted-paper":
      questions = await Question.find(base)
        .sort({ predictedProbability: -1 })
        .limit(config.questionCount)
        .lean();
      break;
  }

  return NextResponse.json({
    mode: config,
    questions: (questions ?? []).map((q) => ({
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
    })),
  });
}
