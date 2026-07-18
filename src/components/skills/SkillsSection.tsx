"use client";

import { useDashboard } from "@/components/shell/DashboardContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import type { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Renders the **bold** spans in a proof line — no markdown dependency. */
function renderProof(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  const { activeTag, setActiveTag } = useDashboard();
  const selected = activeTag !== null && skill.tags.includes(activeTag);
  const dimmed = activeTag !== null && !selected;

  return (
    <button
      type="button"
      onClick={() => setActiveTag(selected ? null : skill.tags[0])}
      title={selected ? "Clear highlight" : "See where this was earned"}
      className={cn(
        "rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-all duration-300",
        selected
          ? "border-accent bg-accent text-accent-foreground"
          : "hover:border-accent hover:text-accent",
        dimmed && "opacity-40"
      )}
    >
      {skill.name}
    </button>
  );
}

export function SkillsSection() {
  const { activeTag, setActiveTag } = useDashboard();

  return (
    <section className="mt-24">
      <SectionHeading
        id="skills"
        index="03"
        title="Skills"
        subtitle="Every skill is clickable — it lights up the roles and projects where it was earned."
      />
      <div className="space-y-4">
        {profile.skills.map((category, i) => (
          <Reveal key={category.category} delay={i * 60}>
            <div className="card-hover rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {category.category}
                </h3>
                {i === 0 && activeTag && (
                  <button
                    type="button"
                    onClick={() => setActiveTag(null)}
                    className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                  >
                    highlighting: {activeTag} ✕
                  </button>
                )}
              </div>
              {category.proof && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {renderProof(category.proof)}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
