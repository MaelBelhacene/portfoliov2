'use client';

import { useEffect, useReducer } from 'react';

type State = { displayed: string; done: boolean };
type Action =
  | { type: 'CHAR'; char: string }
  | { type: 'DONE' }
  | { type: 'SKIP'; text: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHAR': return { ...state, displayed: state.displayed + action.char };
    case 'DONE': return { ...state, done: true };
    case 'SKIP': return { displayed: action.text, done: true };
    default:     return state;
  }
}

export function TypingEffect({ text, speed = 35 }: { text: string; speed?: number }) {
  const [{ displayed, done }, dispatch] = useReducer(reducer, { displayed: '', done: false });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dispatch({ type: 'SKIP', text });
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        dispatch({ type: 'CHAR', char: text[i] });
        i++;
      } else {
        dispatch({ type: 'DONE' });
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-0.5 h-[1em] bg-terminal-cursor align-middle ml-0.5 ${
          done ? 'cursor-blink' : 'opacity-100'
        }`}
      />
    </span>
  );
}
