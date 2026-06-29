import { getTranslations } from 'next-intl/server';

type Pillar = { title: string; comment: string; items: string[] };

export async function Skills() {
  const t = await getTranslations('skills');
  const pillars = t.raw('pillars') as Pillar[];

  return (
    <section id="sk1lls" className="py-24 px-4 bg-terminal-surface">
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

        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-terminal-border p-6"
            >
              {/* Comment header */}
              <div className="font-mono text-terminal-muted text-xs mb-1 opacity-60">
                {pillar.comment}
              </div>
              <h3 className="font-mono font-bold text-terminal-amber text-base mb-4">
                {pillar.title}
              </h3>
              <ul className="space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-mono text-sm text-terminal-muted">
                    <span className="text-terminal-green mt-0.5 shrink-0" aria-hidden="true">○</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
