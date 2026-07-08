"use client";

import { Moon, Printer, Search, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { useTheme } from "@/components/shell/ThemeProvider";
import { Kbd } from "@/components/ui/Kbd";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Timeline", href: "#timeline" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

export function TopBar() {
  const { theme, toggle } = useTheme();
  const { openChat, setPaletteOpen } = useDashboard();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur transition-colors",
        scrolled && "border-border"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-mono text-xs text-accent-foreground">
            {initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Search</span>
            <Kbd>⌘K</Kbd>
          </button>
          <a
            href="/print"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Printable CV"
            title="Printable CV"
          >
            <Printer className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggle}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => openChat()}
            className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
            <span className="sm:hidden">Ask</span>
          </button>
        </div>
      </div>
    </header>
  );
}
