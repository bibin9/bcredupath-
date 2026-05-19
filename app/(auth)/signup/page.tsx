"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GoogleSignInButton } from "@/components/shared/GoogleSignInButton";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUnder18, setIsUnder18] = useState(false);
  const [parentConsent, setParentConsent] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Please accept the Terms and Privacy Policy to continue");
      return;
    }
    if (isUnder18 && !parentConsent) {
      toast.error("Parent / guardian consent is required for under-18 users");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Sign-up failed");
      }
      const signin = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signin?.error) throw new Error("Could not log in after sign-up");
      toast.success("Account created — let's set you up 🎉");
      router.push("/onboarding");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-glass">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl bg-grad-cyan-purple text-3xl shadow-glow-cyan">
          🚀
        </div>
        <h1 className="font-display text-3xl font-bold">Start your streak</h1>
        <p className="mt-1 text-sm text-white/55">
          Free forever. 900+ PYQs. AI predictor.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />
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
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
          autoComplete="new-password"
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />

        {/* AGE + CONSENT */}
        <div className="space-y-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/80">
            <input
              type="checkbox"
              checked={isUnder18}
              onChange={(e) => {
                setIsUnder18(e.target.checked);
                if (!e.target.checked) setParentConsent(false);
              }}
              className="mt-0.5 h-4 w-4 shrink-0 accent-neon-pink"
            />
            <span>I'm under 18 years old</span>
          </label>

          {isUnder18 && (
            <label className="flex items-start gap-2.5 cursor-pointer rounded-xl border border-neon-pink/25 bg-neon-pink/8 p-2.5 text-xs text-white/85">
              <input
                type="checkbox"
                checked={parentConsent}
                onChange={(e) => setParentConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-neon-pink"
              />
              <span>
                My parent / legal guardian has reviewed the{" "}
                <Link href="/privacy" target="_blank" className="text-neon-cyan underline">
                  Privacy Policy
                </Link>{" "}
                and consents to my use of BCRedupath under India's DPDP Act, 2023.
              </span>
            </label>
          )}

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/80">
            <input
              type="checkbox"
              required
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-neon-cyan"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="text-neon-cyan underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" className="text-neon-cyan underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !acceptTerms || (isUnder18 && !parentConsent)}
          className="btn-neon w-full"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
        </button>
      </form>

      <GoogleSignInButton callbackUrl="/onboarding" />

      <p className="mt-6 text-center text-sm text-white/55">
        Already on BCRedupath?{" "}
        <Link href="/login" className="font-semibold text-neon-cyan hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
