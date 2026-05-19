import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { Sparkles } from "lucide-react";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/dashboard");

  return (
    <main className="relative min-h-screen">
      <GradientBlobs />

      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-grad-pink-purple text-xl shadow-glow-pink">
            🎯
          </div>
          <div className="leading-none">
            <div className="font-display text-xl font-bold">BCRedupath</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
              by Bibin CutRiver
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost text-sm">
            Log in
          </Link>
          <Link href="/signup" className="btn-neon text-sm">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill-neon-yellow mx-auto">
            <Sparkles className="h-3 w-3" /> Built for CBSE Boards 2026
          </span>
          <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Crack boards like
            <br />
            it's a <span className="grad-text">game.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/65 md:text-lg">
            AI predicts what'll be asked. PYQs from a decade of papers. Streaks,
            XP and a leaderboard that actually makes you study.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" className="btn-neon w-full sm:w-auto">
              Start free — <span className="font-mono">+50 XP</span> for signing up
            </Link>
            <Link href="/login" className="btn-ghost w-full sm:w-auto">
              I already have an account
            </Link>
          </div>
          <p className="mt-3 text-xs text-white/45">
            Free forever · No credit card · Class 10 & 12 · CBSE
          </p>
        </div>

        {/* Floating preview cards */}
        <div className="relative mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Feature
            emoji="🔮"
            tint="pink"
            title="AI Predictor"
            text="Top 20 questions most likely to appear, scored by frequency, recency and sleeper signals."
          />
          <Feature
            emoji="🔥"
            tint="yellow"
            title="Streak engine"
            text="Solve one question a day to keep your fire alive. Miss a day, lose your streak."
          />
          <Feature
            emoji="🏆"
            tint="cyan"
            title="India-wide ranks"
            text="Compete with your state, city, school. Climb from Bronze to Diamond."
          />
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="card-glass grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <Stat n="2K+" l="PYQs & sample Qs" />
          <Stat n="13" l="Subjects covered" />
          <Stat n="30+" l="Career profiles" />
          <Stat n="500+" l="Colleges indexed" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="card-glass overflow-hidden text-center md:p-12">
          <div className="text-5xl">🚀</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Your boards. Your <span className="grad-text-yellow">grind</span>.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/65 md:text-base">
            Join thousands of Class 10 & 12 students already prepping the smart
            way.
          </p>
          <Link href="/signup" className="btn-neon mt-6 inline-flex">
            Start your streak — it's free
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-10 text-center text-xs text-white/35 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-4">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Use</Link>
          <a href="mailto:hello@bcredupath.example" className="hover:text-white">Contact</a>
        </div>
        © 2026 BCRedupath · Built with ❤️ for Indian students by{" "}
        <span className="font-semibold text-white/55">Bibin CutRiver</span>
      </footer>
    </main>
  );
}

function Feature({
  emoji,
  title,
  text,
  tint,
}: {
  emoji: string;
  title: string;
  text: string;
  tint: "pink" | "cyan" | "yellow";
}) {
  const ring = {
    pink: "shadow-glow-pink border-neon-pink/25",
    cyan: "shadow-glow-cyan border-neon-cyan/25",
    yellow: "shadow-glow-yellow border-neon-yellow/25",
  }[tint];
  return (
    <div className={`card-glass relative ${ring}`}>
      <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl animate-float">
        {emoji}
      </div>
      <div className="font-display text-xl font-bold">{title}</div>
      <p className="mt-1 text-sm text-white/65">{text}</p>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-black md:text-5xl">
        <span className="grad-text">{n}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-white/55">
        {l}
      </div>
    </div>
  );
}
