"use client";

import { useEffect, useState } from "react";
import { LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "bcr_locale";

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && LOCALES.some((l) => l.id === stored)) setLocale(stored);
  }, []);

  function update(l: Locale) {
    setLocale(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  }

  return [locale, update];
}

export function LocaleToggle() {
  const [locale, setLocale] = useLocale();

  return (
    <div className="inline-flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
      {LOCALES.map((l) => (
        <button
          key={l.id}
          onClick={() => setLocale(l.id)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-all",
            locale === l.id
              ? "bg-neon-purple/20 text-white shadow-glow-purple"
              : "text-white/55 hover:text-white"
          )}
        >
          <span className="mr-1">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}
