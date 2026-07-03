import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Job = {
  title: string;
  subtitle?: string;
  company: string;
  type: string;
  period: string;
  current: boolean;
  description: string;
};

/** Timeline façon `git log --graph`. */
export function Experience() {
  const t = useTranslations('experience');
  const jobs = t.raw('jobs') as Job[];

  return (
    <Section id="xp3r13nc3" tinted>
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="05" />

      <ol className="relative" aria-label={t('sectionTitle')}>
        {/* Ligne de commits */}
        <div
          className="absolute top-2 bottom-8 left-3 w-px bg-gradient-to-b from-terminal-green/60 via-terminal-border to-terminal-border"
          aria-hidden="true"
        />

        {jobs.map((job, i) => (
          <li key={i} className="group relative pb-12 pl-12 last:pb-0">
            {/* Commit */}
            <div
              aria-hidden="true"
              className={`absolute top-1 left-0 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-terminal-bg transition-shadow ${
                job.current
                  ? 'border-terminal-green shadow-[0_0_12px_rgba(0,255,65,0.4)]'
                  : 'border-terminal-border group-hover:border-terminal-border-bright'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  job.current ? 'animate-pulse-dot bg-terminal-green' : 'bg-terminal-border'
                }`}
              />
            </div>

            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-terminal-green">{job.period}</span>
                {job.current && (
                  <span
                    className="glow-green border border-terminal-green/40 px-1.5 py-0.5 text-terminal-green"
                    aria-hidden="true"
                  >
                    HEAD → now
                  </span>
                )}
              </div>
              <h3 className="mb-0.5 font-mono text-base font-bold text-terminal-bright md:text-lg">
                {job.title}
              </h3>
              {job.subtitle && (
                <div className="mb-1 font-mono text-xs text-terminal-green opacity-80">
                  ↳ {job.subtitle}
                </div>
              )}
              <div className="mb-3 font-mono text-sm">
                <span className="glow-amber text-terminal-amber">{job.company}</span>
                {job.type && <span className="text-terminal-muted"> · {job.type}</span>}
              </div>
              <p className="max-w-2xl font-mono text-sm leading-relaxed text-terminal-muted">
                {job.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
