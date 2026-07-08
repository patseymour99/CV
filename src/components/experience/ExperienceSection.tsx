"use client";

import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

/** Same fixed employer→hue mapping as the timeline. */
const SERIES = ["var(--series-1)", "var(--series-2)", "var(--series-3)", "var(--series-4)", "var(--series-5)"];

export function ExperienceSection() {
  return (
    <section className="mt-24">
      <SectionHeading
        id="experience"
        index="02"
        title="Experience"
        subtitle="Click a role to expand the full impact story. Selecting a skill below dims roles that don't use it."
      />
      <div className="space-y-4">
        {profile.experience.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 60}>
            <ExperienceCard exp={exp} color={SERIES[i % SERIES.length]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
