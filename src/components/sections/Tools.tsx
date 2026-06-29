import { getTranslations } from 'next-intl/server';

export async function Tools() {
  const t = await getTranslations('tools');
  const items = t.raw('items') as string[];

  return (
    <section id="t00ls" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
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

        <ul className="flex flex-wrap gap-3" aria-label={t('sectionTitle')}>
          {items.map((item) => (
            <li
              key={item}
              className="font-mono text-sm px-4 py-2 border border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
