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
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState<SectionId>('');

  // Fond au scroll + barre de progression de lecture
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu mobile au passage desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Suivi de la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      // Active dès que le haut de section entre dans les 40 % supérieurs du viewport
      { rootMargin: '-56px 0px -60% 0px', threshold: 0 },
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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-terminal-border bg-terminal-bg/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Barre de progression de scroll */}
      <div
        aria-hidden="true"
        className="glow-line absolute top-0 left-0 h-px bg-terminal-green transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <a
          href="#whoami"
          onClick={closeMenu}
          className="font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-dim"
        >
          <span className="text-terminal-muted">~/</span>ghst.sec
        </a>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-5 font-mono text-xs md:flex">
          {NAV_ITEMS.map(({ href, key, id }, i) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'glow-green text-terminal-green'
                      : 'text-terminal-muted hover:text-terminal-green'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mr-1 ${isActive ? 'text-terminal-green/70' : 'text-terminal-faint'}`}
                  >
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  {t(key as Parameters<typeof t>[0])}
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

        {/* Contrôles à droite */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={switchLocale}
            aria-label={`Switch to ${locale === 'fr' ? 'English' : 'Français'}`}
            className="border border-terminal-border px-2 py-1 font-mono text-xs text-terminal-muted transition-colors hover:border-terminal-green hover:text-terminal-green"
          >
            {t('langToggle')}
          </button>

          <a
            href="/cv.pdf"
            download
            className="hidden border border-terminal-green px-3 py-1 font-mono text-xs text-terminal-green transition-colors hover:bg-terminal-green hover:text-black md:inline-flex"
          >
            {t('downloadCv')}
          </a>

          <button
            type="button"
            className="p-1 text-terminal-muted transition-colors hover:text-terminal-green md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          >
            <span className="font-mono text-sm">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="border-b border-terminal-border bg-terminal-bg px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map(({ href, key, id }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center gap-2 font-mono text-sm transition-colors ${
                      isActive ? 'text-terminal-green' : 'text-terminal-muted hover:text-terminal-green'
                    }`}
                  >
                    <span aria-hidden="true">›</span>
                    {t(key as Parameters<typeof t>[0])}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="animate-pulse-dot ml-auto h-1.5 w-1.5 rounded-full bg-terminal-green"
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
                className="flex items-center gap-2 font-mono text-sm text-terminal-amber transition-colors hover:text-terminal-amber-dim"
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
