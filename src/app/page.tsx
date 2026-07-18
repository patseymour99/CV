import { DashboardProvider } from "@/components/shell/DashboardContext";
import { TopBar } from "@/components/shell/TopBar";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Hero } from "@/components/hero/Hero";
import { CareerTimeline } from "@/components/timeline/CareerTimeline";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ChatDock } from "@/components/chat/ChatDock";
import { profile } from "@/data/profile";

export default function Page() {
  return (
    <DashboardProvider>
      <div id="top" className="relative">
        <div className="hero-canvas no-print" aria-hidden />
        <TopBar />
        <main className="relative mx-auto max-w-6xl px-4 pb-32 sm:px-6">
          <Hero />
          <CareerTimeline />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
        </main>
        <footer className="no-print border-t border-border py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              Designed and built by <span className="font-medium text-foreground">{profile.name}</span> —
              Next.js, React, TypeScript, Tailwind, and the Anthropic API.
            </p>
            <p className="shrink-0 font-mono text-xs">
              <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-foreground">⌘K</span>{" "}
              to search · ask the AI anything
            </p>
          </div>
        </footer>
        <CommandPalette />
        <ChatDock />
      </div>
    </DashboardProvider>
  );
}
