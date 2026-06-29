import { getTranslations } from 'next-intl/server';

type Project = { title: string; description: string; tags: string[] };

export async function Projects() {
  const t = await getTranslations('projects');
  const items = t.raw('items') as Project[];

  return (
    <section id="pr0j3ts" className="py-24 px-4 bg-terminal-surface">
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
          {items.map((project, i) => (
            <article
              key={i}
              className="border border-terminal-border bg-terminal-bg p-6 flex flex-col hover:border-terminal-green transition-colors group"
            >
              <div className="font-mono text-terminal-green text-xs mb-3 opacity-40 group-hover:opacity-100 transition-opacity">
                ./{String(i + 1).padStart(2, '0')}.exe
              </div>
              <h3 className="font-mono font-bold text-terminal-text text-base mb-3">
                {project.title}
              </h3>
              <p className="font-mono text-terminal-muted text-sm leading-relaxed flex-1 mb-4">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 border border-terminal-border text-terminal-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
