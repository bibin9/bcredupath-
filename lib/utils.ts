import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function daysBetween(a: Date, b: Date): number {
  const ms = 24 * 60 * 60 * 1000;
  return Math.round((b.getTime() - a.getTime()) / ms);
}

/** CBSE Class 10 boards typically begin mid-Feb. Hard-coded target: 2026-02-15. */
export const BOARDS_2026_DATE = new Date("2026-02-15T00:00:00Z");

export function daysToBoards(now = new Date()): number {
  return Math.max(0, daysBetween(now, BOARDS_2026_DATE));
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
