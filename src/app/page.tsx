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
        <div aria-hidden className="hero-backdrop no-print" />
        <TopBar />
        <main className="mx-auto max-w-6xl px-4 pb-32 sm:px-6">
          <Hero />
          <CareerTimeline />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
        </main>
        <footer className="no-print border-t border-border py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p>
                Designed and built by {profile.name} — Next.js, React, TypeScript, Tailwind, and
                the Anthropic API.
              </p>
              <p className="mt-1 font-mono text-xs">
                Tip: press <span className="text-foreground">⌘K</span> to search, or ask the AI
                anything about me.
              </p>
            </div>
            <a
              href="#top"
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition-colors hover:border-accent/40 hover:text-foreground"
            >
              Back to top ↑
            </a>
          </div>
        </footer>
        <CommandPalette />
        <ChatDock />
      </div>
    </DashboardProvider>
  );
}
