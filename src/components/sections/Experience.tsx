import { getTranslations } from 'next-intl/server';

type Job = {
  title: string;
  company: string;
  type: string;
  period: string;
  current: boolean;
  description: string;
};

export async function Experience() {
  const t = await getTranslations('experience');
  const jobs = t.raw('jobs') as Job[];

  return (
    <section id="xp3r13nc3" className="py-24 px-4 bg-terminal-surface">
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

        {/* Timeline */}
        <ol className="relative" aria-label={t('sectionTitle')}>
          {/* Vertical line */}
          <div
            className="absolute left-3 top-2 bottom-8 w-px bg-terminal-border"
            aria-hidden="true"
          />

          {jobs.map((job, i) => (
            <li key={i} className="relative pl-12 pb-12 last:pb-0">
              {/* Dot */}
              <div
                aria-hidden="true"
                className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center bg-terminal-bg ${
                  job.current
                    ? 'border-terminal-green'
                    : 'border-terminal-border'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    job.current ? 'bg-terminal-green' : 'bg-terminal-border'
                  }`}
                />
              </div>

              {/* Content */}
              <div>
                <div className="font-mono text-terminal-green text-xs mb-1">
                  {job.period}
                  {job.current && (
                    <span className="ml-2 text-terminal-green opacity-70 animate-pulse">●</span>
                  )}
                </div>
                <h3 className="font-mono font-bold text-terminal-text text-base md:text-lg mb-0.5">
                  {job.title}
                </h3>
                <div className="font-mono text-terminal-amber text-sm mb-3">
                  {job.company}
                  {job.type && (
                    <span className="text-terminal-muted"> · {job.type}</span>
                  )}
                </div>
                <p className="font-mono text-terminal-muted text-sm leading-relaxed max-w-2xl">
                  {job.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
