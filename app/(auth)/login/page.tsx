"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GoogleSignInButton } from "@/components/shared/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) return toast.error("Wrong email or password");
    toast.success("Welcome back! ✨");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="card-glass">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl bg-grad-pink-purple text-3xl shadow-glow-pink">
          🎯
        </div>
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-white/55">Pick up your streak where you left off</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />
        <button type="submit" disabled={loading} className="btn-neon w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
        </button>
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-white/55 hover:text-white"
          >
            Forgot password?
          </Link>
        </div>
      </form>

      <GoogleSignInButton callbackUrl="/dashboard" />

      <p className="mt-6 text-center text-sm text-white/55">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-neon-cyan hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
