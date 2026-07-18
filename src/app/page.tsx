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
        <footer className="no-print border-t border-border py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{profile.name}</p>
              <p>
                Designed and built by hand — Next.js, React, TypeScript, Tailwind, and the
                Anthropic API.
              </p>
              <p className="font-mono text-xs">
                Tip: press <span className="text-foreground">⌘K</span> to search, or ask the AI
                anything about me.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              {profile.contact.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a href="#top" className="text-muted-foreground transition-colors hover:text-foreground">
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
        <CommandPalette />
        <ChatDock />
      </div>
    </DashboardProvider>
  );
}
