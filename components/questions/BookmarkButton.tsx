"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function BookmarkButton({
  questionId,
  initial = false,
  className,
}: {
  questionId: string;
  initial?: boolean;
  className?: string;
}) {
  const [on, setOn] = useState(initial);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !on;
    setOn(next); // optimistic
    startTransition(async () => {
      try {
        const res = next
          ? await fetch("/api/bookmarks", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ questionId }),
            })
          : await fetch(`/api/bookmarks?questionId=${questionId}`, {
              method: "DELETE",
            });
        if (!res.ok) throw new Error("Save failed");
        if (next) toast.success("Bookmarked", { duration: 1500 });
      } catch {
        setOn(!next); // rollback
        toast.error("Couldn't save bookmark");
      }
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      aria-label={on ? "Remove bookmark" : "Add bookmark"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition-all",
        on
          ? "border-neon-yellow/40 bg-neon-yellow/15 text-neon-yellow shadow-glow-yellow"
          : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white",
        className
      )}
    >
      <Bookmark className="h-4 w-4" fill={on ? "currentColor" : "transparent"} />
    </button>
  );
}
