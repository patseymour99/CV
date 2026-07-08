import { cn } from "@/lib/utils";

export function Badge({
  children,
  active = false,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors",
        active && "border-accent bg-accent-soft text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
