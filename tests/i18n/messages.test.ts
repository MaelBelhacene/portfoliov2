import { describe, it, expect } from 'vitest';
import { fr, en } from '../utils';

/** Structural fingerprint: same keys, same array lengths, same primitive types. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value as Record<string, unknown>)
        .sort()
        .map((k) => [k, shape((value as Record<string, unknown>)[k])]),
    );
  }
  return typeof value;
}

describe('messages: parité fr/en', () => {
  it('fr et en ont exactement la même structure', () => {
    expect(shape(fr)).toEqual(shape(en));
  });

  it('tous les namespaces requis existent', () => {
    for (const ns of [
      'meta', 'nav', 'hero', 'about', 'services', 'skills',
      'tools', 'experience', 'education', 'projects', 'contact', 'footer',
    ]) {
      expect(fr, `namespace manquant: ${ns}`).toHaveProperty(ns);
    }
  });

  it('les commandes de section sont identiques entre locales', () => {
    for (const ns of ['about', 'services', 'skills', 'tools', 'experience', 'education', 'projects', 'contact'] as const) {
      expect(fr[ns].sectionCmd).toBe(en[ns].sectionCmd);
    }
  });
});

describe('messages: contenu (spec)', () => {
  it('hero: identité', () => {
    expect(fr.hero.name).toBe('Mael Belhacene');
    expect(fr.hero.handle).toBe('ghst.sec');
    expect(fr.hero.prompt).toBe('whoami');
    expect(fr.hero.location).toBe('Grenoble, France');
    expect(en.hero.name).toBe('Mael Belhacene');
  });

  it('meta: title contient le nom', () => {
    expect(fr.meta.title).toContain('Mael Belhacene');
    expect(en.meta.title).toContain('Mael Belhacene');
  });

  it('nav: le toggle de langue pointe vers l’autre locale', () => {
    expect(fr.nav.langToggle).toBe('EN');
    expect(en.nav.langToggle).toBe('FR');
  });

  it('services: 4 items indexés 01→04', () => {
    expect(fr.services.items).toHaveLength(4);
    expect(fr.services.items.map((i) => i.index)).toEqual(['01', '02', '03', '04']);
    for (const item of fr.services.items) {
      expect(item.title).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it('skills: 3 piliers non vides', () => {
    expect(fr.skills.pillars).toHaveLength(3);
    for (const pillar of fr.skills.pillars) {
      expect(pillar.title).toBeTruthy();
      expect(pillar.comment).toMatch(/^\/\//);
      expect(pillar.items.length).toBeGreaterThan(0);
    }
  });

  it('tools: 12 items dont Sekoia XDR', () => {
    expect(fr.tools.items).toHaveLength(12);
    expect(fr.tools.items).toContain('Sekoia XDR');
  });

  it('experience: 4 postes, seul le premier est courant', () => {
    expect(fr.experience.jobs).toHaveLength(4);
    expect(fr.experience.jobs.map((j) => j.current)).toEqual([true, false, false, false]);
    for (const job of fr.experience.jobs) {
      expect(job.title).toBeTruthy();
      expect(job.company).toBeTruthy();
      expect(job.period).toBeTruthy();
      expect(job.description).toBeTruthy();
    }
    expect(fr.experience.jobs[0].company).toBe('DOMPLUS Groupe');
  });

  it('education: 2 diplômes CESI + 5 méthodologies', () => {
    expect(fr.education.degrees).toHaveLength(2);
    for (const deg of fr.education.degrees) expect(deg.school).toBe('CESI');
    expect(fr.education.methods).toHaveLength(5);
  });

  it('education: certification United Nations', () => {
    expect(fr.education.certifications).toHaveLength(1);
    const [cert] = fr.education.certifications;
    expect(cert.org).toBe('United Nations');
    expect(cert.credentialId).toBe('1774172153MB');
    expect(cert.url).toBe(
      'https://elearningunodc.org/pluginfile.php/1/tool_certificate/issues/1765813175/1774172153MB.pdf',
    );
    expect(en.education.certifications[0].url).toBe(cert.url);
  });

  it('projects: 3 projets taggés', () => {
    expect(fr.projects.items).toHaveLength(3);
    for (const project of fr.projects.items) {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it('contact: formulaire complet', () => {
    for (const key of [
      'nameLabel', 'emailLabel', 'subjectLabel', 'messageLabel',
      'sendButton', 'sending', 'successTitle', 'successMessage', 'errorMessage',
    ] as const) {
      expect(fr.contact[key]).toBeTruthy();
      expect(en.contact[key]).toBeTruthy();
    }
  });
});
