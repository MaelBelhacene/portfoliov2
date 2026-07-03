// @vitest-environment node
import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

const SITE_URL = 'https://maelbelhacene.fr';

describe('sitemap', () => {
  it('expose /fr (prio 1) et /en (prio 0.9) avec alternates', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(2);

    const [frEntry, enEntry] = entries;
    expect(frEntry.url).toBe(`${SITE_URL}/fr`);
    expect(frEntry.priority).toBe(1);
    expect(enEntry.url).toBe(`${SITE_URL}/en`);
    expect(enEntry.priority).toBe(0.9);

    for (const entry of entries) {
      expect(entry.alternates?.languages).toMatchObject({
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
      });
      expect(entry.changeFrequency).toBe('monthly');
    }
  });
});

describe('robots', () => {
  it('autorise tout et référence le sitemap', () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
