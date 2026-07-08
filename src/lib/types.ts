/**
 * Data contract for the CV dashboard.
 *
 * Everything rendered on the site — and everything the AI chat is allowed
 * to say — derives from `src/data/profile.ts` and `src/data/knowledge.ts`,
 * which are the only files to edit when the CV changes.
 */

export interface Profile {
  name: string;
  /** Short positioning line, e.g. "AI Go-To-Market · Product Strategy". */
  title: string;
  location: string;
  /** 2–3 sentence hero pitch. */
  summary: string;
  contact: ContactLink[];
  stats: Stat[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  achievements: Achievement[];
}

export interface ContactLink {
  type: "email" | "phone" | "github" | "linkedin" | "website";
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  /** Numeric part, animated on first view. */
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  /** "YYYY-MM". Drives the timeline scale. */
  start: string;
  /** "YYYY-MM", or null for a current role. */
  end: string | null;
  /** One-liner shown when the card is collapsed. */
  summary: string;
  highlights: Highlight[];
  /** Shared vocabulary with skills/projects — powers cross-highlighting. */
  tags: string[];
}

export interface Highlight {
  text: string;
  /** Key figure pulled out of the bullet, rendered in bold mono. */
  metric?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  /** Display period, e.g. "2018 – 2022". Optional when not public. */
  period?: string;
  detail?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  /** 1 (familiar) – 5 (expert). Rendered as a 5-segment bar. */
  level: 1 | 2 | 3 | 4 | 5;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  impact?: string;
  tech: string[];
  link?: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  year?: string;
}

/* ── Chat knowledge base ─────────────────────────────────────────── */

export type Topic =
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "achievements"
  | "contact"
  | "availability"
  | "personal";

export interface KnowledgeChunk {
  id: string;
  topic: Topic;
  /** A self-contained fact the assistant may state verbatim. */
  text: string;
  /** Lowercase retrieval keywords for the local engine. */
  keywords: string[];
}

export interface SuggestedQuestion {
  /** Short chip label. */
  label: string;
  /** Full question sent to the engine. */
  question: string;
}

/* ── Chat runtime ────────────────────────────────────────────────── */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** NDJSON events streamed by /api/chat. */
export type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };
