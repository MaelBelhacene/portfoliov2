import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithIntl, fr, en } from '../utils';
import { setReducedMotion } from '../setup';
import { Hero } from '@/components/sections/Hero';

beforeEach(() => {
  // Texte complet immédiat: pas d'animation de frappe en reduced-motion
  setReducedMotion(true);
});

describe('Hero (spec)', () => {
  it('la section est ancrée sur #whoami', () => {
    const { container } = renderWithIntl(<Hero />);
    expect(container.querySelector('section#whoami')).not.toBeNull();
  });

  it('h1 = Mael Belhacene, titre, handle, rôle et localisation', () => {
    renderWithIntl(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(fr.hero.name);
    expect(screen.getByText(fr.hero.title)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fr.hero.handle)).length).toBeGreaterThan(0);
    expect(screen.getByText(new RegExp(fr.hero.role))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fr.hero.location))).toBeInTheDocument();
  });

  it('affiche le prompt whoami', () => {
    renderWithIntl(<Hero />);
    expect(screen.getAllByText(new RegExp(fr.hero.prompt)).length).toBeGreaterThan(0);
  });

  it('la tagline complète est rendue (reduced-motion → pas de frappe)', () => {
    renderWithIntl(<Hero />);
    // Deux occurrences légitimes : le fantôme de réservation d'espace + le texte tapé
    expect(screen.getAllByText(fr.hero.typingLine).length).toBeGreaterThan(0);
  });

  it('CTA: téléchargement CV + ancre contact', () => {
    renderWithIntl(<Hero />);
    const cv = screen.getByRole('link', { name: new RegExp(fr.hero.downloadCv) });
    expect(cv).toHaveAttribute('href', '/cv.pdf');
    expect(cv).toHaveAttribute('download');

    const contact = screen.getByRole('link', { name: new RegExp(fr.hero.contact) });
    expect(contact).toHaveAttribute('href', '#c0nt4ct');
  });

  it('rendu anglais complet', () => {
    renderWithIntl(<Hero />, 'en');
    expect(screen.getByText(en.hero.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(en.hero.role))).toBeInTheDocument();
    expect(screen.getAllByText(en.hero.typingLine).length).toBeGreaterThan(0);
  });
});
