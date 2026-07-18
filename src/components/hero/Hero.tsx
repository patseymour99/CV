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
    <section className="relative pt-16 sm:pt-24">
      <div className="hero-backdrop -inset-x-8 -top-24" aria-hidden />
      <Reveal>
        <p className="font-mono text-xs tracking-wide text-accent sm:text-sm">{profile.title}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[var(--shadow-card-hover)]"
          >
            <MessageCircle className="h-4 w-4" />
            Ask the AI about me
          </button>
          <a
            href="#experience"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-[var(--shadow-card-hover)]"
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
