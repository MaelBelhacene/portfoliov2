'use client';

import { useEffect, useState } from 'react';
import { TypingEffect, type TypingMode } from '@/components/ui/TypingEffect';
import { useReducedMotion } from '@/components/ui/useReducedMotion';

const STAGES = ['idle', 'cmd1', 'out', 'cmd2', 'mission', 'done'] as const;
type Stage = (typeof STAGES)[number];

const OUT = STAGES.indexOf('out');
const CMD2 = STAGES.indexOf('cmd2');
const MISSION = STAGES.indexOf('mission');
const DONE = STAGES.indexOf('done');

export type HeroSessionProps = {
  prompt: string;
  name: string;
  title: string;
  handle: string;
  role: string;
  location: string;
  typingLine: string;
};

/**
 * Session de terminal scriptée :
 *   $ whoami                  ← tapé au clavier
 *   Mael Belhacene …          ← la sortie apparaît ligne à ligne
 *   $ cat mission.txt         ← tapé au clavier
 *   <mission>                 ← tapée au clavier, curseur final
 *
 * Le serveur rend la session complète (SEO/no-JS) ; le client la rejoue.
 * En reduced-motion, tout reste affiché sans animation.
 */
export function HeroSession({
  prompt,
  name,
  title,
  handle,
  role,
  location,
  typingLine,
}: HeroSessionProps) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>('idle');
  const at = STAGES.indexOf(stage);

  // Démarre la relecture après l'hydratation
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(
      () => setStage((s) => (s === 'idle' ? 'cmd1' : s)),
      400,
    );
    return () => clearTimeout(t);
  }, [reduced]);

  // Pause dramatique entre la sortie du whoami et la commande suivante
  useEffect(() => {
    if (stage !== 'out') return;
    const t = setTimeout(() => setStage('cmd2'), 1100);
    return () => clearTimeout(t);
  }, [stage]);

  const idle = stage === 'idle';

  const cmd1Mode: TypingMode =
    idle || at >= OUT ? 'done' : stage === 'cmd1' ? 'playing' : 'pending';
  const cmd2Mode: TypingMode =
    idle || at >= MISSION ? 'done' : stage === 'cmd2' ? 'playing' : 'pending';
  const missionMode: TypingMode =
    idle || at >= DONE ? 'done' : stage === 'mission' ? 'playing' : 'pending';

  const outputShown = idle || at >= OUT;
  const prompt2Shown = idle || at >= CMD2;

  const line = (delay: string) =>
    `transition-all duration-500 ease-out ${delay} ${
      outputShown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
    }`;

  return (
    <div className="space-y-5 font-mono">
      {/* $ whoami */}
      <div className="flex items-center gap-2 text-sm text-terminal-muted">
        <span className="text-terminal-green" aria-hidden="true">$</span>
        <span>
          <TypingEffect
            text={prompt}
            speed={75}
            mode={cmd1Mode}
            cursor={stage === 'cmd1'}
            onDone={() => setStage('out')}
          />
        </span>
      </div>

      {/* Sortie du whoami — révélée ligne à ligne */}
      <h1
        className={`text-4xl leading-none font-bold tracking-tight text-terminal-bright md:text-6xl lg:text-7xl ${line('delay-0')}`}
      >
        {name}
      </h1>

      <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${line('delay-150')}`}>
        <div className="inline-flex items-center gap-2.5 border border-terminal-green/40 bg-terminal-green/5 px-3.5 py-1.5 shadow-[0_0_24px_rgba(0,255,65,0.15)]">
          <span
            className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-terminal-green"
            aria-hidden="true"
          />
          <span className="glow-green text-xs font-bold tracking-[0.25em] text-terminal-green uppercase md:text-sm">
            {title}
          </span>
        </div>
        <div className="glow-green text-lg text-terminal-green md:text-xl">
          @{handle}
        </div>
      </div>

      <div
        className={`glow-line h-px w-24 origin-left bg-gradient-to-r from-terminal-green to-transparent transition-transform duration-700 delay-300 ${
          outputShown ? 'scale-x-100' : 'scale-x-0'
        }`}
        aria-hidden="true"
      />

      <div className="space-y-2">
        <div className={`flex items-center gap-3 ${line('delay-[350ms]')}`}>
          <span className="text-terminal-green" aria-hidden="true">›</span>
          <p className="glow-amber text-lg text-terminal-amber md:text-xl">{role}</p>
        </div>
        <div className={`flex items-center gap-3 ${line('delay-500')}`}>
          <span className="text-terminal-green" aria-hidden="true">›</span>
          <p className="text-sm text-terminal-muted">{location}</p>
        </div>
      </div>

      {/* $ cat mission.txt */}
      <div
        className={`flex items-center gap-2 pt-2 text-sm text-terminal-muted transition-opacity duration-300 ${
          prompt2Shown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-terminal-green" aria-hidden="true">$</span>
        <span>
          <TypingEffect
            text="cat mission.txt"
            speed={55}
            mode={cmd2Mode}
            cursor={stage === 'cmd2'}
            onDone={() => setStage('mission')}
          />
        </span>
      </div>

      {/* La mission, tapée au clavier — curseur final clignotant.
          Le fantôme invisible réserve la hauteur finale (zéro layout shift). */}
      <div className="relative max-w-2xl text-base leading-relaxed text-terminal-text md:text-lg">
        <span className="invisible" aria-hidden="true">{typingLine}</span>
        <div className="absolute inset-0">
          <TypingEffect
            text={typingLine}
            speed={28}
            mode={missionMode}
            cursor={idle || at >= MISSION}
            onDone={() => setStage('done')}
          />
        </div>
      </div>
    </div>
  );
}
