"use client";

import { nextSuggestions } from "@/lib/chat/localEngine";

export function SuggestedQuestions({
  asked,
  count,
  onAsk,
}: {
  asked: string[];
  count: number;
  onAsk: (question: string) => void;
}) {
  const suggestions = nextSuggestions(asked, count);
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.label}
          type="button"
          onClick={() => onAsk(suggestion.question)}
          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}
