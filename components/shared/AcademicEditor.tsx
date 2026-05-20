"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, GraduationCap, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { STREAMS, type Stream, type ClassNum } from "@/lib/constants";

export function AcademicEditor({
  initialClass,
  initialStream,
}: {
  initialClass: 10 | 12 | null;
  initialStream: Stream | null;
}) {
  const router = useRouter();
  const [cls, setCls] = useState<ClassNum | null>(initialClass);
  const [stream, setStream] = useState<Stream | null>(initialStream);
  const [saving, setSaving] = useState(false);

  const changed = cls !== initialClass || stream !== initialStream;
  const valid =
    cls === 10 || (cls === 12 && !!stream);

  async function save() {
    if (!valid || !cls) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/academic", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class: cls, stream: cls === 12 ? stream : null }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Couldn't update");
      }
      toast.success("Academic profile updated 🎓");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-white/65">
        <GraduationCap className="h-4 w-4 text-neon-cyan" />
        <span>
          Switch your class or stream — useful after promotion or if you picked
          wrong during signup.
        </span>
      </div>

      {/* Class picker */}
      <div>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
          Class
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[10, 12].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCls(c as ClassNum);
                if (c === 10) setStream(null);
              }}
              className={cn(
                "rounded-2xl border p-3 text-left transition-all",
                cls === c
                  ? "border-neon-cyan/60 bg-neon-cyan/15 shadow-glow-cyan"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
              )}
            >
              <div className="font-display text-3xl font-black leading-none">{c}</div>
              <div className="mt-1 text-xs text-white/65">Class {c} · CBSE</div>
              {cls === c && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-neon-cyan">
                  <Check className="h-3 w-3" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stream picker — Class 12 only */}
      {cls === 12 && (
        <div>
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
            Stream
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStream(s.id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-3 text-left transition-all",
                  stream === s.id
                    ? "border-neon-purple/60 bg-neon-purple/15 shadow-glow-purple"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
                )}
              >
                <div className="text-2xl">{s.emoji}</div>
                <div className="min-w-0 flex-1 text-xs font-semibold">{s.label}</div>
                {stream === s.id && (
                  <Check className="h-4 w-4 shrink-0 text-neon-purple" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-[10px] text-white/45">
          Changing class refreshes your subjects & question bank.
        </p>
        <button
          onClick={save}
          disabled={!changed || !valid || saving}
          className="btn-neon text-sm"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save changes
        </button>
      </div>
    </div>
  );
}
