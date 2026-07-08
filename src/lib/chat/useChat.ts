"use client";

import { useCallback, useRef, useState } from "react";
import { answerLocally } from "@/lib/chat/localEngine";
import type { ChatMessage, ChatStreamEvent } from "@/lib/types";

export type ChatStatus = "idle" | "streaming";
export type ChatEngine = "claude" | "local";

const FIRST_BYTE_TIMEOUT_MS = 8000;

/**
 * Hybrid chat hook. Tries the streaming Claude route first; on any failure
 * before text arrives (no API key → 503, rate limit, network error, first-byte
 * timeout) it answers with the client-side retrieval engine and stays in
 * local mode for the rest of the session. Local answers are typed out
 * word-by-word so both paths feel identical.
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [engine, setEngine] = useState<ChatEngine>("claude");
  const abortRef = useRef<AbortController | null>(null);
  const localTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const appendToLast = useCallback((text: string) => {
    setMessages((prev) => {
      const next = prev.slice();
      const last = next[next.length - 1];
      next[next.length - 1] = { ...last, content: last.content + text };
      return next;
    });
  }, []);

  const streamLocalAnswer = useCallback(
    (question: string, onDone: () => void) => {
      const words = answerLocally(question).split(/(\s+)/);
      let i = 0;
      localTimerRef.current = setInterval(() => {
        if (i >= words.length) {
          if (localTimerRef.current) clearInterval(localTimerRef.current);
          localTimerRef.current = null;
          onDone();
          return;
        }
        appendToLast(words[i]);
        i += 1;
      }, 18);
    },
    [appendToLast]
  );

  const send = useCallback(
    async (question: string) => {
      const content = question.trim();
      if (!content || status === "streaming") return;

      const history: ChatMessage[] = [...messages, { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setStatus("streaming");

      const finish = () => setStatus("idle");
      const fallBack = () => {
        setEngine("local");
        streamLocalAnswer(content, finish);
      };

      if (engine === "local") {
        streamLocalAnswer(content, finish);
        return;
      }

      const abort = new AbortController();
      abortRef.current = abort;
      const firstByteTimer = setTimeout(() => abort.abort(), FIRST_BYTE_TIMEOUT_MS);

      let receivedText = false;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abort.signal,
        });

        if (!res.ok || !res.body) {
          clearTimeout(firstByteTimer);
          fallBack();
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          clearTimeout(firstByteTimer);
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            let event: ChatStreamEvent;
            try {
              event = JSON.parse(line) as ChatStreamEvent;
            } catch {
              continue;
            }
            if (event.type === "delta") {
              receivedText = true;
              appendToLast(event.text);
            } else if (event.type === "error" && !receivedText) {
              fallBack();
              return;
            }
          }
        }

        if (!receivedText) {
          // Stream closed without any text — treat as a failure.
          fallBack();
          return;
        }
        finish();
      } catch {
        clearTimeout(firstByteTimer);
        if (!receivedText) {
          fallBack();
        } else {
          // Died mid-answer after partial text: end gracefully, stay on Claude.
          appendToLast(" …");
          finish();
        }
      }
    },
    [messages, status, engine, appendToLast, streamLocalAnswer]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    if (localTimerRef.current) clearInterval(localTimerRef.current);
    localTimerRef.current = null;
    setMessages([]);
    setStatus("idle");
  }, []);

  return { messages, status, engine, send, reset };
}
