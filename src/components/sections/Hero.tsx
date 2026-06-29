import { getTranslations } from 'next-intl/server';
import { TypingEffect } from '@/components/ui/TypingEffect';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section
      id="whoami"
      className="relative min-h-screen flex flex-col justify-center px-4 overflow-hidden"
      aria-label="Hero"
    >
      {/* Subtle grid background */}
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Green top-corner accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, #00ff41, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto w-full pt-24 pb-16">
        {/* Terminal prompt */}
        <div className="flex items-center gap-2 font-mono text-sm text-terminal-muted mb-10" aria-hidden="true">
          <span className="text-terminal-green">$</span>
          <span>{t('prompt')}</span>
          <span className="text-terminal-green animate-pulse">_</span>
        </div>

        {/* Name */}
        <h1 className="font-mono font-bold text-5xl md:text-7xl lg:text-8xl text-terminal-text leading-none mb-3 tracking-tight">
          {t('name')}
        </h1>

        {/* Handle */}
        <div className="font-mono text-terminal-green text-lg md:text-xl mb-10">
          @{t('handle')}
        </div>

        {/* Separator */}
        <div className="w-24 h-px bg-terminal-green mb-8" aria-hidden="true" />

        {/* Role & location */}
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-terminal-green font-mono" aria-hidden="true">›</span>
            <p className="font-mono text-terminal-amber text-lg md:text-xl">{t('role')}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-terminal-green font-mono" aria-hidden="true">›</span>
            <p className="font-mono text-terminal-muted text-sm">{t('location')}</p>
          </div>
        </div>

        {/* Typing tagline */}
        <div className="font-mono text-terminal-muted text-base md:text-lg max-w-2xl mb-14 leading-relaxed">
          <TypingEffect text={t('typingLine')} />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href="/cv.pdf"
            download
            className="font-mono text-sm px-6 py-3 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-2 focus:ring-offset-terminal-bg"
          >
            [ {t('downloadCv')} ]
          </a>
          <a
            href="#c0nt4ct"
            className="font-mono text-sm px-6 py-3 border border-terminal-muted text-terminal-muted hover:border-terminal-text hover:text-terminal-text transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-muted focus:ring-offset-2 focus:ring-offset-terminal-bg"
          >
            [ {t('contact')} ]
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-terminal-muted text-xs" aria-hidden="true">
        {t('scrollHint')}
      </div>
    </section>
  );
}
