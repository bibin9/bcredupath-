"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Shows the "Continue with Google" button only when Google OAuth is
 * actually configured on the backend. Uses NextAuth's /api/auth/providers
 * endpoint as the source of truth — so we never show a broken button.
 */
export function GoogleSignInButton({ callbackUrl = "/dashboard" }: { callbackUrl?: string }) {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/providers")
      .then((r) => r.json())
      .then((d) => setEnabled(!!d?.google))
      .catch(() => setEnabled(false));
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="my-5 flex items-center gap-3 text-xs text-white/35">
        <span className="h-px flex-1 bg-white/[0.08]" /> OR{" "}
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="btn-ghost w-full"
      >
        <span className="text-lg">🔐</span> Continue with Google
      </button>
    </>
  );
}
