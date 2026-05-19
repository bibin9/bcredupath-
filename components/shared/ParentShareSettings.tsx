"use client";

import { useState } from "react";
import { Copy, Check, Users, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ParentShareSettings({ initialToken }: { initialToken?: string }) {
  const [token, setToken] = useState<string | undefined>(initialToken);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const link = token
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/parent/${token}`
    : "";

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/user/parent-link", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Couldn't generate link");
      setToken(data.token);
      toast.success("Parent link ready 🤝");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  async function revoke() {
    if (!confirm("Revoke parent access? They won't be able to see your progress anymore.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/parent-link", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setToken(undefined);
      toast.success("Parent access revoked");
    } catch {
      toast.error("Couldn't revoke. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2 text-xs text-white/65">
        <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-cyan" />
        <p>
          Generate a private link your parent can bookmark. They'll see a clean summary —
          your streak, weekly progress, and study heatmap. <b className="text-white">No individual question history</b>, no chats, no leaderboard rank.
        </p>
      </div>

      {!token ? (
        <button
          onClick={generate}
          disabled={loading}
          className="btn-neon !py-2 text-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate parent link"}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
            <code className="flex-1 truncate text-[11px] text-white/85">{link}</code>
            <button
              onClick={copy}
              className={cn(
                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all",
                copied
                  ? "border-neon-green/50 bg-neon-green/15 text-neon-green"
                  : "border-white/[0.10] hover:border-white/[0.20]"
              )}
              aria-label="Copy link"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generate}
              disabled={loading}
              className="btn-ghost !py-1.5 text-xs"
              title="Rotate the token — old link stops working"
            >
              Regenerate
            </button>
            <button
              onClick={revoke}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-xl border border-neon-pink/30 bg-neon-pink/10 px-3 py-1.5 text-xs font-semibold text-neon-pink hover:bg-neon-pink/20"
            >
              <Trash2 className="h-3 w-3" /> Revoke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
