import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/types";

/**
 * Hand-rolled mini renderer for the assistant's constrained output style:
 * paragraphs, "-" bullets, and **bold** — no markdown dependency.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-${i}`} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function renderBlocks(content: string): React.ReactNode {
  const blocks = content.split(/\n{2,}/);
  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n");
    const isList = lines.every((line) => /^\s*-\s+/.test(line) || line.trim() === "");
    if (isList && lines.some((line) => line.trim() !== "")) {
      return (
        <ul key={blockIndex} className="my-1 space-y-1 pl-4">
          {lines
            .filter((line) => line.trim() !== "")
            .map((line, lineIndex) => (
              <li key={lineIndex} className="list-disc">
                {renderInline(line.replace(/^\s*-\s+/, ""), `${blockIndex}-${lineIndex}`)}
              </li>
            ))}
        </ul>
      );
    }
    return (
      <p key={blockIndex} className="my-1 whitespace-pre-wrap">
        {renderInline(block, `${blockIndex}`)}
      </p>
    );
  });
}

export function ChatMessageBubble({
  message,
  streaming = false,
}: {
  message: ChatMessageType;
  streaming?: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          isUser ? "rounded-br-md bg-accent text-accent-foreground" : "rounded-bl-md bg-muted"
        )}
      >
        {message.content === "" && streaming ? (
          <span className="inline-flex gap-1 py-1" aria-label="Assistant is typing">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
          </span>
        ) : (
          renderBlocks(message.content)
        )}
      </div>
    </div>
  );
}
