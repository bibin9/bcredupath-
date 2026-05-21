"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Check, Globe } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { INDIAN_STATES, NRI_COUNTRIES } from "@/lib/constants";
import { defaultCurrencyForCountry } from "@/lib/currency";

export function LocationEditor({
  initialCountry,
  initialState,
  initialCity,
}: {
  initialCountry: string;
  initialState: string | null;
  initialCity: string | null;
}) {
  const router = useRouter();
  const [country, setCountry] = useState<string>(initialCountry || "India");
  const [state, setState] = useState<string>(initialState ?? "");
  const [city, setCity] = useState<string>(initialCity ?? "");
  const [saving, setSaving] = useState(false);

  const isIndia = country === "India";
  const changed =
    country !== initialCountry ||
    state !== (initialState ?? "") ||
    city !== (initialCity ?? "");
  const valid = isIndia ? !!state : !!country;

  async function save() {
    if (!valid) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/academic", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          state: isIndia ? state : null,
          city: city || null,
          // When user flips countries, default their currency too — they
          // can override afterwards in the currency picker.
          preferredCurrency:
            country !== initialCountry
              ? defaultCurrencyForCountry(country)
              : undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Couldn't update");
      }
      toast.success("Location updated 📍");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 text-xs text-white/65">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-pink" />
        <span>
          Tell us where you live so we can show the right state leaderboards,
          NRI quota info, and local scholarships.
        </span>
      </div>

      {/* India / Outside India toggle */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setCountry("India");
          }}
          className={cn(
            "rounded-2xl border p-3 text-left transition-all",
            isIndia
              ? "border-neon-cyan/60 bg-neon-cyan/15 shadow-glow-cyan"
              : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
          )}
        >
          <div className="text-xl">🇮🇳</div>
          <div className="mt-1 text-xs font-semibold">India</div>
        </button>
        <button
          type="button"
          onClick={() => {
            if (country === "India") setCountry("United Arab Emirates");
            setState("");
          }}
          className={cn(
            "rounded-2xl border p-3 text-left transition-all",
            !isIndia
              ? "border-neon-purple/60 bg-neon-purple/15 shadow-glow-purple"
              : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
          )}
        >
          <div className="text-xl">🌍</div>
          <div className="mt-1 text-xs font-semibold">Outside India · NRI</div>
        </button>
      </div>

      {/* State or Country dropdown */}
      {isIndia ? (
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="h-11 w-full rounded-2xl border border-white/[0.08] bg-bg-2 px-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        >
          <option value="">Select your state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ) : (
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-11 w-full rounded-2xl border border-white/[0.08] bg-bg-2 px-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        >
          {NRI_COUNTRIES.map((c) => (
            <option key={c.code} value={c.name}>
              {c.flag}  {c.name}
            </option>
          ))}
        </select>
      )}

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={isIndia ? "City (optional)" : "City — e.g. Dubai (optional)"}
        className="h-11 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
      />

      {!isIndia && (
        <div className="rounded-2xl border border-neon-purple/25 bg-neon-purple/8 p-3 text-[11px] text-white/75">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Globe className="h-3 w-3 text-neon-purple" /> NRI mode active
          </div>
          You sit the same CBSE boards. You qualify for 15% NRI quota at AIIMS /
          IITs / NITs and most private colleges. Career roadmap will surface
          NRI-friendly options.
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={save}
          disabled={!changed || !valid || saving}
          className="btn-neon text-sm"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save location
        </button>
      </div>
    </div>
  );
}
