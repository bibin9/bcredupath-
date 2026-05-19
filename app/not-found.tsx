import Link from "next/link";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen">
      <GradientBlobs />
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-12 text-center">
        <div className="text-7xl md:text-9xl animate-float">🤖</div>
        <span className="pill-neon-pink mt-4">Error 404</span>
        <h1 className="mt-3 font-display text-4xl font-black md:text-6xl">
          Lost in <span className="grad-text">space</span>
        </h1>
        <p className="mt-3 text-sm text-white/65 md:text-base">
          That page doesn't exist — maybe a typo in the URL, or it's coming in a
          future sprint.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link href="/dashboard" className="btn-neon text-sm">
            <Home className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/" className="btn-ghost text-sm">
            <ArrowLeft className="h-4 w-4" /> Landing page
          </Link>
        </div>
      </div>
    </main>
  );
}
