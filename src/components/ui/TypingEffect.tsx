'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export type TypingMode = 'pending' | 'playing' | 'done';

/**
 * Effet machine à écrire, orchestrable :
 * - `pending` : rien n'est affiché (la ligne attend son tour)
 * - `playing` : frappe progressive, `onDone` appelé à la fin
 * - `done`    : texte complet immédiat
 * En reduced-motion, le texte est toujours complet et `onDone` est notifié.
 */
export function TypingEffect({
  text,
  speed = 35,
  mode = 'playing',
  cursor = true,
  onDone,
}: {
  text: string;
  speed?: number;
  mode?: TypingMode;
  cursor?: boolean;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);

  // Réinitialise la frappe si le texte change (pattern « adjust state during render »)
  const [prevText, setPrevText] = useState(text);
  if (prevText !== text) {
    setPrevText(text);
    setTyped(0);
  }

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const playing = mode === 'playing' && !reduced;

  useEffect(() => {
    if (!playing) return;

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= text.length) {
        clearInterval(timer);
        onDoneRef.current?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, playing]);

  // Reduced-motion : la séquence parente doit quand même avancer
  useEffect(() => {
    if (mode !== 'playing' || !reduced) return;
    const t = setTimeout(() => onDoneRef.current?.(), 0);
    return () => clearTimeout(t);
  }, [mode, reduced]);

  const count =
    mode === 'pending' ? 0
    : mode === 'done' || reduced ? text.length
    : Math.min(typed, text.length);

  const done = mode === 'done' || reduced || count >= text.length;

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {cursor && mode !== 'pending' && (
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block h-[1em] w-0.5 bg-terminal-cursor align-middle ${
            done ? 'cursor-blink' : 'opacity-100'
          }`}
        />
      )}
    </span>
  );
}
