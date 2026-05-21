import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSalary, type CurrencyCode } from "@/lib/currency";

const categoryColor: Record<string, string> = {
  engineering: "border-neon-cyan/30 hover:shadow-glow-cyan",
  tech: "border-neon-cyan/30 hover:shadow-glow-cyan",
  medical: "border-neon-green/30 hover:shadow-glow-green",
  commerce: "border-neon-yellow/30 hover:shadow-glow-yellow",
  law: "border-neon-pink/30 hover:shadow-glow-pink",
  design: "border-neon-pink/30 hover:shadow-glow-pink",
  media: "border-neon-purple/30 hover:shadow-glow-purple",
  research: "border-neon-cyan/30 hover:shadow-glow-cyan",
  arts: "border-neon-purple/30 hover:shadow-glow-purple",
  defense: "border-neon-orange/30",
  "civil-services": "border-neon-yellow/30 hover:shadow-glow-yellow",
  education: "border-neon-green/30",
};

export function CareerCard({
  id,
  name,
  emoji,
  description,
  category,
  salaryEntry,
  salaryMid,
  matchScore,
  matchedTags,
  currency = "INR",
}: {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  salaryEntry: number;
  salaryMid: number;
  matchScore?: number;
  matchedTags?: string[];
  currency?: CurrencyCode;
}) {
  return (
    <Link
      href={`/dashboard/careers/${id}`}
      className={cn(
        "group block rounded-3xl border bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.06]",
        categoryColor[category] ?? "border-white/[0.08]"
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3">
          {emoji}
        </div>
        {matchScore !== undefined && matchScore > 0 && (
          <span className="pill-neon-pink">
            {Math.round(matchScore * 100)}% match
          </span>
        )}
      </div>

      <div className="font-display text-lg font-bold leading-tight">{name}</div>
      <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
        {category.replace("-", " ")}
      </div>
      <p className="mt-2 line-clamp-2 text-xs text-white/65">{description}</p>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="stat-num text-sm text-neon-yellow">
          {formatSalary(salaryEntry, currency)}–{formatSalary(salaryMid, currency)}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-white/45 transition-transform group-hover:translate-x-1 group-hover:text-white" />
      </div>

      {matchedTags && matchedTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {matchedTags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-semibold text-white/65">
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
