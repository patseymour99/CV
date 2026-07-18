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
        <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-xs text-accent shadow-card sm:text-sm">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {profile.title}
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.summary}
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </span>
          {profile.contact.map((link) => {
            const Icon = CONTACT_ICONS[link.type as keyof typeof CONTACT_ICONS] ?? Mail;
            return (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openChat()}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:-translate-y-px hover:opacity-90 hover:shadow-accent/35"
          >
            <MessageCircle className="h-4 w-4" />
            Ask the AI about me
          </button>
          <a
            href="#experience"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-card transition-all hover:-translate-y-px hover:border-accent/40 hover:bg-muted"
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
