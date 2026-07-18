export function SectionHeading({
  id,
  index,
  title,
  subtitle,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft font-mono text-xs font-semibold text-accent tnum">
          {index}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <span
          className="ml-2 h-px min-w-8 flex-1 bg-gradient-to-r from-border to-transparent"
          aria-hidden
        />
      </div>
      {subtitle && <p className="mt-2.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
