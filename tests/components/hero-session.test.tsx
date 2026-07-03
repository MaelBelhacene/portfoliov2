import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HeroSession } from '@/components/sections/HeroSession';

afterEach(() => {
  vi.useRealTimers();
});

const PROPS = {
  prompt: 'whoami',
  name: 'Mael Belhacene',
  title: 'Ingénieur en cybersécurité',
  handle: 'ghst.sec',
  role: 'Cybersécurité · GRC',
  location: 'Grenoble, France',
  typingLine: 'Go!',
};

describe('HeroSession : séquence animée du terminal', () => {
  it('SSR/état initial : la session complète est visible (SEO, no-JS)', () => {
    vi.useFakeTimers(); // fige le déclenchement du replay
    render(<HeroSession {...PROPS} />);
    expect(screen.getByText('whoami')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mael Belhacene');
    expect(screen.getByText('cat mission.txt')).toBeInTheDocument();
    expect(screen.getAllByText('Go!').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('opacity-100');
  });

  it('rejoue la session : whoami → sortie → cat mission.txt → mission', () => {
    vi.useFakeTimers();
    render(<HeroSession {...PROPS} />);

    // Démarrage du replay (400 ms) : le whoami est effacé, la sortie masquée
    act(() => vi.advanceTimersByTime(400));
    expect(screen.queryByText('whoami')).toBeNull();
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('opacity-0');

    // whoami se tape (6 caractères × 75 ms) → la sortie se révèle
    act(() => vi.advanceTimersByTime(6 * 75 + 20));
    expect(screen.getByText('whoami')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('opacity-100');
    // La commande suivante n'est pas encore tapée
    expect(screen.queryByText('cat mission.txt')).toBeNull();

    // Pause dramatique (1100 ms) → la commande suivante démarre
    act(() => vi.advanceTimersByTime(1100 + 20));
    // Frappe de cat mission.txt (15 caractères × 55 ms)
    act(() => vi.advanceTimersByTime(15 * 55 + 20));
    expect(screen.getByText('cat mission.txt')).toBeInTheDocument();

    // La mission se tape (3 caractères × 28 ms) — fantôme + texte tapé
    act(() => vi.advanceTimersByTime(3 * 28 + 20));
    expect(screen.getAllByText('Go!').length).toBe(2);
  });
});
