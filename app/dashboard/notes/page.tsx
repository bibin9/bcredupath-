import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { NotesViewer } from "@/components/notes/NotesViewer";
import { FileText, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
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
      <header className="relative overflow-hidden rounded-4xl border border-neon-cyan/25 bg-gradient-to-br from-neon-cyan/15 via-bg-2 to-neon-pink/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
        <div className="relative">
          <span className="pill-neon-cyan">
            <Sparkles className="h-3 w-3" /> Quick revision · per chapter
          </span>
          <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-bold md:text-5xl">
            <FileText className="hidden h-10 w-10 text-neon-cyan md:inline" />
            Revision Notes <span className="grad-text-cyan">📓</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/65 md:text-base">
            Bite-sized chapter summaries + formula sheets. Generated once, then cached for every student.
            <b className="text-white"> Perfect for night-before-exam revision.</b>
          </p>
        </div>
      </header>

      <NotesViewer
        subjects={subjects.map((s) => ({ id: s.id, name: s.name, emoji: s.emoji }))}
        classNum={cls}
      />
    </div>
  );
}
