"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="card-glass text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-white/55" />
        </div>
      }
    >
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Reset failed");
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="card-glass text-center">
        <div className="text-5xl">⚠️</div>
        <h1 className="mt-3 font-display text-2xl font-bold">Invalid link</h1>
        <p className="mt-2 text-sm text-white/65">
          This reset link is missing a token. Request a new one.
        </p>
        <Link href="/forgot-password" className="btn-neon mt-5 inline-flex text-sm">
          Get a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="card-glass text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-neon-green animate-pulse-glow" />
        <h1 className="mt-3 font-display text-2xl font-bold">Password reset!</h1>
        <p className="mt-2 text-sm text-white/65">
          Redirecting you to login…
        </p>
      </div>
    );
  }

  return (
    <div className="card-glass">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl bg-grad-pink-purple text-3xl shadow-glow-pink">
          🔐
        </div>
        <h1 className="font-display text-3xl font-bold">Set new password</h1>
        <p className="mt-1 text-sm text-white/55">
          Pick something you'll remember. Min 6 characters.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            autoFocus
            autoComplete="new-password"
            className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            autoComplete="new-password"
            className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-neon w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset password"}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-5 inline-flex items-center justify-center gap-1 text-xs font-semibold text-white/55 hover:text-white"
      >
        Back to login
      </Link>
    </div>
  );
}
