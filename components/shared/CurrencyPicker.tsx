"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Coins } from "lucide-react";
import { toast } from "sonner";
import { CURRENCY_META, isCurrency, type CurrencyCode } from "@/lib/currency";

const VISIBLE: CurrencyCode[] = [
  "INR", "USD", "AED", "SAR", "QAR", "SGD", "GBP", "EUR", "AUD", "CAD",
];

export function CurrencyPicker({
  initial,
}: {
  initial: string | null | undefined;
}) {
  const router = useRouter();
  const [value, setValue] = useState<CurrencyCode>(
    isCurrency(initial) ? initial : "INR"
  );
  const [saving, setSaving] = useState(false);

  async function save(next: CurrencyCode) {
    if (next === value) return;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch("/api/user/academic", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferredCurrency: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Couldn't save");
      }
      toast.success(`Showing salaries in ${next} ${CURRENCY_META[next].flag}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-xs text-white/65">
        <Coins className="h-4 w-4 text-neon-yellow" />
        <span>Salaries shown in:</span>
      </div>
      <select
        value={value}
        onChange={(e) => save(e.target.value as CurrencyCode)}
        disabled={saving}
        className="h-9 rounded-xl border border-white/[0.08] bg-bg-2 px-2.5 text-xs font-semibold outline-none focus:border-neon-yellow/50 focus:ring-2 focus:ring-neon-yellow/20 disabled:opacity-50"
      >
        {VISIBLE.map((c) => (
          <option key={c} value={c}>
            {CURRENCY_META[c].flag}  {c} · {CURRENCY_META[c].label}
          </option>
        ))}
      </select>
      {saving && <Loader2 className="h-3.5 w-3.5 animate-spin text-white/55" />}
    </div>
  );
}
