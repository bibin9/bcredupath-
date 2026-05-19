import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { DoubtForm } from "@/components/doubt/DoubtForm";
import { Brain, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DoubtPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;
  const cls = (user.class ?? 10) as 10 | 12;

  const subjects =
    cls === 10
      ? SUBJECTS_BY_CLASS[10].all ?? []
      : (user.stream && SUBJECTS_BY_CLASS[12][user.stream]) ?? [];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-4xl border border-neon-cyan/25 bg-gradient-to-br from-neon-cyan/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-neon-purple/20 blur-3xl" />

        <div className="relative">
          <span className="pill-neon-cyan">
            <Sparkles className="h-3 w-3" /> Free for you, unlimited within reason
          </span>
          <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-bold leading-tight md:text-5xl">
            <Brain className="hidden h-10 w-10 text-neon-cyan md:inline" />
            Ask AI <span className="grad-text-cyan">🤔</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/65 md:text-base">
            Stuck on a concept? Paste it here and get a teacher-style explanation
            in plain English. Works for{" "}
            <b className="text-white">math, science, history, anything</b> in your CBSE syllabus.
          </p>
        </div>
      </section>

      <DoubtForm
        subjects={subjects.map((s) => ({ id: s.id, name: s.name, emoji: s.emoji }))}
      />
    </div>
  );
}
