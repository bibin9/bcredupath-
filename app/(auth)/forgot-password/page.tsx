"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card-glass text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl bg-grad-cyan-purple text-3xl shadow-glow-cyan">
          📬
        </div>
        <h1 className="font-display text-2xl font-bold">Check your inbox</h1>
        <p className="mt-2 text-sm text-white/65">
          If <b className="text-white">{email}</b> is registered, we've sent a password
          reset link. It expires in 30 minutes.
        </p>
        <p className="mt-3 text-xs text-white/45">
          Didn't get it? Check spam, or{" "}
          <button
            onClick={() => setSent(false)}
            className="text-neon-cyan hover:underline"
          >
            try again
          </button>
          .
        </p>
        <Link href="/login" className="btn-ghost mt-6 inline-flex text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="card-glass">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl bg-grad-pink-purple text-3xl shadow-glow-pink">
          🔑
        </div>
        <h1 className="font-display text-3xl font-bold">Forgot password?</h1>
        <p className="mt-1 text-sm text-white/55">
          Drop your email — we'll send a reset link.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoFocus
            className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-neon w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-5 inline-flex items-center justify-center gap-1 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to login
      </Link>
    </div>
  );
}
