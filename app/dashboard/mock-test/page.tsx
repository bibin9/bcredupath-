import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { Sparkles, Clock, FileText, Target, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MockTestIndex() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const subjects =
    user.class === 10
      ? SUBJECTS_BY_CLASS[10].all ?? []
      : (user.stream && SUBJECTS_BY_CLASS[12][user.stream]) ?? [];

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-4xl border border-neon-yellow/25 bg-gradient-to-br from-neon-yellow/15 via-bg-2 to-neon-pink/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-yellow/20 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-neon-pink/20 blur-3xl" />
        <div className="relative">
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> Real CBSE board paper format
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Mock Test 📝
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
            A full <b className="text-white">3-hour Sample Question Paper</b> assembled from
            our question bank, structured exactly like the real CBSE board exam — Section A
            (MCQs + Assertion-Reason), B / C (Short Answer), D (Long Answer), and E (Case
            Studies). Each question shows the recommended time. Submit anytime or let it
            auto-submit when the timer hits 0.
          </p>
        </div>
      </header>

      {/* Structure breakdown */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StructureTile label="Section A" detail="20 × 1 mark · MCQ + AR" total="20" />
        <StructureTile label="Section B" detail="5 × 2 marks · SA-I" total="10" />
        <StructureTile label="Section C" detail="6 × 3 marks · SA-II" total="18" />
        <StructureTile label="Section D" detail="4 × 5 marks · LA" total="20" />
        <StructureTile label="Section E" detail="3 × 4 marks · Case Study" total="12" />
      </section>
      <div className="card-glass flex items-center justify-between !p-3 text-xs">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-neon-cyan" />
          <span>38 questions · 80 marks · 3 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-neon-pink" />
          <span>Per-question recommended time displayed live</span>
        </div>
      </div>

      {/* Subject picker */}
      <section>
        <h2 className="mb-3 font-display text-xl font-bold">Pick a subject</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <Link
              key={s.id}
              href={`/dashboard/mock-test/${s.id}`}
              className="group flex items-center gap-3 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-neon-yellow/40 hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-2xl group-hover:scale-110 transition-transform">
                {s.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-base font-bold">{s.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/45">
                  Class {user.class} · CBSE
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-white/45 transition-transform group-hover:translate-x-1 group-hover:text-neon-yellow" />
            </Link>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="card-glass !p-4 text-xs text-white/65">
        <div className="mb-2 flex items-center gap-2 font-bold text-white">
          <Target className="h-4 w-4 text-neon-green" /> Before you start
        </div>
        <ul className="space-y-1.5">
          <li>• Find a 3-hour quiet window. Phone on silent. No backsies.</li>
          <li>• Open the paper, read the section instructions, then start the clock.</li>
          <li>
            • Each question shows its <b className="text-white">recommended time</b> based
            on marks (MCQ ~45s, SA ~3 min, LA ~8 min, Case Study ~6 min).
          </li>
          <li>• Submit early to get your score instantly, or let it auto-submit at 0:00.</li>
          <li>
            • You&apos;ll see a section-wise + time-spent breakdown after submitting.
          </li>
        </ul>
      </section>
    </div>
  );
}

function StructureTile({ label, detail, total }: { label: string; detail: string; total: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-white/45">
        {label}
      </div>
      <div className="mt-0.5 font-display text-base font-bold leading-tight">{detail}</div>
      <div className="mt-1 text-xs text-white/55">
        Total: <b className="text-neon-yellow">{total} marks</b>
      </div>
    </div>
  );
}
