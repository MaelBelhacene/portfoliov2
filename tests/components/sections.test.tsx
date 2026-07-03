import { describe, it, expect, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithIntl, fr } from '../utils';

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  usePathname: () => '/',
}));

import { PortfolioPage } from '@/components/PortfolioPage';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';
import { Tools } from '@/components/sections/Tools';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

describe('PortfolioPage : composition (spec)', () => {
  it('les 9 sections apparaissent dans l’ordre avec leurs ancres', () => {
    const { container } = renderWithIntl(<PortfolioPage />);
    const ids = Array.from(container.querySelectorAll('section[id]')).map((s) => s.id);
    expect(ids).toEqual([
      'whoami', 'wh0am1', 's3rv1c3s', 'sk1lls', 't00ls',
      'xp3r13nc3', 'f0rm4t10n', 'pr0j3ts', 'c0nt4ct',
    ]);
  });

  it('contient un landmark main, une nav et un footer', () => {
    renderWithIntl(<PortfolioPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('About (spec)', () => {
  it('#wh0am1, titre h2 et 4 paragraphes', () => {
    const { container } = renderWithIntl(<About />);
    expect(container.querySelector('section#wh0am1')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(fr.about.sectionTitle);
    for (const key of ['p1', 'p2', 'p3', 'p4'] as const) {
      expect(screen.getByText(fr.about[key])).toBeInTheDocument();
    }
  });
});

describe('Services (spec)', () => {
  it('#s3rv1c3s et 4 services', () => {
    const { container } = renderWithIntl(<Services />);
    expect(container.querySelector('section#s3rv1c3s')).not.toBeNull();
    expect(screen.getAllByRole('article')).toHaveLength(4);
    for (const item of fr.services.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });
});

describe('Skills (spec)', () => {
  it('#sk1lls et 3 piliers complets', () => {
    const { container } = renderWithIntl(<Skills />);
    expect(container.querySelector('section#sk1lls')).not.toBeNull();
    for (const pillar of fr.skills.pillars) {
      expect(screen.getByText(pillar.title)).toBeInTheDocument();
      for (const item of pillar.items) {
        expect(screen.getByText(item)).toBeInTheDocument();
      }
    }
  });
});

describe('Tools (spec)', () => {
  it('#t00ls et les 12 technologies', () => {
    const { container } = renderWithIntl(<Tools />);
    expect(container.querySelector('section#t00ls')).not.toBeNull();
    for (const item of fr.tools.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});

describe('Experience (spec)', () => {
  it('#xp3r13nc3 et les 4 postes', () => {
    const { container } = renderWithIntl(<Experience />);
    expect(container.querySelector('section#xp3r13nc3')).not.toBeNull();
    for (const job of fr.experience.jobs) {
      expect(screen.getByText(job.title)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(job.period))).toBeInTheDocument();
    }
    expect(screen.getAllByText(/DOMPLUS Groupe/).length).toBeGreaterThanOrEqual(3);
  });
});

describe('Education (spec)', () => {
  it('#f0rm4t10n : 2 diplômes, méthodologies, certifications à venir', () => {
    const { container } = renderWithIntl(<Education />);
    expect(container.querySelector('section#f0rm4t10n')).not.toBeNull();
    for (const deg of fr.education.degrees) {
      expect(screen.getByText(deg.title)).toBeInTheDocument();
    }
    expect(screen.getByText(fr.education.methodsTitle)).toBeInTheDocument();
    for (const m of fr.education.methods) {
      expect(screen.getByText(m)).toBeInTheDocument();
    }
    expect(screen.getByText(fr.education.certsPlaceholder)).toBeInTheDocument();
  });
});

describe('Projects (spec)', () => {
  it('#pr0j3ts et les 3 projets taggés', () => {
    const { container } = renderWithIntl(<Projects />);
    expect(container.querySelector('section#pr0j3ts')).not.toBeNull();
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
    for (const project of fr.projects.items) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
    // Tags du premier projet (ancrés pour ne pas matcher le titre)
    const first = articles[0];
    for (const tag of fr.projects.items[0].tags) {
      expect(within(first).getByText(new RegExp(`^#?${tag}$`))).toBeInTheDocument();
    }
  });
});

describe('Contact (section, spec)', () => {
  it('#c0nt4ct : tagline, GitHub, LinkedIn, CV', () => {
    const { container } = renderWithIntl(<Contact />);
    expect(container.querySelector('section#c0nt4ct')).not.toBeNull();
    expect(screen.getByText(fr.contact.tagline)).toBeInTheDocument();

    const github = screen.getByRole('link', { name: /github\.com\/MaelBelhacene/ });
    expect(github).toHaveAttribute('href', 'https://github.com/MaelBelhacene');
    expect(github).toHaveAttribute('target', '_blank');

    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute(
      'href',
      'https://linkedin.com/in/mael-belhacene-89545b294',
    );

    const cv = screen.getByRole('link', { name: new RegExp(fr.contact.cvLabel) });
    expect(cv).toHaveAttribute('href', '/cv.pdf');
  });
});

describe('Footer (spec)', () => {
  it('année courante, droits, crédit stack', () => {
    renderWithIntl(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fr.footer.rights))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fr.footer.built))).toBeInTheDocument();
  });
});
