export function SectionHeader({
  cmd,
  title,
  index,
}: {
  cmd: string;
  title: string;
  index: string;
}) {
  return (
    <header className="relative mb-14">
      {/* Index en filigrane géant */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-0 font-mono text-[6rem] leading-none font-bold text-terminal-bright/[0.04] select-none md:text-[8rem]"
      >
        {index}
      </span>

      <div className="mb-3 flex items-center gap-2 font-mono text-sm text-terminal-muted">
        <span className="text-terminal-green" aria-hidden="true">$</span>
        <span>{cmd}</span>
      </div>
      <h2 className="font-mono text-2xl font-bold text-terminal-bright md:text-3xl">
        {title}
      </h2>
      <div
        className="glow-line mt-3 h-px w-24 bg-gradient-to-r from-terminal-green to-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
