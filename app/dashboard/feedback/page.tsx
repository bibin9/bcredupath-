import { FeedbackForm } from "@/components/shared/FeedbackForm";
import { Sparkles, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <header>
        <span className="pill-neon-pink">
          <Sparkles className="h-3 w-3" /> Direct line to the maker
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Send feedback 💬
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-white/65">
          Found a wrong answer? Missing chapter? UI weirdness? Idea for a
          feature? Drop a note — Bibin reads every single one. The app gets
          better only because of feedback like yours.
        </p>
      </header>

      <FeedbackForm />

      <section className="rounded-2xl border border-neon-green/25 bg-neon-green/8 p-4 text-xs text-white/75">
        <div className="flex items-center gap-1.5 font-bold text-neon-green">
          <Heart className="h-3.5 w-3.5" /> What happens to your feedback
        </div>
        <ul className="mt-1 space-y-0.5">
          <li>• Saved to a private queue Bibin reviews daily</li>
          <li>• If it&apos;s a wrong-answer report, we delete or fix the question within 48h</li>
          <li>• Feature requests get triaged; the most-asked ones bubble up</li>
          <li>• You can submit up to 5 per day (so we can actually read them all)</li>
        </ul>
      </section>
    </div>
  );
}
