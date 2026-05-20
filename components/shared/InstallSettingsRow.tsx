"use client";

import Link from "next/link";
import { Smartphone, ChevronRight, CheckCircle2 } from "lucide-react";
import { useIsStandalone } from "@/lib/hooks/useIsStandalone";

/**
 * Profile-settings row that:
 * - shows an "Install as app" CTA if NOT yet installed
 * - shows a quiet "Installed ✓" confirmation if running as PWA
 */
export function InstallSettingsRow() {
  const standalone = useIsStandalone();

  if (standalone) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-neon-green/25 bg-neon-green/8 p-3">
        <CheckCircle2 className="h-4 w-4 text-neon-green" />
        <div className="flex-1">
          <div className="text-sm font-semibold">Installed as app 🎉</div>
          <div className="text-xs text-white/55">
            You're running BCRedupath as an installed app.
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/dashboard/install"
      className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-neon-pink/30 hover:bg-neon-pink/8"
    >
      <Smartphone className="h-4 w-4 text-neon-pink" />
      <div className="flex-1">
        <div className="text-sm font-semibold">Install as app 📲</div>
        <div className="text-xs text-white/55">
          Add to home screen — works offline, opens like a real app.
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-white/45" />
    </Link>
  );
}
