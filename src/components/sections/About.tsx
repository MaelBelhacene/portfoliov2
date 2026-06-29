import { getTranslations } from 'next-intl/server';

export async function About() {
  const t = await getTranslations('about');

  return (
    <section id="wh0am1" className="py-24 px-4 bg-terminal-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">$</span>
            <span>{t('sectionCmd')}</span>
          </div>
          <h2 className="font-mono font-bold text-2xl md:text-3xl text-terminal-text">
            {t('sectionTitle')}
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-terminal-green" aria-hidden="true" />
        </header>

        {/* Content — 2-col on large screens */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-5">
            <p className="font-mono text-terminal-muted leading-relaxed text-sm md:text-base">
              {t('p1')}
            </p>
            <p className="font-mono text-terminal-muted leading-relaxed text-sm md:text-base">
              {t('p2')}
            </p>
          </div>
          <div className="space-y-5">
            <p className="font-mono text-terminal-muted leading-relaxed text-sm md:text-base">
              {t('p3')}
            </p>
            <p className="font-mono text-terminal-muted leading-relaxed text-sm md:text-base border-l-2 border-terminal-green pl-4">
              {t('p4')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
