// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy, config } from '../proxy';

describe('proxy (i18n routing, convention Next 16)', () => {
  it('exporte une fonction proxy nommée', () => {
    expect(proxy).toBeTypeOf('function');
  });

  it('le matcher exclut api, _next, _vercel et les fichiers statiques', () => {
    const matcher = Array.isArray(config.matcher) ? config.matcher.join(' ') : config.matcher;
    expect(matcher).toContain('api');
    expect(matcher).toContain('_next');
    expect(matcher).toContain('_vercel');
  });

  it('redirige / vers la locale par défaut (fr)', () => {
    const res = proxy(new NextRequest('https://maelbelhacene.fr/'));
    expect(res.status).toBeGreaterThanOrEqual(300);
    expect(res.status).toBeLessThan(400);
    expect(res.headers.get('location')).toContain('/fr');
  });
});
