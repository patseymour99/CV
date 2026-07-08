import { knowledge, suggestedQuestions } from "@/data/knowledge";
import { profile } from "@/data/profile";
import type { KnowledgeChunk, Topic } from "@/lib/types";

/**
 * Client-side retrieval engine — the chat's automatic fallback when the
 * Claude API route is unavailable (no key, rate limit, network failure).
 *
 * Intent classification + tf-idf-ish keyword scoring over the knowledge
 * base, with per-intent answer templates. It only ever emits text from
 * the knowledge base, which makes it injection-proof by construction.
 */

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "do", "does",
  "did", "have", "has", "had", "will", "would", "can", "could", "should",
  "what", "whats", "which", "who", "whos", "how", "hows", "when", "where",
  "why", "tell", "me", "about", "his", "her", "he", "she", "it", "its",
  "of", "to", "in", "on", "for", "with", "and", "or", "at", "by", "from",
  "you", "your", "i", "my", "please", "some", "any", "more", "does",
  "patrick", "seymour", "mr",
]);

function stem(word: string): string {
  if (word.length <= 3) return word;
  return word
    .replace(/(ing|edly|ed|es)$/u, "")
    .replace(/(?<=[a-z]{3})s$/u, "");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s$%.-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word))
    .map(stem);
}

/* ── Precomputed index (module load, ~20 chunks — negligible cost) ── */

interface IndexedChunk {
  chunk: KnowledgeChunk;
  terms: Set<string>;
}

const index: IndexedChunk[] = knowledge.map((chunk) => ({
  chunk,
  terms: new Set([...tokenize(chunk.text), ...chunk.keywords.map(stem)]),
}));

const documentFrequency = new Map<string, number>();
for (const { terms } of index) {
  for (const term of terms) {
    documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
  }
}

function idf(term: string): number {
  const df = documentFrequency.get(term);
  if (!df) return 0;
  return Math.log(1 + index.length / df);
}

/* ── Intent classification ─────────────────────────────────────────── */

type Intent = Topic | "greeting" | "meta" | "unknown";

const INTENT_PATTERNS: Array<[Intent, RegExp]> = [
  ["greeting", /^(hi|hey|hello|yo|good (morning|afternoon|evening)|howdy)\b/i],
  ["meta", /\b(what can (i|you)|how do(es)? (this|the chat|you) work|what is this|help)\b/i],
  ["contact", /\b(contact|email|phone|reach|call|touch|connect|interview|meet)\b/i],
  ["availability", /\b(available|availability|looking for|open to|hiring|notice period|start date|fit for|why (should|would).*(hire|good))\b/i],
  ["education", /\b(education|degree|university|college|school|study|studied|thesis|grades?|academic)\b/i],
  ["projects", /\b(project|built|build|asimov|dashboard|site|website|portfolio|startup|achillbox)\b/i],
  ["skills", /\b(skills?|stack|tools?|technolog|proficien|languages?|sql|vba|tableau|python|coding|technical|prompt)\b/i],
  ["achievements", /\b(achieve|award|highlight|accomplish|proud|certification|mifid)\b/i],
  ["personal", /\b(hobbies|hobby|interests?|volunteer|tennis|chess|fun|outside work|personal|nepal|cambodia|languages)\b/i],
  ["experience", /\b(experience|work(ed)?|role|job|career|blackrock|gain(\.\w+)?|morgan|stanley|bai|etf|company|companies|employer|history|do(es)? .*(now|currently)|current)\b/i],
  ["summary", /\b(who is|about|overview|summary|background|introduce|elevator|profile)\b/i],
];

function classify(question: string): Intent {
  for (const [intent, pattern] of INTENT_PATTERNS) {
    if (pattern.test(question)) return intent;
  }
  return "unknown";
}

/* ── Retrieval ─────────────────────────────────────────────────────── */

const MIN_SCORE = 1.2;

function retrieve(question: string, intent: Intent, limit: number): KnowledgeChunk[] {
  const queryTerms = tokenize(question);
  const scored = index
    .map(({ chunk, terms }) => {
      let score = 0;
      for (const term of queryTerms) {
        if (terms.has(term)) score += idf(term);
      }
      if (chunk.topic === intent) score += 2;
      // Exact keyword phrase in the raw question is a strong signal.
      const lower = question.toLowerCase();
      if (chunk.keywords.some((keyword) => keyword.length > 3 && lower.includes(keyword))) {
        score += 1.5;
      }
      return { chunk, score };
    })
    .filter(({ score }) => score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ chunk }) => chunk);
}

/* ── Answer composition ────────────────────────────────────────────── */

/** Deterministic per-question variation so repeats don't read identically. */
function pick<T>(options: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return options[Math.abs(hash) % options.length];
}

const CONNECTORS = ["Beyond that, ", "Also worth knowing: ", "Related to that, "];

const email = profile.contact.find((c) => c.type === "email")?.label ?? "";

function refusal(seed: string): string {
  const suggestions = [...suggestedQuestions]
    .sort((a, b) => pick([-1, 1], seed + a.label) - pick([-1, 1], seed + b.label))
    .slice(0, 2)
    .map((s) => `"${s.question}"`)
    .join(" or ");
  return `That's outside what this CV covers — I can only speak to ${profile.name}'s background, skills, and experience. Try asking ${suggestions}, or reach him directly at ${email}.`;
}

export function answerLocally(question: string): string {
  const trimmed = question.trim();
  const intent = classify(trimmed);

  if (intent === "greeting") {
    return `Hello! I'm the assistant on ${profile.name}'s interactive CV. Ask me about his experience, the AI platform he's building, his skills, education, or how to get in touch.`;
  }
  if (intent === "meta") {
    return `I answer questions about ${profile.name} using the facts on this CV — experience, projects like Asimov, skills, and education. Normally I run on Claude via a streaming API; right now I'm running in the built-in offline mode, so answers come from a local retrieval engine instead. Ask away.`;
  }

  const chunks = retrieve(trimmed, intent, 3);
  if (chunks.length === 0) {
    return refusal(trimmed);
  }

  const [first, ...rest] = chunks;
  let answer = first.text;
  if (rest.length > 0 && answer.length < 400) {
    answer += `\n\n${pick(CONNECTORS, trimmed)}${rest[0].text}`;
  }
  return answer;
}

/** Chips shown in the chat UI; excludes ones already asked. */
export function nextSuggestions(asked: string[], count: number) {
  return suggestedQuestions.filter((s) => !asked.includes(s.question)).slice(0, count);
}
