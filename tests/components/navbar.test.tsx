import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl, fr, en } from '../utils';

const { replaceMock } = vi.hoisted(() => ({ replaceMock: vi.fn() }));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
  usePathname: () => '/',
}));

import { Navbar } from '@/components/layout/Navbar';

const ANCHORS: Array<[keyof typeof fr.nav, string]> = [
  ['about', '#wh0am1'],
  ['services', '#s3rv1c3s'],
  ['skills', '#sk1lls'],
  ['tools', '#t00ls'],
  ['experience', '#xp3r13nc3'],
  ['education', '#f0rm4t10n'],
  ['projects', '#pr0j3ts'],
  ['contact', '#c0nt4ct'],
];

beforeEach(() => {
  replaceMock.mockReset();
});

describe('Navbar (spec)', () => {
  it('affiche les 8 liens d’ancre leetspeak', () => {
    renderWithIntl(<Navbar />);
    for (const [key, anchor] of ANCHORS) {
      const link = screen.getByRole('link', { name: new RegExp(fr.nav[key]) });
      expect(link).toHaveAttribute('href', anchor);
    }
  });

  it('le logo ghst.sec ramène en haut de page', () => {
    renderWithIntl(<Navbar />);
    const logo = screen.getByRole('link', { name: /ghst\.sec/ });
    expect(logo).toHaveAttribute('href', '#whoami');
  });

  it('propose le téléchargement du CV', () => {
    renderWithIntl(<Navbar />);
    const cv = screen.getByRole('link', { name: new RegExp(fr.nav.downloadCv) });
    expect(cv).toHaveAttribute('href', '/cv.pdf');
    expect(cv).toHaveAttribute('download');
  });

  it('bascule fr → en en préservant le chemin', async () => {
    const user = userEvent.setup();
    renderWithIntl(<Navbar />);
    await user.click(screen.getByRole('button', { name: /switch to english/i }));
    expect(replaceMock).toHaveBeenCalledWith('/', { locale: 'en' });
  });

  it('affiche FR comme toggle depuis la locale en', () => {
    renderWithIntl(<Navbar />, 'en');
    expect(
      screen.getByRole('button', { name: /switch to français/i }),
    ).toHaveTextContent(en.nav.langToggle);
  });

  it('menu mobile : ouverture, duplication des liens, fermeture au clic', async () => {
    const user = userEvent.setup();
    renderWithIntl(<Navbar />);

    const burger = screen.getByRole('button', { name: fr.nav.openMenu });
    expect(burger).toHaveAttribute('aria-expanded', 'false');

    await user.click(burger);
    expect(
      screen.getByRole('button', { name: fr.nav.closeMenu }),
    ).toHaveAttribute('aria-expanded', 'true');
    // Les liens existent alors en double (desktop + menu mobile)
    expect(screen.getAllByRole('link', { name: new RegExp(fr.nav.contact) }).length).toBe(2);

    // Cliquer un lien du menu le referme
    const mobileLinks = screen.getAllByRole('link', { name: new RegExp(fr.nav.about) });
    await user.click(mobileLinks[mobileLinks.length - 1]);
    expect(screen.getByRole('button', { name: fr.nav.openMenu })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
