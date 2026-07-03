import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Tools() {
  const t = useTranslations('tools');
  const items = t.raw('items') as string[];

  return (
    <Section id="t00ls">
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="04" />

      <ul className="flex flex-wrap gap-3" aria-label={t('sectionTitle')}>
        {items.map((item) => (
          <li
            key={item}
            className="border border-terminal-border px-4 py-2 font-mono text-sm text-terminal-muted transition-all hover:border-terminal-green hover:text-terminal-green hover:shadow-[0_0_16px_rgba(0,255,65,0.15)]"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
