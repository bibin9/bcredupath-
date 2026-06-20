"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Sparkles,
  Trophy,
  Target,
  GraduationCap,
  Building2,
  Coins,
  CalendarDays,
  Users,
  UserCircle2,
  Wand2,
  Bookmark,
  Brain,
  FileText,
  BarChart3,
  Shield,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsStandalone } from "@/lib/hooks/useIsStandalone";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  emoji: string;
  hot?: boolean;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home, emoji: "🏠" },
  { href: "/dashboard/bank", label: "Question Bank", icon: BookOpen, emoji: "📚" },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark, emoji: "🔖" },
  { href: "/dashboard/predictor", label: "Predictor", icon: Sparkles, emoji: "🔮", hot: true },
  { href: "/dashboard/practice", label: "Practice", icon: Target, emoji: "🎯" },
  { href: "/dashboard/mock-test", label: "Mock Test", icon: FileText, emoji: "📝", hot: true },
  { href: "/dashboard/analytics", label: "My Progress", icon: BarChart3, emoji: "📊" },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy, emoji: "🏆" },
  { href: "/dashboard/careers", label: "Careers", icon: GraduationCap, emoji: "💼" },
  { href: "/dashboard/colleges", label: "Colleges", icon: Building2, emoji: "🏛️" },
  { href: "/dashboard/scholarships", label: "Scholarships", icon: Coins, emoji: "💰" },
  { href: "/dashboard/exams", label: "Exams", icon: CalendarDays, emoji: "📅" },
  { href: "/dashboard/resources", label: "Resources", icon: BookOpen, emoji: "📚" },
  { href: "/dashboard/counselors", label: "Helplines", icon: Users, emoji: "🧭" },
  { href: "/dashboard/planner", label: "Planner", icon: CalendarDays, emoji: "⏱️" },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle2, emoji: "👤" },
  { href: "/dashboard/feedback", label: "Send feedback", icon: MessageSquare, emoji: "💬" },
];

export function Sidebar({ showAdmin = false }: { showAdmin?: boolean }) {
  const pathname = usePathname();
  const standalone = useIsStandalone();
  const items = showAdmin
    ? [...NAV, { href: "/dashboard/admin", label: "Admin", icon: Shield, emoji: "🛡️" }]
    : NAV;

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col gap-2 border-r border-white/[0.06] bg-bg/60 backdrop-blur-xl px-4 py-6">
      <Link href="/dashboard" className="mb-4 flex items-center gap-2 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-grad-pink-purple text-xl shadow-glow-pink">
          🎯
        </div>
        <div className="leading-none">
          <div className="font-display text-xl font-bold tracking-tight">
            BCRedupath
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
            by Bibin CutRiver
          </div>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto no-scrollbar">
        {items.map((item) => {
          const active = pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                  : "text-white/65 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <span className="text-base leading-none">{item.emoji}</span>
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
          );
        })}
      </nav>

      {!standalone && (
        <Link
          href="/dashboard/install"
          className="card-glass card-glass-hover mt-2 block p-4"
        >
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span className="text-xl">📲</span>
            <span className="font-semibold">Install the app</span>
          </div>
          <p className="text-xs text-white/55">
            Get daily reminders, work offline, never miss a streak.
          </p>
          <div className="mt-2 text-xs font-semibold text-neon-cyan">
            See how →
          </div>
        </Link>
      )}
    </aside>
  );
}
