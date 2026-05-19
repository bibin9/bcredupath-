"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; emoji?: string; disabled?: boolean; tooltip?: string };

export function Tabs({
  param,
  options,
  defaultValue,
}: {
  param: "scope" | "period";
  options: Tab[];
  defaultValue: string;
}) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  const current = sp.get(param) ?? defaultValue;

  function set(value: string) {
    const next = new URLSearchParams(sp);
    next.set(param, value);
    startTransition(() => router.push(`${path}?${next.toString()}`, { scroll: false }));
  }

  return (
    <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
      {options.map((o) => {
        const active = current === o.id;
        return (
          <button
            key={o.id}
            onClick={() => !o.disabled && set(o.id)}
            disabled={o.disabled || pending}
            title={o.tooltip}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
              active
                ? "border-neon-purple/50 bg-neon-purple/15 text-white shadow-glow-purple"
                : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18] hover:text-white",
              o.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {o.emoji && <span>{o.emoji}</span>}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
