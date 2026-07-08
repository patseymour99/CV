"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface DashboardState {
  /** Experience card currently expanded (timeline ↔ cards are linked). */
  activeExperienceId: string | null;
  setActiveExperienceId: (id: string | null) => void;
  /** Focuses an experience: expands its card and scrolls it into view. */
  focusExperience: (id: string) => void;

  /** Skill tag being hovered/selected — dims non-matching cards. */
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;

  chatOpen: boolean;
  /** Opens the chat dock, optionally pre-filling a question to send. */
  openChat: (question?: string) => void;
  closeChat: () => void;
  /** One-shot question queued by openChat; the dock consumes it. */
  queuedQuestion: string | null;
  consumeQueuedQuestion: () => void;

  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardState | null>(null);

export function useDashboard(): DashboardState {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [queuedQuestion, setQueuedQuestion] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const focusExperience = useCallback((id: string) => {
    setActiveExperienceId(id);
    // Defer so the card has expanded before we measure its position.
    requestAnimationFrame(() => {
      document.getElementById(`experience-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const openChat = useCallback((question?: string) => {
    if (question) setQueuedQuestion(question);
    setChatOpen(true);
  }, []);

  const closeChat = useCallback(() => setChatOpen(false), []);
  const consumeQueuedQuestion = useCallback(() => setQueuedQuestion(null), []);

  const value = useMemo(
    () => ({
      activeExperienceId,
      setActiveExperienceId,
      focusExperience,
      activeTag,
      setActiveTag,
      chatOpen,
      openChat,
      closeChat,
      queuedQuestion,
      consumeQueuedQuestion,
      paletteOpen,
      setPaletteOpen,
    }),
    [activeExperienceId, focusExperience, activeTag, chatOpen, openChat, closeChat, queuedQuestion, consumeQueuedQuestion, paletteOpen]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}
