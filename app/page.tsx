import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { LandingMarquee } from "@/components/marketing/LandingMarquee";
import { LandingCounters } from "@/components/marketing/LandingCounters";
import { Sparkles, Flame, Trophy, Brain, Rocket, BadgeCheck, ArrowRight, GraduationCap } from "lucide-react";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/dashboard");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBlobs />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
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

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-6 lg:px-8 lg:pt-14">
        {/* Floating mini-pills */}
        <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> CBSE 2026-27 Session
          </span>
          <span className="pill-neon-green">
            <BadgeCheck className="h-3 w-3" /> 1,932 CBSE-Official PYQs
          </span>
          <span className="pill-neon-pink">
            <Rocket className="h-3 w-3" /> Boards 2027
          </span>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-black leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
            Crack <span className="grad-text">board</span>.
            <br />
            Pick a <span className="grad-text-yellow">career</span>.
            <br />
            Look <span className="grad-text">unreal</span> doing it.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            The CBSE prep app for{" "}
            <b className="text-white">Class 10 + 12 students</b> who want
            real PYQs, AI-predicted Hot 20s, career roadmaps, and
            college-by-college NRI quota info — all in one ridiculously fast
            PWA. Streaks. XP. Bronze → Diamond. You know the vibe.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" className="btn-neon w-full sm:w-auto text-base">
              Start free
              <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[11px]">
                +50 XP
              </span>
            </Link>
            <Link href="/login" className="btn-ghost w-full sm:w-auto text-sm">
              I already have an account <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-white/45">
            Free forever · No credit card · Works offline (PWA) · India + NRI
          </p>
        </div>

        {/* Animated counters strip */}
        <div className="mx-auto mt-14 max-w-5xl">
          <LandingCounters />
        </div>

        {/* Live preview cards */}
        <div className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Feature
            icon={<Brain className="h-7 w-7 text-neon-pink" />}
            tint="pink"
            title="AI Hot 20"
            text="Probability-scored top picks for boards. Frequency + recency + sleeper boost. Genuinely opinionated."
          />
          <Feature
            icon={<Flame className="h-7 w-7 text-neon-yellow" />}
            tint="yellow"
            title="Streak engine"
            text="One question a day to keep the fire alive. Miss a day, lose it. The dopamine works."
          />
          <Feature
            icon={<Trophy className="h-7 w-7 text-neon-cyan" />}
            tint="cyan"
            title="State + global ranks"
            text="Climb your state. Climb India. NRI students get country-segmented boards too."
          />
        </div>
      </section>

      {/* ── CAREERS MARQUEE ─────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-4 lg:px-8">
        <div className="mb-4 text-center">
          <span className="pill-neon-cyan">
            <GraduationCap className="h-3 w-3" /> 158 careers in the app
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Not just <span className="line-through text-white/30">study</span>
            <br className="md:hidden" />
            <span className="grad-text">study + decide</span>.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 md:text-base">
            Class 10 → 12 → UG → PG → Career roadmaps with the colleges that
            offer each degree (phone + email + website). Click any career to
            see the full path.
          </p>
        </div>
        <LandingMarquee />
      </section>

      {/* ── WHY IT'S DIFFERENT ──────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <WhyCard
            emoji="🇮🇳"
            title="Actually CBSE-official"
            text="1,932 questions sourced directly from cbseacademic.nic.in (SQPs + PQs + Question Banks). Green ✓ CBSE Official badge on every one. Not random scraped junk."
            tint="green"
          />
          <WhyCard
            emoji="🌍"
            title="NRI students, finally seen"
            text="UAE? Saudi? Singapore? You sit the same boards. We show NRI quota seats at AIIMS, IITs, NITs, IIMs — fees in your currency (AED, SAR, USD), cutoffs explained."
            tint="purple"
          />
          <WhyCard
            emoji="⚡"
            title="PWA. Install. Offline."
            text="Add to home screen. Use it like an app. Question bank works offline. Zero ads. Zero pop-ups telling you to buy a premium tier."
            tint="cyan"
          />
          <WhyCard
            emoji="🎮"
            title="Built like a game on purpose"
            text="Daily challenge. Hot 20. PYQ Marathon. Weakness Hunter. Bronze → Silver → Gold → Platinum → Diamond rank. Because studying is brutal without a reward loop."
            tint="pink"
          />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="card-glass relative overflow-hidden border-neon-pink/30 shadow-glow-pink !p-8 text-center md:!p-14">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-pink/30 blur-3xl" />
          <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-neon-purple/30 blur-3xl" />
          <div className="relative">
            <div className="text-6xl">🚀</div>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight md:text-5xl">
              Your boards. Your <span className="grad-text-yellow">grind</span>.
              <br />
              Your <span className="grad-text">career</span>. Now.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/65 md:text-base">
              Friends already at Bronze. You&apos;re still on +0 XP. Catch up.
            </p>
            <Link
              href="/signup"
              className="btn-neon mt-7 inline-flex text-base"
            >
              Start your streak — it&apos;s free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-[10px] uppercase tracking-widest text-white/35">
              No card · No ads · No premium upsell
            </p>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto max-w-7xl px-5 pb-10 text-center text-xs text-white/35 lg:px-8">
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
  icon,
  title,
  text,
  tint,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tint: "pink" | "cyan" | "yellow";
}) {
  const ring = {
    pink: "shadow-glow-pink border-neon-pink/25 hover:border-neon-pink/50",
    cyan: "shadow-glow-cyan border-neon-cyan/25 hover:border-neon-cyan/50",
    yellow: "shadow-glow-yellow border-neon-yellow/25 hover:border-neon-yellow/50",
  }[tint];
  return (
    <div
      className={`card-glass group relative transition-all hover:-translate-y-1 ${ring}`}
    >
      <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="font-display text-xl font-bold">{title}</div>
      <p className="mt-1 text-sm text-white/65">{text}</p>
    </div>
  );
}

function WhyCard({
  emoji,
  title,
  text,
  tint,
}: {
  emoji: string;
  title: string;
  text: string;
  tint: "green" | "purple" | "cyan" | "pink";
}) {
  const border = {
    green: "border-neon-green/25 hover:border-neon-green/55",
    purple: "border-neon-purple/25 hover:border-neon-purple/55",
    cyan: "border-neon-cyan/25 hover:border-neon-cyan/55",
    pink: "border-neon-pink/25 hover:border-neon-pink/55",
  }[tint];
  return (
    <div className={`card-glass transition-all hover:-translate-y-0.5 ${border}`}>
      <div className="text-4xl">{emoji}</div>
      <h3 className="mt-3 font-display text-lg font-bold md:text-xl">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{text}</p>
    </div>
  );
}
