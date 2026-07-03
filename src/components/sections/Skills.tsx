import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Pillar = { title: string; comment: string; items: string[] };

export function Skills() {
  const t = useTranslations('skills');
  const pillars = t.raw('pillars') as Pillar[];

  return (
    <Section id="sk1lls" tinted>
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="03" />

      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="border border-terminal-border bg-terminal-bg/40 p-6 transition-colors hover:border-terminal-border-bright"
          >
            <div className="mb-1 font-mono text-xs text-terminal-muted opacity-60">
              {pillar.comment}
            </div>
            <h3 className="glow-amber mb-4 font-mono text-base font-bold text-terminal-amber">
              {pillar.title}
            </h3>
            <ul className="space-y-2">
              {pillar.items.map((item) => (
                <li key={item} className="flex items-start gap-2 font-mono text-sm text-terminal-muted">
                  <span className="mt-0.5 shrink-0 text-terminal-green" aria-hidden="true">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
