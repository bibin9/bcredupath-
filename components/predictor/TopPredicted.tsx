import Link from "next/link";
import { Latex } from "@/components/questions/Latex";
import { PredictionBadge } from "@/components/questions/PredictionBadge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MEDALS = ["🥇", "🥈", "🥉"];

export type TopQ = {
  _id: string;
  subject: string;
  chapter: string;
  topic: string;
  question: string;
  type: string;
  marks: number;
  predictedProbability: number;
};

export function TopPredicted({ items }: { items: TopQ[] }) {
  return (
    <div className="card-glass">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="font-display text-xl font-bold">Top picks 🔮</h3>
          <p className="text-xs text-white/55">
            Most likely to appear in Boards 2026.
          </p>
        </div>
        <Link
          href="/dashboard/practice/hot-20"
          className="btn-neon !px-4 !py-2 text-xs"
        >
          Practice Hot 20 <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ol className="space-y-2">
        {items.slice(0, 10).map((q, i) => (
          <li
            key={q._id}
            className={cn(
              "group flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-white/[0.18] hover:bg-white/[0.06]"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
              {i < 3 ? (
                <span className="text-2xl">{MEDALS[i]}</span>
              ) : (
                <span className="stat-num text-sm text-white/65">#{i + 1}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <PredictionBadge probability={q.predictedProbability} size="sm" />
                <span className="pill !px-2 !py-0 text-[9px]">{q.type}</span>
                <span className="pill !px-2 !py-0 text-[9px]">{q.marks}m</span>
                <span className="text-[10px] text-white/45">{q.chapter}</span>
              </div>
              <div className="line-clamp-2 text-sm text-white/85">
                <Latex>{q.question}</Latex>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
