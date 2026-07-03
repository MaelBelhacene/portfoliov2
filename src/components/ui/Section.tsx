import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function Section({
  id,
  tinted = false,
  children,
}: {
  id: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative px-4 py-24 ${tinted ? 'bg-terminal-surface' : ''}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}
