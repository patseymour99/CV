import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/chat/systemPrompt";
import type { ChatMessage, ChatStreamEvent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 16;
const MAX_MESSAGE_CHARS = 2000;

/** Validates and clamps untrusted visitor input before it reaches the model. */
function sanitizeMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim() === "") return null;
    messages.push({ role, content: content.slice(0, MAX_MESSAGE_CHARS) });
  }

  if (messages[0].role !== "user") messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function jsonError(status: number, error: string): Response {
  return Response.json({ error }, { status });
}

/** Streams the assistant's reply as newline-delimited JSON ChatStreamEvents. */
export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    // Structured, immediate failure — the client falls back to its
    // local retrieval engine and the chat keeps working.
    return jsonError(503, "chat_unavailable");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "invalid_json");
  }

  const messages = sanitizeMessages(body);
  if (!messages) {
    return jsonError(400, "invalid_messages");
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();
  const send = (controller: ReadableStreamDefaultController, event: ChatStreamEvent) =>
    controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream(
          {
            model: "claude-opus-4-8",
            max_tokens: 1024,
            system: [
              {
                type: "text",
                text: SYSTEM_PROMPT,
                cache_control: { type: "ephemeral" },
              },
            ],
            messages,
          },
          { signal: request.signal }
        );

        for await (const event of claudeStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            send(controller, { type: "delta", text: event.delta.text });
          }
        }
        send(controller, { type: "done" });
      } catch (e) {
        console.error("chat route:", e);
        try {
          // Generic message only — upstream details stay in the server log.
          send(controller, { type: "error", message: "chat_failed" });
        } catch {
          // Stream already closed by an aborted request — nothing to send.
        }
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
