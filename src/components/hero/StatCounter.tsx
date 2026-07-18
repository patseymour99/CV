"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/types";

/**
 * Counts up from 0 the first time the tile scrolls into view.
 * requestAnimationFrame + easeOutCubic; renders the final value
 * immediately for reduced-motion users.
 */
export function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(stat.value);
          setDone(true);
          return;
        }
        const duration = 900;
        const startTime = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(stat.value * eased));
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setDone(true);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat.value]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 sm:p-5"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/60 via-accent/15 to-transparent"
      />
      <p className="font-mono text-2xl font-semibold tracking-tight tnum sm:text-3xl">
        {stat.prefix}
        {done ? stat.value : display}
        {stat.suffix}
      </p>
      <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">{stat.label}</p>
    </div>
  );
}
