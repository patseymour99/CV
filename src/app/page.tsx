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
      <div id="top">
        <TopBar />
        <main className="mx-auto max-w-6xl px-4 pb-32 sm:px-6">
          <Hero />
          <CareerTimeline />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
        </main>
        <footer className="no-print border-t border-border py-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 text-sm text-muted-foreground sm:px-6">
            <p>
              Designed and built by {profile.name} — Next.js, React, TypeScript, Tailwind, and the
              Anthropic API.
            </p>
            <p className="font-mono text-xs">
              Tip: press <span className="text-foreground">⌘K</span> to search, or ask the AI
              anything about me.
            </p>
          </div>
        </footer>
        <CommandPalette />
        <ChatDock />
      </div>
    </DashboardProvider>
  );
}
