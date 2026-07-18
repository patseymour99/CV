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
    <div ref={ref} className="card relative overflow-hidden p-4 sm:p-5">
      {/* Accent hairline anchors the tile row without adding chrome */}
      <span
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent/60 via-accent/25 to-transparent"
        aria-hidden
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
