"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Target, Trophy, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/bank", label: "Bank", icon: BookOpen },
  { href: "/dashboard/predictor", label: "Predict", icon: null, isFab: true, emoji: "🔮" },
  { href: "/dashboard/practice", label: "Practice", icon: Target },
  { href: "/dashboard/profile", label: "Me", icon: UserCircle2 },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-md px-4 pb-3 pt-2">
        <div className="relative grid grid-cols-5 items-end gap-1 rounded-3xl border border-white/[0.08] bg-bg-2/85 px-2 py-2 backdrop-blur-xl shadow-glass">
          {TABS.map((tab) => {
            const active = pathname === tab.href ||
              (tab.href !== "/dashboard" && pathname.startsWith(tab.href));

            if ("isFab" in tab && tab.isFab) {
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="relative -mt-8 flex flex-col items-center justify-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-pink-purple text-2xl shadow-glow-pink animate-pulse-glow ring-4 ring-bg">
                    {tab.emoji}
                  </div>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-neon-pink">
                    {tab.label}
                  </span>
                </Link>
              );
            }

            const Icon = tab.icon!;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-2xl py-1.5 transition-colors",
                  active ? "text-white" : "text-white/55 hover:text-white/85"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]")} />
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
