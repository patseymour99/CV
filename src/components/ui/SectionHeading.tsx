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
        <span className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-accent shadow-[var(--shadow-card)] tnum">
          {index}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <span className="heading-rule ml-2" aria-hidden />
      </div>
      {subtitle && <p className="mt-2.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
