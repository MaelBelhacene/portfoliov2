'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

const NAV_ITEMS = [
  { href: '#wh0am1',    key: 'about',      id: 'wh0am1'    },
  { href: '#s3rv1c3s',  key: 'services',   id: 's3rv1c3s'  },
  { href: '#sk1lls',    key: 'skills',     id: 'sk1lls'    },
  { href: '#t00ls',     key: 'tools',      id: 't00ls'     },
  { href: '#xp3r13nc3', key: 'experience', id: 'xp3r13nc3' },
  { href: '#f0rm4t10n', key: 'education',  id: 'f0rm4t10n' },
  { href: '#pr0j3ts',   key: 'projects',   id: 'pr0j3ts'   },
  { href: '#c0nt4ct',   key: 'contact',    id: 'c0nt4ct'   },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]['id'] | '';

export function Navbar() {
  const t        = useTranslations('nav');
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState<SectionId>('');

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is intersecting; if multiple, the one closest to top wins
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        // Section is "active" once its top enters the upper 40 % of the viewport
        rootMargin: '-56px 0px -60% 0px',
        threshold: 0,
      },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const switchLocale = () =>
    router.replace(pathname, { locale: locale === 'fr' ? 'en' : 'fr' });

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#whoami"
          onClick={closeMenu}
          className="font-mono text-sm text-terminal-green hover:text-terminal-green-dim transition-colors"
        >
          <span className="text-terminal-muted">~/</span>ghst.sec
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-mono">
          {NAV_ITEMS.map(({ href, key, id }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-terminal-green'
                      : 'text-terminal-muted hover:text-terminal-green'
                  }`}
                >
                  {t(key as Parameters<typeof t>[0])}

                  {/* Active indicator: glowing green underline */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-300 ${
                      isActive
                        ? 'bg-terminal-green opacity-100 shadow-[0_0_8px_#00ff41]'
                        : 'bg-transparent opacity-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            type="button"
            onClick={switchLocale}
            aria-label={`Switch to ${locale === 'fr' ? 'English' : 'Français'}`}
            className="font-mono text-xs px-2 py-1 border border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green transition-colors"
          >
            {t('langToggle')}
          </button>

          {/* CV download (desktop) */}
          <a
            href="/cv.pdf"
            download
            className="hidden md:inline-flex font-mono text-xs px-3 py-1 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black transition-colors"
          >
            {t('downloadCv')}
          </a>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="md:hidden text-terminal-muted hover:text-terminal-green transition-colors p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          >
            <span className="font-mono text-sm">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-terminal-bg border-b border-terminal-border py-4 px-4">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map(({ href, key, id }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'location' : undefined}
                    className={`font-mono text-sm flex items-center gap-2 transition-colors ${
                      isActive ? 'text-terminal-green' : 'text-terminal-muted hover:text-terminal-green'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`transition-colors ${
                        isActive ? 'text-terminal-green' : 'text-terminal-muted'
                      }`}
                    >
                      ›
                    </span>
                    {t(key as Parameters<typeof t>[0])}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-terminal-green shadow-[0_0_6px_#00ff41]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="/cv.pdf"
                download
                onClick={closeMenu}
                className="font-mono text-sm flex items-center gap-2 text-terminal-amber hover:text-terminal-amber-dim transition-colors"
              >
                <span aria-hidden="true">↓</span>
                {t('downloadCv')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
