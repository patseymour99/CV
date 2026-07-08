# Interactive CV Dashboard

A live, interactive CV for **Patrick Seymour** — built to be linked from the paper CV so interviewers can explore his background and see his product craft first-hand.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Anthropic SDK

## Features

- **Interactive career timeline** — hand-built SVG, no chart library; click any bar to jump to the full story
- **Cross-highlighting** — select a skill and the roles/projects that earned it stay lit while the rest fade
- **Command palette** — ⌘K / Ctrl+K to jump anywhere or ask the AI
- **Hybrid AI chat** — a streaming Claude-powered assistant grounded strictly in the CV's facts, with a hand-built client-side retrieval engine that takes over automatically if the API is unavailable. The link never breaks.
- **Dark/light theme**, no flash of the wrong mode
- **Printable route** — `/print` renders a classic single-page résumé from the same data; print straight to PDF

## Running locally

```bash
npm install
npm run dev
```

The chat works out of the box in offline mode. To enable the Claude-powered path, set:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

(locally in `.env.local`, or in your Vercel project's Environment Variables).

## Updating your CV

All personal content lives in exactly two files — no component changes are ever needed:

| File | Contains |
|---|---|
| `src/data/profile.ts` | Everything rendered on the page: experience, education, skills, projects, stats, contact |
| `src/data/knowledge.ts` | Everything the AI chat is allowed to say: fact chunks + suggested questions |

Edit those, and the dashboard, print view, chat system prompt, and offline engine all update together.

## Architecture notes

- `src/app/api/chat/route.ts` — streaming NDJSON proxy to Claude with input validation (message count/length caps), grounding + injection guardrails in the system prompt, and an immediate structured 503 when no API key is configured
- `src/lib/chat/useChat.ts` — client hook with automatic fallback: any failure before first text (503, rate limit, network, 8s timeout) switches the session to the local engine
- `src/lib/chat/localEngine.ts` — intent classification + idf-weighted retrieval over the knowledge base; only ever emits knowledge-base text, so it is injection-proof by construction
- `src/components/timeline/CareerTimeline.tsx` — custom SVG time scale with greedy lane packing, keyboard-accessible bars, and a validated colorblind-safe palette
