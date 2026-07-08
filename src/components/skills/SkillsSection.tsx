"use client";

import { useState } from "react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import type { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

const LEVEL_LABELS = ["", "Familiar", "Working", "Proficient", "Advanced", "Expert"];

function SkillRow({ skill }: { skill: Skill }) {
  const { activeTag, setActiveTag } = useDashboard();
  const selected = activeTag !== null && skill.tags.includes(activeTag);
  const dimmed = activeTag !== null && !selected;

  return (
    <button
      type="button"
      onClick={() => setActiveTag(selected ? null : skill.tags[0])}
      title={
        selected
          ? "Clear highlight"
          : "Highlight the roles and projects that use this skill"
      }
      className={cn(
        "w-full rounded-lg px-3 py-2 text-left transition-all duration-300 hover:bg-muted",
        selected && "bg-accent-soft",
        dimmed && "opacity-40"
      )}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          {LEVEL_LABELS[skill.level]}
        </span>
      </span>
      {/* 5-segment proficiency bar, 2px gaps between segments */}
      <span className="mt-1.5 flex gap-0.5" aria-label={`${LEVEL_LABELS[skill.level]}, ${skill.level} of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i < skill.level ? "bg-accent" : "bg-muted"
            )}
          />
        ))}
      </span>
    </button>
  );
}

export function SkillsSection() {
  const { activeTag, setActiveTag } = useDashboard();
  const categories = profile.skills.map((c) => c.category);
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? profile.skills.filter((c) => c.category === filter) : profile.skills;

  return (
    <section className="mt-24">
      <SectionHeading
        id="skills"
        index="03"
        title="Skills"
        subtitle="Click any skill to light up where it was earned — matching roles and projects stay lit, the rest fade."
      />
      <Reveal>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={cn(
              "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
              filter === null ? "border-accent bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(filter === category ? null : category)}
              className={cn(
                "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
                filter === category
                  ? "border-accent bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
          {activeTag && (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="ml-auto rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
            >
              highlighting: {activeTag} ✕
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((category) => (
            <div key={category.category} className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-2 px-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {category.category}
              </h3>
              <div className="space-y-1">
                {category.skills.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
