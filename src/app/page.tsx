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
import { Kbd } from "@/components/ui/Kbd";
import { profile } from "@/data/profile";

export default function Page() {
  return (
    <DashboardProvider>
      <div id="top" className="relative">
        <div className="hero-backdrop no-print" aria-hidden />
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
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-xs font-semibold text-accent-foreground">
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{profile.name}</p>
                <p className="text-xs">
                  Designed and built with Next.js, React, TypeScript, Tailwind, and the Anthropic
                  API.
                </p>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Press <Kbd>⌘K</Kbd> to search — or ask the AI anything about me.
            </p>
          </div>
        </footer>
        <CommandPalette />
        <ChatDock />
      </div>
    </DashboardProvider>
  );
}
