"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import type { Experience } from "@/lib/types";
import { cn, currentYearMonth, formatDuration, formatMonth, toYearFraction } from "@/lib/utils";

/** Fixed hue per employer — index in profile.experience, never re-ranked. */
const SERIES = ["var(--series-1)", "var(--series-2)", "var(--series-3)", "var(--series-4)", "var(--series-5)"];

const BAR_HEIGHT = 30;
const ROW_HEIGHT = 66; // label above + bar + breathing room
const AXIS_HEIGHT = 28;
const PAD_X = 8;

interface Placed {
  exp: Experience;
  color: string;
  lane: number;
  startYear: number;
  endYear: number;
  ongoing: boolean;
}

/** Greedy interval packing: first lane whose last bar ended before we start. */
function assignLanes(experience: Experience[]): Placed[] {
  const nowYear = toYearFraction(currentYearMonth());
  const items = experience
    .map((exp, i) => ({
      exp,
      color: SERIES[i % SERIES.length],
      startYear: toYearFraction(exp.start),
      endYear: exp.end ? toYearFraction(exp.end) : nowYear,
      ongoing: exp.end === null,
      lane: 0,
    }))
    .sort((a, b) => a.startYear - b.startYear);

  const laneEnds: number[] = [];
  for (const item of items) {
    let lane = laneEnds.findIndex((end) => end <= item.startYear + 0.01);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(0);
    }
    laneEnds[lane] = item.endYear;
    item.lane = lane;
  }
  return items;
}

interface Tooltip {
  x: number;
  y: number;
  exp: Experience;
}

export function CareerTimeline() {
  const { focusExperience, activeExperienceId } = useDashboard();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const placed = useMemo(() => assignLanes(profile.experience), []);
  const laneCount = Math.max(...placed.map((p) => p.lane)) + 1;
  const height = laneCount * ROW_HEIGHT + AXIS_HEIGHT;

  const minYear = Math.floor(Math.min(...placed.map((p) => p.startYear)));
  const maxYear = Math.ceil(Math.max(...placed.map((p) => p.endYear)));
  const innerWidth = Math.max(width - PAD_X * 2, 0);
  const x = (year: number) => PAD_X + ((year - minYear) / (maxYear - minYear)) * innerWidth;

  const years = useMemo(() => {
    const all = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    // Thin the labels when a year gets less than ~44px of track.
    const step = innerWidth / (maxYear - minYear) < 44 ? 2 : 1;
    return all.map((year) => ({ year, labeled: (year - minYear) % step === 0 }));
  }, [minYear, maxYear, innerWidth]);

  const showTooltip = (exp: Experience, barX: number, barY: number, barWidth: number) => {
    setTooltip({ x: barX + barWidth / 2, y: barY, exp });
  };

  return (
    <section className="mt-24">
      <SectionHeading
        id="timeline"
        index="01"
        title="Career timeline"
        subtitle="Every bar is clickable — it opens the full story below."
      />
      <Reveal>
        <div ref={containerRef} className="relative rounded-2xl border border-border bg-card p-4 sm:p-6">
          {width > 0 && (
            <svg
              width="100%"
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="list"
              aria-label="Career timeline"
              className="select-none"
            >
              {/* Year grid + axis */}
              {years.map(({ year, labeled }) => (
                <g key={year}>
                  <line
                    x1={x(year)}
                    x2={x(year)}
                    y1={0}
                    y2={height - AXIS_HEIGHT}
                    stroke="var(--border)"
                    strokeWidth={1}
                    strokeOpacity={0.6}
                  />
                  {labeled && (
                    <text
                      x={x(year)}
                      y={height - 8}
                      textAnchor="middle"
                      className="fill-muted-foreground font-mono tnum"
                      fontSize={11}
                    >
                      {year}
                    </text>
                  )}
                </g>
              ))}

              {/* Role bars */}
              {placed.map(({ exp, color, lane, startYear, endYear, ongoing }) => {
                const barX = x(startYear);
                const barWidth = Math.max(x(endYear) - barX, 6);
                const barY = lane * ROW_HEIGHT + 24;
                const active = activeExperienceId === exp.id;
                return (
                  <g
                    key={exp.id}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${exp.role} at ${exp.company}, ${formatMonth(exp.start)} to ${formatMonth(exp.end)}. Press Enter for details.`}
                    className="group cursor-pointer outline-none focus-visible:opacity-80"
                    onClick={() => focusExperience(exp.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        focusExperience(exp.id);
                      }
                    }}
                    onMouseEnter={() => showTooltip(exp, barX, barY, barWidth)}
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={() => showTooltip(exp, barX, barY, barWidth)}
                    onBlur={() => setTooltip(null)}
                  >
                    {/* Direct label — identity is never color-alone. On very
                        narrow tracks labels would collide; the legend below
                        and tooltips carry identity there instead. */}
                    {width >= 520 && (
                      <text
                        x={barX + 1}
                        y={barY - 7}
                        className="fill-foreground"
                        fontSize={12}
                        fontWeight={600}
                      >
                        {exp.company}
                      </text>
                    )}
                    <rect
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={BAR_HEIGHT}
                      rx={6}
                      fill={color}
                      opacity={active ? 1 : 0.85}
                      stroke={active ? "var(--foreground)" : "var(--card)"}
                      strokeWidth={active ? 1.5 : 2}
                      className="transition-opacity duration-200 group-hover:opacity-100"
                    />
                    {ongoing && (
                      <circle
                        cx={barX + barWidth - 8}
                        cy={barY + BAR_HEIGHT / 2}
                        r={3.5}
                        fill="var(--card)"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {/* Hover / focus tooltip */}
          {tooltip && (
            <div
              className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-card p-3 shadow-lg"
              style={{
                left: Math.min(Math.max(tooltip.x + 16, 120), Math.max(width - 120, 120)),
                top: tooltip.y + 16,
              }}
            >
              <p className="text-sm font-semibold">{tooltip.exp.company}</p>
              <p className="text-xs text-muted-foreground">{tooltip.exp.role}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground tnum">
                {formatMonth(tooltip.exp.start)} – {formatMonth(tooltip.exp.end)} ·{" "}
                {formatDuration(tooltip.exp.start, tooltip.exp.end)}
              </p>
              <p className="mt-1 text-[11px] text-accent">Click to expand ↓</p>
            </div>
          )}

          {/* Legend — color + name, also serving as quick-jump chips */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4">
            {placed
              .slice()
              .sort((a, b) => b.startYear - a.startYear)
              .map(({ exp, color }) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => focusExperience(exp.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
                    activeExperienceId === exp.id && "text-foreground"
                  )}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                  {exp.company}
                </button>
              ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
