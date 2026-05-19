import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "h-8 w-8 text-base",
  md: "h-11 w-11 text-2xl",
  lg: "h-16 w-16 text-3xl",
  xl: "h-24 w-24 text-5xl",
};

export function EmojiAvatar({
  emoji,
  size = "md",
  ring = true,
  className,
}: {
  emoji: string;
  size?: Size;
  ring?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-grad-pink-purple shrink-0 select-none",
        ring && "ring-2 ring-white/15 shadow-glow-pink",
        sizeMap[size],
        className
      )}
    >
      <span>{emoji}</span>
    </div>
  );
}
