import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { formatMonth } from "@/lib/utils";
import { PrintActions } from "@/components/shell/PrintActions";

export const metadata: Metadata = {
  title: `${profile.name} — CV`,
  description: `Printable CV for ${profile.name}.`,
};

/** Classic single-column résumé from the same data as the dashboard. */
export default function PrintPage() {
  const email = profile.contact.find((c) => c.type === "email");
  const phone = profile.contact.find((c) => c.type === "phone");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      <PrintActions />

      <header className="border-b border-border pb-5">
        <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{profile.title}</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {profile.location}
          {email && <> · {email.label}</>}
          {phone && <> · {phone.label}</>}
        </p>
      </header>

      <section className="mt-6">
        <p className="text-sm leading-relaxed">{profile.summary}</p>
      </section>

      <section className="mt-7">
        <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Professional experience
        </h2>
        <div className="space-y-5">
          {profile.experience.map((exp) => (
            <article key={exp.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-semibold">
                  {exp.role} — {exp.company}
                  {exp.location && <span className="font-normal text-muted-foreground">, {exp.location}</span>}
                </h3>
                <span className="font-mono text-xs text-muted-foreground tnum">
                  {formatMonth(exp.start)} – {formatMonth(exp.end)}
                </span>
              </div>
              <ul className="mt-1.5 space-y-1 pl-4">
                {exp.highlights.map((highlight) => (
                  <li key={highlight.text} className="list-disc text-sm leading-relaxed">
                    {highlight.text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 break-inside-avoid">
        <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Education
        </h2>
        <div className="space-y-3">
          {profile.education.map((edu) => (
            <div key={edu.id}>
              <p className="text-sm font-semibold">
                {edu.institution}
                {edu.period && (
                  <span className="ml-2 font-mono text-xs font-normal text-muted-foreground tnum">{edu.period}</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{edu.degree}</p>
              {edu.detail && <p className="text-sm text-muted-foreground">{edu.detail}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 break-inside-avoid">
        <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Skills
        </h2>
        <div className="space-y-1.5">
          {profile.skills.map((category) => (
            <p key={category.category} className="text-sm">
              <span className="font-semibold">{category.category}:</span>{" "}
              {category.skills.map((skill) => skill.name).join(" · ")}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-7 break-inside-avoid">
        <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Additional
        </h2>
        <ul className="space-y-1 pl-4">
          {profile.achievements.map((achievement) => (
            <li key={achievement.id} className="list-disc text-sm leading-relaxed">
              <span className="font-medium">{achievement.title}.</span> {achievement.detail}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
