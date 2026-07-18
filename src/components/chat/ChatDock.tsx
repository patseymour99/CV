"use client";

import { MessageCircle, RotateCcw, Send, WifiOff, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDashboard } from "@/components/shell/DashboardContext";
import { ChatMessageBubble } from "@/components/chat/ChatMessage";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";
import { useChat } from "@/lib/chat/useChat";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ChatDock() {
  const { chatOpen, openChat, closeChat, queuedQuestion, consumeQueuedQuestion } = useDashboard();
  const { messages, status, engine, send, reset } = useChat();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // A question queued from the hero, palette, or a suggestion chip.
  useEffect(() => {
    if (chatOpen && queuedQuestion) {
      consumeQueuedQuestion();
      send(queuedQuestion);
    }
  }, [chatOpen, queuedQuestion, consumeQueuedQuestion, send]);

  useEffect(() => {
    if (chatOpen) requestAnimationFrame(() => inputRef.current?.focus());
  }, [chatOpen]);

  // Keep the newest message in view while streaming.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  const submit = () => {
    const question = input.trim();
    if (!question) return;
    setInput("");
    send(question);
  };

  const asked = messages.filter((m) => m.role === "user").map((m) => m.content);

  return (
    <div className="no-print">
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => (chatOpen ? closeChat() : openChat())}
        aria-label={chatOpen ? "Close chat" : "Ask AI about me"}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-accent p-4 text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:scale-105 active:scale-95",
          chatOpen && "max-sm:hidden"
        )}
      >
        {chatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Panel — fixed card on desktop, full-screen sheet on mobile */}
      {chatOpen && (
        <div
          role="dialog"
          aria-label={`Chat with ${profile.name}'s CV assistant`}
          className="fixed inset-0 z-40 flex flex-col border-border bg-card shadow-2xl sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(600px,75vh)] sm:w-[380px] sm:rounded-2xl sm:border"
        >
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent">
              AI
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">Ask about {profile.name.split(" ")[0]}</p>
              <p className="text-[11px] text-muted-foreground">
                {engine === "local" ? "Offline mode — local retrieval engine" : "Grounded in this CV · powered by Claude"}
              </p>
            </div>
            {engine === "local" && (
              <span title="API unavailable — answering from the built-in engine">
                <WifiOff className="h-4 w-4 shrink-0 text-muted-foreground" />
              </span>
            )}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={reset}
                aria-label="Clear conversation"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  I answer questions about {profile.name} — his experience, the AI platform he&apos;s
                  building at BlackRock, his skills, and more. Everything is grounded in this CV.
                </p>
                <SuggestedQuestions asked={asked} count={4} onAsk={send} />
              </div>
            )}
            {messages.map((message, i) => (
              <ChatMessageBubble
                key={i}
                message={message}
                streaming={status === "streaming" && i === messages.length - 1}
              />
            ))}
            {messages.length > 0 && status === "idle" && (
              <SuggestedQuestions asked={asked} count={3} onAsk={send} />
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                rows={1}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                placeholder="Ask anything about his background…"
                className="max-h-28 min-h-10 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={submit}
                disabled={status === "streaming" || input.trim() === ""}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center font-mono text-[10px] text-muted-foreground">
              Answers only from CV facts — nothing invented.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
