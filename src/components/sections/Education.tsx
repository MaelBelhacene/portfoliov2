import { getTranslations } from 'next-intl/server';

type Degree = { title: string; school: string; period: string; detail: string };

export async function Education() {
  const t = await getTranslations('education');
  const degrees = t.raw('degrees') as Degree[];

  return (
    <section id="f0rm4t10n" className="py-24 px-4">
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

        {/* Degrees */}
        <div className="space-y-4 mb-12">
          {degrees.map((deg) => (
            <article
              key={deg.title}
              className="border border-terminal-border p-6 hover:border-terminal-amber transition-colors"
            >
              <div className="font-mono text-terminal-green text-xs mb-2">{deg.period}</div>
              <h3 className="font-mono font-bold text-terminal-text text-base mb-1">
                {deg.title}
              </h3>
              <div className="font-mono text-terminal-amber text-sm mb-3">{deg.school}</div>
              <p className="font-mono text-terminal-muted text-sm leading-relaxed">{deg.detail}</p>
            </article>
          ))}
        </div>

        {/* Methodologies */}
        <div className="border border-terminal-border p-6 mb-4">
          <h3 className="font-mono font-bold text-terminal-text text-base mb-4">
            {t('methodsTitle')}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {(t.raw('methods') as string[]).map((m) => (
              <li
                key={m}
                className="font-mono text-xs px-3 py-1 border border-terminal-green text-terminal-green"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications placeholder */}
        <div className="border border-dashed border-terminal-border p-6">
          <h3 className="font-mono font-bold text-terminal-muted text-base mb-2">
            {t('certsTitle')}
          </h3>
          <p className="font-mono text-terminal-green text-sm">{t('certsPlaceholder')}</p>
          <p className="font-mono text-terminal-muted text-xs mt-2 opacity-60">
            {/* {t('certsNote')} */}
          </p>
        </div>
      </div>
    </section>
  );
}
