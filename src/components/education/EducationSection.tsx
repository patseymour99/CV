import { Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function EducationSection() {
  return (
    <section className="mt-24">
      <SectionHeading
        id="education"
        index="05"
        title="Education & more"
        subtitle="Formal education, credentials, and the things that round out the picture."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="card-hover h-full rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <GraduationCap className="h-4 w-4" />
              </span>
              Education
            </h3>
            <ul className="space-y-5">
              {profile.education.map((edu) => (
                <li key={edu.id}>
                  <p className="text-sm font-semibold">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}
                    {edu.period && (
                      <span className="ml-2 font-mono text-xs tnum">{edu.period}</span>
                    )}
                  </p>
                  {edu.detail && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{edu.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="card-hover h-full rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Award className="h-4 w-4" />
              </span>
              Highlights
            </h3>
            <ul className="space-y-4">
              {profile.achievements.map((achievement) => (
                <li key={achievement.id} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-medium">
                      {achievement.title}
                      {achievement.year && (
                        <span className="ml-2 font-mono text-xs text-muted-foreground tnum">
                          {achievement.year}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">{achievement.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
