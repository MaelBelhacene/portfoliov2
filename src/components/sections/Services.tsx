import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

type ServiceItem = { index: string; title: string; description: string };

export function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as ServiceItem[];

  return (
    <Section id="s3rv1c3s">
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="02" />

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.index}
            className="group border border-terminal-border bg-terminal-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-terminal-green hover:shadow-[0_0_32px_rgba(0,255,65,0.08)]"
          >
            <div className="mb-3 font-mono text-xs text-terminal-green opacity-60 transition-opacity group-hover:opacity-100">
              [{item.index}]
            </div>
            <h3 className="mb-3 font-mono text-base font-bold text-terminal-bright">
              {item.title}
            </h3>
            <p className="font-mono text-sm leading-relaxed text-terminal-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
