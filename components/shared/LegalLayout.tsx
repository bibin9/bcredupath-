import Link from "next/link";
import { GradientBlobs } from "./GradientBlobs";
import { ArrowLeft } from "lucide-react";

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <GradientBlobs />
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to landing
        </Link>

        <header className="mt-6">
          <h1 className="font-display text-3xl font-bold md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-base text-white/65">{subtitle}</p>
          )}
          <p className="mt-2 text-xs text-white/45">
            Last updated: <span className="text-white/65">{lastUpdated}</span>
          </p>
        </header>

        <article className="legal-prose mt-8 space-y-6 text-sm leading-relaxed text-white/80">
          {children}
        </article>

        <footer className="mt-12 border-t border-white/[0.06] pt-6 text-xs text-white/45">
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/login" className="hover:text-white">Log in</Link>
          </div>
          <p className="mt-3">© 2026 BCRedupath · by Bibin CutRiver</p>
        </footer>
      </div>
    </main>
  );
}
