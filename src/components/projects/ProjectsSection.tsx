"use client";

import { ArrowUpRight } from "lucide-react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { activeTag } = useDashboard();

  return (
    <section className="mt-24">
      <SectionHeading
        id="projects"
        index="04"
        title="Projects"
        subtitle="Things built, shipped, and owned — including the site you're reading."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {profile.projects.map((project, i) => {
          const dimmed = activeTag !== null && !project.tags.includes(activeTag);
          return (
            <Reveal key={project.id} delay={i * 60}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-opacity duration-300 sm:p-6",
                  dimmed && "opacity-35"
                )}
              >
                <h3 className="flex items-start justify-between gap-2 text-base font-semibold tracking-tight">
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.name}`}
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.impact && (
                  <p className="mt-3 font-mono text-xs font-medium text-accent">{project.impact}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
