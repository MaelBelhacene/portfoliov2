import { useTranslations } from 'next-intl';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { HeroSession } from './HeroSession';
import { site } from '@/config/site';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="whoami"
      aria-label="Hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4"
    >
      {/* Grille phosphore fondue vers le bas */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Halos radiaux */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,65,0.09),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,179,0,0.05),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl pt-24 pb-16">
        <TerminalWindow title={`mael@${site.handle}: ~`}>
          <HeroSession
            prompt={t('prompt')}
            name={t('name')}
            title={t('title')}
            handle={t('handle')}
            role={t('role')}
            location={t('location')}
            typingLine={t('typingLine')}
          />
        </TerminalWindow>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.cvPath}
            download
            className="border border-terminal-green px-6 py-3 font-mono text-sm text-terminal-green transition-all hover:bg-terminal-green hover:text-black hover:shadow-[0_0_24px_rgba(0,255,65,0.35)] focus:ring-2 focus:ring-terminal-green focus:ring-offset-2 focus:ring-offset-terminal-bg focus:outline-none"
          >
            [ {t('downloadCv')} ]
          </a>
          <a
            href="#c0nt4ct"
            className="border border-terminal-muted px-6 py-3 font-mono text-sm text-terminal-muted transition-colors hover:border-terminal-text hover:text-terminal-text focus:ring-2 focus:ring-terminal-muted focus:ring-offset-2 focus:ring-offset-terminal-bg focus:outline-none"
          >
            [ {t('contact')} ]
          </a>
        </div>
      </div>

      {/* Indice de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse font-mono text-xs text-terminal-muted"
        aria-hidden="true"
      >
        {t('scrollHint')}
      </div>
    </section>
  );
}
