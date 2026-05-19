"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Note = {
  id: string;
  type: string;
  emoji: string;
  title: string;
  body: string;
  href: string;
  accent: "pink" | "cyan" | "yellow" | "green" | "purple" | "orange";
};

const accentMap = {
  pink: "border-neon-pink/30 hover:border-neon-pink/50",
  cyan: "border-neon-cyan/30 hover:border-neon-cyan/50",
  yellow: "border-neon-yellow/30 hover:border-neon-yellow/50",
  green: "border-neon-green/30 hover:border-neon-green/50",
  purple: "border-neon-purple/30 hover:border-neon-purple/50",
  orange: "border-neon-orange/30 hover:border-neon-orange/50",
};

const READ_KEY = "bcr_notif_read";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(READ_KEY);
    if (stored) setReadIds(new Set(JSON.parse(stored)));
  }, []);

  useEffect(() => {
    if (!open || loaded) return;
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => {
        setNotes(d.notes ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [open, loaded]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    }
    setTimeout(() => document.addEventListener("click", onDoc), 0);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  function markRead(id: string) {
    const next = new Set(readIds);
    next.add(id);
    setReadIds(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(READ_KEY, JSON.stringify([...next]));
    }
  }

  function markAllRead() {
    const next = new Set([...readIds, ...notes.map((n) => n.id)]);
    setReadIds(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(READ_KEY, JSON.stringify([...next]));
    }
  }

  const unreadCount = notes.filter((n) => !readIds.has(n.id)).length;

  return (
    <div className="relative" ref={panelRef}>
      <button
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08]"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-neon-pink px-1 text-[9px] font-bold text-bg shadow-glow-pink">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-white/[0.10] bg-bg-2/95 p-3 shadow-glass backdrop-blur-2xl">
          <div className="mb-2 flex items-center justify-between px-1">
            <div>
              <div className="font-display text-base font-bold">Notifications</div>
              <div className="text-[10px] text-white/45">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </div>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-[10px] font-semibold text-neon-cyan hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[420px] space-y-2 overflow-y-auto">
            {!loaded ? (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center text-xs text-white/55">
                Loading…
              </div>
            ) : notes.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center text-xs text-white/55">
                <div className="mb-1 text-2xl">🌙</div>
                Nothing here. Come back later.
              </div>
            ) : (
              notes.map((n) => {
                const isRead = readIds.has(n.id);
                return (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => { markRead(n.id); setOpen(false); }}
                    className={cn(
                      "group flex items-start gap-3 rounded-2xl border bg-white/[0.03] p-3 transition-all",
                      accentMap[n.accent],
                      isRead && "opacity-50"
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-xl">
                      {n.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold leading-tight">{n.title}</div>
                        {!isRead && (
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink shadow-glow-pink" />
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-white/65">{n.body}</div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <div className="mt-2 border-t border-white/[0.06] pt-2 text-center">
            <button onClick={() => setOpen(false)} className="text-[10px] text-white/45 hover:text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
