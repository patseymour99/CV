"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  CornerDownLeft,
  FolderGit2,
  GraduationCap,
  Moon,
  Printer,
  Search,
  Sparkles,
  SquareGanttChart,
  Wrench,
} from "lucide-react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { useTheme } from "@/components/shell/ThemeProvider";
import { profile } from "@/data/profile";
import { suggestedQuestions } from "@/data/knowledge";
import { cn } from "@/lib/utils";

type ItemIcon = React.ComponentType<{ size?: number; className?: string }>;

interface PaletteItem {
  id: string;
  group: string;
  label: string;
  meta?: string;
  Icon: ItemIcon;
  run: () => void;
  keywords: string;
}

const GROUP_ORDER = ["Sections", "Experience", "Projects", "Skills", "Ask the AI", "Actions"];

function scrollToAnchor(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useDashboard();

  // Global hotkey: ⌘K / Ctrl+K toggles, wherever focus is.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  // Mounting fresh on each open resets query/selection without effects.
  if (!paletteOpen) return null;
  return <PalettePanel />;
}

function PalettePanel() {
  const { setPaletteOpen, focusExperience, openChat, setActiveTag } = useDashboard();
  const { toggle: toggleTheme, theme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = () => setPaletteOpen(false);

  const allItems = useMemo<PaletteItem[]>(() => {
    const sections: PaletteItem[] = [
      { id: "s-timeline", label: "Career timeline", anchor: "timeline" },
      { id: "s-experience", label: "Experience", anchor: "experience" },
      { id: "s-skills", label: "Skills", anchor: "skills" },
      { id: "s-projects", label: "Projects", anchor: "projects" },
      { id: "s-education", label: "Education & more", anchor: "education" },
    ].map(({ id, label, anchor }) => ({
      id,
      group: "Sections",
      label,
      Icon: SquareGanttChart,
      run: () => scrollToAnchor(anchor),
      keywords: label.toLowerCase(),
    }));

    const roles: PaletteItem[] = profile.experience.map((exp) => ({
      id: `e-${exp.id}`,
      group: "Experience",
      label: exp.company,
      meta: exp.role,
      Icon: Briefcase,
      run: () => focusExperience(exp.id),
      keywords: `${exp.company} ${exp.role} ${exp.tags.join(" ")}`.toLowerCase(),
    }));

    const projects: PaletteItem[] = profile.projects.map((project) => ({
      id: `p-${project.id}`,
      group: "Projects",
      label: project.name,
      meta: project.tech.join(" · "),
      Icon: FolderGit2,
      run: () => scrollToAnchor("projects"),
      keywords: `${project.name} ${project.tech.join(" ")} ${project.tags.join(" ")}`.toLowerCase(),
    }));

    const skills: PaletteItem[] = profile.skills.flatMap((category) =>
      category.skills.map((skill) => ({
        id: `k-${skill.name}`,
        group: "Skills",
        label: skill.name,
        meta: `Highlight where this was earned · ${category.category}`,
        Icon: Wrench,
        run: () => {
          setActiveTag(skill.tags[0]);
          scrollToAnchor("skills");
        },
        keywords: `${skill.name} ${category.category} ${skill.tags.join(" ")}`.toLowerCase(),
      }))
    );

    const questions: PaletteItem[] = suggestedQuestions.map((sq) => ({
      id: `q-${sq.label}`,
      group: "Ask the AI",
      label: sq.question,
      Icon: Sparkles,
      run: () => openChat(sq.question),
      keywords: `${sq.label} ${sq.question} ask ai chat question`.toLowerCase(),
    }));

    const actions: PaletteItem[] = [
      {
        id: "a-theme",
        group: "Actions",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        Icon: Moon,
        run: toggleTheme,
        keywords: "theme dark light mode toggle switch",
      },
      {
        id: "a-print",
        group: "Actions",
        label: "Open printable CV",
        meta: "Classic single-page layout, PDF-ready",
        Icon: Printer,
        run: () => {
          window.location.href = "/print";
        },
        keywords: "print pdf download resume cv classic export",
      },
      {
        id: "a-education",
        group: "Actions",
        label: "Contact details",
        meta: profile.contact[0]?.label,
        Icon: GraduationCap,
        run: () => scrollToAnchor("top"),
        keywords: "contact email phone reach",
      },
    ];

    return [...sections, ...roles, ...projects, ...skills, ...questions, ...actions];
  }, [focusExperience, openChat, setActiveTag, theme, toggleTheme]);

  const results = useMemo<PaletteItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [
        ...allItems.filter((item) => item.group === "Sections"),
        ...allItems.filter((item) => item.group === "Ask the AI").slice(0, 3),
        ...allItems.filter((item) => item.group === "Actions").slice(0, 2),
      ];
    }
    const terms = q.split(/\s+/).filter(Boolean);
    const matched = allItems.filter((item) => terms.every((term) => item.keywords.includes(term)));
    const grouped: PaletteItem[] = [];
    for (const group of GROUP_ORDER) {
      grouped.push(...matched.filter((item) => item.group === group).slice(0, 5));
    }
    const list = grouped.slice(0, 16);
    // Anything can be asked — turn a miss (or any query) into an AI question.
    list.push({
      id: "q-freeform",
      group: "Ask the AI",
      label: `Ask the AI: “${query.trim()}”`,
      Icon: Sparkles,
      run: () => openChat(query.trim()),
      keywords: q,
    });
    return list;
  }, [query, allItems, openChat]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Guard against results shrinking below the current selection.
  const activeIndex = Math.min(active, results.length - 1);

  function select(item: PaletteItem | undefined) {
    if (!item) return;
    close();
    item.run();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(results[activeIndex]);
    } else if (event.key === "Escape") {
      close();
    }
  }

  let lastGroup = "";

  return (
    <div
      className="no-print fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-[2px]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-pop)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, role, or skill — or ask anything…"
            className="w-full bg-transparent py-3.5 text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 items-center rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-1.5">
          {results.map((item, i) => {
            const showHeader = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {showHeader && (
                  <p className="px-4 pb-1 pt-2.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  data-index={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => select(item)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left",
                    i === activeIndex ? "bg-accent-soft" : "hover:bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                      i === activeIndex ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <item.Icon size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    {item.meta && (
                      <span className="block truncate text-[11px] text-muted-foreground">{item.meta}</span>
                    )}
                  </span>
                  {i === activeIndex && <CornerDownLeft size={13} className="shrink-0 text-accent" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-muted/60 px-4 py-2 text-[10px] text-muted-foreground">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
          <span className="ml-auto font-mono">{profile.name} · interactive CV</span>
        </div>
      </div>
    </div>
  );
}
