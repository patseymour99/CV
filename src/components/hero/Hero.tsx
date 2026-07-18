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

  return (
    <section className="pt-14 sm:pt-20">
      <Reveal>
        <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-accent sm:text-sm">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {profile.title}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
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
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-md shadow-accent/25 transition hover:opacity-90 active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" />
            Ask the AI about me
          </button>
          <a
            href="#experience"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:border-accent/40 hover:bg-muted active:scale-[0.98]"
          >
            Explore the CV
          </a>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
