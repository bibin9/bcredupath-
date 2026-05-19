import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { GenerateForm } from "@/components/practice/GenerateForm";
import { Sparkles, Wand2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GeneratePage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;
  const classNum = (user.class ?? 10) as 10 | 12;

  // User's eligible subjects
  const userSubjects =
    classNum === 10
      ? SUBJECTS_BY_CLASS[10].all ?? []
      : (user.stream && SUBJECTS_BY_CLASS[12][user.stream]) ?? [];

  // Filter to subjects that have at least one seeded question (so chapters are pickable)
  const availableSubjects = await Question.distinct("subject", { class: classNum });
  const subjects = userSubjects
    .filter((s) => availableSubjects.includes(s.id))
    .map((s) => ({ id: s.id, name: s.name, emoji: s.emoji }));

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-4xl border border-neon-pink/25 bg-gradient-to-br from-neon-pink/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-pink/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-neon-purple/20 blur-3xl" />

        <div className="relative">
          <span className="pill-neon-pink">
            <Sparkles className="h-3 w-3" /> On-demand AI generator
          </span>
          <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-bold leading-tight md:text-5xl">
            <Wand2 className="hidden h-10 w-10 text-neon-pink md:inline" />
            Generate <span className="grad-text">your own set</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/65 md:text-base">
            Pick a subject, chapter, and (optionally) a topic. Choose 10–25 questions
            in <b className="text-white">board pattern</b> or{" "}
            <b className="text-white">competitive (JEE/NEET) pattern</b>. Solve instantly with full solutions.
          </p>
        </div>
      </header>

      {subjects.length === 0 ? (
        <div className="card-glass text-center text-sm text-white/65">
          No subjects with questions yet. Run{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-neon-cyan">npm run seed</code>{" "}
          first, then come back here.
        </div>
      ) : (
        <GenerateForm subjects={subjects} classNum={classNum} />
      )}
    </div>
  );
}
