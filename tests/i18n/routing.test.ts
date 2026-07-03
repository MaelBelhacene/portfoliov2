import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';
import * as navigation from '@/i18n/navigation';

describe('i18n routing', () => {
  it('locales fr + en, défaut fr', () => {
    expect([...routing.locales]).toEqual(['fr', 'en']);
    expect(routing.defaultLocale).toBe('fr');
  });

  it('les helpers de navigation localisés sont exportés', () => {
    expect(navigation.Link).toBeDefined();
    expect(navigation.redirect).toBeTypeOf('function');
    expect(navigation.usePathname).toBeTypeOf('function');
    expect(navigation.useRouter).toBeTypeOf('function');
    expect(navigation.getPathname).toBeTypeOf('function');
  });
});
