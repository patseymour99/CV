"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { Badge } from "@/components/ui/Badge";
import type { Experience } from "@/lib/types";
import { cn, formatDuration, formatMonth } from "@/lib/utils";

export function ExperienceCard({ exp, color }: { exp: Experience; color: string }) {
  const { activeExperienceId, setActiveExperienceId, activeTag } = useDashboard();
  const expanded = activeExperienceId === exp.id;
  const dimmed = activeTag !== null && !exp.tags.includes(activeTag);

  return (
    <article
      id={`experience-${exp.id}`}
      className={cn(
        "card relative scroll-mt-24 overflow-hidden transition-[opacity,box-shadow] duration-300 hover:shadow-[var(--shadow-card-hover)]",
        expanded && "shadow-[var(--shadow-card-hover)]",
        dimmed && "opacity-35"
      )}
    >
      {/* Employer hue rail — spans the full card height */}
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: color }}
        aria-hidden
      />
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setActiveExperienceId(expanded ? null : exp.id)}
        className="flex w-full items-start gap-4 p-5 pl-6 text-left sm:p-6 sm:pl-7"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-lg font-semibold tracking-tight">{exp.company}</span>
            <span className="text-sm text-muted-foreground">{exp.role}</span>
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground tnum">
            <span>
              {formatMonth(exp.start)} – {formatMonth(exp.end)}
            </span>
            <span>{formatDuration(exp.start, exp.end)}</span>
            {exp.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {exp.location}
              </span>
            )}
          </span>
          <span className="mt-2 block text-sm text-muted-foreground">{exp.summary}</span>
        </span>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>

      {/* Height animation via the grid-rows 0fr→1fr trick — no measuring. */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 sm:px-7 sm:pb-6">
            <ul className="space-y-3">
              {exp.highlights.map((highlight) => (
                <li key={highlight.text} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    {highlight.text}
                    {highlight.metric && (
                      <span className="ml-2 whitespace-nowrap rounded bg-accent-soft px-1.5 py-0.5 font-mono text-xs font-semibold text-accent tnum">
                        {highlight.metric}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.tags.map((tag) => (
                <Badge key={tag} active={activeTag === tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
