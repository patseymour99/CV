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
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent tnum">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
