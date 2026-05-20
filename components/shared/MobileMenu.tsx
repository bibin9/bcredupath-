"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Bookmark,
  Sparkles,
  Target,
  Brain,
  FileText,
  BarChart3,
  Wand2,
  Trophy,
  GraduationCap,
  Building2,
  Coins,
  CalendarDays,
  Users,
  Shield,
  Smartphone,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsStandalone } from "@/lib/hooks/useIsStandalone";

type Item = {
  href: string;
  label: string;
  icon: typeof Home;
  emoji: string;
  hot?: boolean;
  group?: string;
};

const NAV: Item[] = [
  /* Study */
  { href: "/dashboard", label: "Home", icon: Home, emoji: "🏠", group: "Study" },
  { href: "/dashboard/bank", label: "Question Bank", icon: BookOpen, emoji: "📚", group: "Study" },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark, emoji: "🔖", group: "Study" },
  { href: "/dashboard/predictor", label: "AI Predictor", icon: Sparkles, emoji: "🔮", hot: true, group: "Study" },
  { href: "/dashboard/practice", label: "Practice", icon: Target, emoji: "🎯", group: "Study" },
  { href: "/dashboard/doubt", label: "Ask AI", icon: Brain, emoji: "🤔", hot: true, group: "Study" },
  { href: "/dashboard/notes", label: "Revision Notes", icon: FileText, emoji: "📓", group: "Study" },
  { href: "/dashboard/generate", label: "Generate Qs", icon: Wand2, emoji: "🪄", group: "Study" },
  { href: "/dashboard/planner", label: "Study Planner", icon: CalendarDays, emoji: "⏱️", group: "Study" },

  /* You */
  { href: "/dashboard/analytics", label: "My Progress", icon: BarChart3, emoji: "📊", group: "You" },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy, emoji: "🏆", group: "You" },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle2, emoji: "👤", group: "You" },

  /* Explore */
  { href: "/dashboard/careers", label: "Careers", icon: GraduationCap, emoji: "💼", group: "Explore" },
  { href: "/dashboard/colleges", label: "Colleges", icon: Building2, emoji: "🏛️", group: "Explore" },
  { href: "/dashboard/scholarships", label: "Scholarships", icon: Coins, emoji: "💰", group: "Explore" },
  { href: "/dashboard/exams", label: "Entrance Exams", icon: CalendarDays, emoji: "📅", group: "Explore" },
  { href: "/dashboard/counselors", label: "Counselors", icon: Users, emoji: "🧭", group: "Explore" },

  /* App */
  { href: "/dashboard/install", label: "Install App", icon: Smartphone, emoji: "📲", group: "App" },
];

export function MobileMenu({ showAdmin = false }: { showAdmin?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const standalone = useIsStandalone();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const allItems = showAdmin
    ? [...NAV, { href: "/dashboard/admin", label: "Admin", icon: Shield, emoji: "🛡️", group: "App" as const }]
    : NAV;
  // Hide "Install App" entry when already running as installed PWA
  const items = standalone
    ? allItems.filter((i) => i.href !== "/dashboard/install")
    : allItems;

  // Group items
  const groups = new Map<string, Item[]>();
  for (const item of items) {
    const g = item.group ?? "More";
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(item);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        type="button"
        className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] active:scale-95 hover:bg-white/[0.08] lg:hidden touch-manipulation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 z-[61] flex w-[min(85vw,360px)] flex-col border-l border-white/[0.10] bg-bg-2/98 backdrop-blur-2xl lg:hidden"
              style={{
                // 100dvh = dynamic viewport height (handles iOS Safari address bar resize).
                // Falls back to 100vh on older browsers.
                height: "100dvh",
                maxHeight: "100vh",
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-grad-pink-purple text-lg shadow-glow-pink">
                    🎯
                  </div>
                  <div className="leading-none">
                    <div className="font-display text-base font-bold tracking-tight">
                      BCRedupath
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-neon-cyan">
                      by Bibin CutRiver
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/70 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Grouped nav — min-h-0 is critical for flex-1 + overflow-y-auto on iOS Safari */}
              <nav
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {Array.from(groups.entries()).map(([group, items]) => (
                  <div key={group} className="mb-4">
                    <div className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
                      {group}
                    </div>
                    <ul className="space-y-0.5">
                      {items.map((item) => {
                        const active =
                          pathname === item.href ||
                          (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                                active
                                  ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                                  : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                              )}
                            >
                              <span className="text-lg leading-none">{item.emoji}</span>
                              <span className="flex-1">{item.label}</span>
                              {item.hot && (
                                <span className="rounded-full bg-neon-pink/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neon-pink">
                                  Hot
                                </span>
                              )}
                              {active && (
                                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-neon-pink shadow-glow-pink" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>

              {/* Footer — install CTA (hidden when running as installed PWA) */}
              {!standalone && (
              <div className="shrink-0 border-t border-white/[0.06] p-2">
                <Link
                  href="/dashboard/install"
                  className="flex items-center gap-2 rounded-2xl border border-neon-pink/25 bg-neon-pink/8 px-3 py-2 transition-all hover:bg-neon-pink/15"
                >
                  <span className="text-lg">📲</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">Install as app</div>
                    <div className="text-[9px] text-white/55">
                      Work offline · never miss a streak
                    </div>
                  </div>
                </Link>
              </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
