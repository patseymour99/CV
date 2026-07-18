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
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift sm:p-5"
    >
      {/* Soft accent bloom in the corner — brightens on hover */}
      <span
        aria-hidden
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-soft opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <p className="relative font-mono text-2xl font-semibold tracking-tight tnum sm:text-3xl">
        {stat.prefix}
        {done ? stat.value : display}
        {stat.suffix}
      </p>
      <p className="relative mt-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}
