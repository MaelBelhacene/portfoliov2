import type { ReactNode } from 'react';

export function TerminalWindow({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-terminal-border bg-terminal-surface/80 shadow-[0_0_60px_rgba(0,255,65,0.07)] backdrop-blur-sm ${className}`.trim()}
    >
      {/* Barre de titre */}
      <div className="flex items-center gap-2 border-b border-terminal-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </span>
        <span className="ml-2 font-mono text-xs text-terminal-muted">{title}</span>
      </div>
      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
}
