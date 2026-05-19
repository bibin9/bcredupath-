import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export function ComingSoon({
  emoji,
  title,
  description,
  sprint,
}: {
  emoji: string;
  title: string;
  description: string;
  sprint: number;
}) {
  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
      <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-4xl bg-grad-pink-purple text-6xl shadow-glow-pink animate-float">
        {emoji}
      </div>
      <span className="pill-neon-yellow">
        <Sparkles className="h-3 w-3" /> Sprint {sprint} — coming soon
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold">{title}</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/65">{description}</p>
      <Link href="/dashboard" className="btn-ghost mt-6">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
}
