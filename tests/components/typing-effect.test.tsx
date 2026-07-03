import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { TypingEffect } from '@/components/ui/TypingEffect';
import { setReducedMotion } from '../setup';

afterEach(() => {
  vi.useRealTimers();
});

function visibleText(container: HTMLElement) {
  return container.querySelector('[aria-hidden="true"]')?.textContent ?? '';
}

describe('TypingEffect (spec)', () => {
  it('tape le texte progressivement', () => {
    vi.useFakeTimers();
    const { container } = render(<TypingEffect text="abc" speed={10} />);

    expect(visibleText(container)).toBe('');
    act(() => vi.advanceTimersByTime(10));
    expect(visibleText(container)).toBe('a');
    act(() => vi.advanceTimersByTime(30));
    expect(visibleText(container)).toBe('abc');
  });

  it('expose le texte complet aux lecteurs d’écran dès le départ', () => {
    vi.useFakeTimers();
    const { container } = render(<TypingEffect text="hello world" />);
    expect(container.querySelector('[aria-label="hello world"]')).not.toBeNull();
  });

  it('reduced-motion → texte complet immédiat, pas d’animation', () => {
    setReducedMotion(true);
    const { container } = render(<TypingEffect text="direct" />);
    expect(visibleText(container)).toBe('direct');
  });
});

describe('TypingEffect orchestrable (v3)', () => {
  it('mode pending → rien d’affiché, pas de curseur', () => {
    const { container } = render(<TypingEffect text="abc" mode="pending" />);
    expect(visibleText(container)).toBe('');
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
  });

  it('mode done → texte complet sans animation', () => {
    const { container } = render(<TypingEffect text="abc" mode="done" />);
    expect(visibleText(container)).toBe('abc');
  });

  it('mode playing → onDone appelé une fois la frappe terminée', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<TypingEffect text="ab" speed={10} mode="playing" onDone={onDone} />);
    expect(onDone).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(25));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('cursor=false → pas de curseur rendu', () => {
    const { container } = render(<TypingEffect text="x" mode="done" cursor={false} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
  });
});
