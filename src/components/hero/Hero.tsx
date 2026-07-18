"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { StatCounter } from "@/components/hero/StatCounter";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const CONTACT_ICONS = {
  email: Mail,
  phone: Phone,
} as const;

export function Hero() {
  const { openChat } = useDashboard();
  const currentRole = profile.experience.find((exp) => exp.end === null);
  const disciplines = profile.title.split("·").map((part) => part.trim());

  return (
    <section className="relative pt-14 sm:pt-20">
      <Reveal>
        {currentRole && (
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-card)]">
            <span
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-series-2"
              aria-hidden
            />
            Currently {currentRole.role} at {currentRole.company}
          </p>
        )}
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-accent sm:text-sm">
          {disciplines.map((discipline, i) => (
            <span key={discipline} className="inline-flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-accent/40" aria-hidden />}
              {discipline}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.summary}
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </span>
          {profile.contact.map((link) => {
            const Icon = CONTACT_ICONS[link.type as keyof typeof CONTACT_ICONS] ?? Mail;
            return (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openChat()}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-[var(--shadow-card)] transition-all hover:-translate-y-px hover:opacity-90 hover:shadow-[var(--shadow-card-hover)]"
          >
            <MessageCircle className="h-4 w-4" />
            Ask the AI about me
          </button>
          <a
            href="#experience"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Explore the CV
          </a>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
