import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** "2023-10" → "Oct 2023"; null → "Present". */
export function formatMonth(ym: string | null): string {
  if (ym === null) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "YYYY-MM" → fractional year (mid-month), for timeline positioning. */
export function toYearFraction(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return y + (m - 0.5) / 12;
}

/** Human duration between two "YYYY-MM" points, e.g. "2 yrs 4 mos". */
export function formatDuration(start: string, end: string | null): string {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = (end ?? currentYearMonth()).split("-").map(Number);
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

export function currentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
