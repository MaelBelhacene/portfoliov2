import { getTranslations } from 'next-intl/server';

type ServiceItem = { index: string; title: string; description: string };

export async function Services() {
  const t = await getTranslations('services');
  const items = t.raw('items') as ServiceItem[];

  return (
    <section id="s3rv1c3s" className="py-24 px-4">
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

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <article
              key={item.index}
              className="border border-terminal-border bg-terminal-surface p-6 hover:border-terminal-green transition-colors group"
            >
              <div className="font-mono text-terminal-green text-xs mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                [{item.index}]
              </div>
              <h3 className="font-mono font-bold text-terminal-text text-base mb-3">
                {item.title}
              </h3>
              <p className="font-mono text-terminal-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
