import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function About() {
  const t = useTranslations('about');

  return (
    <Section id="wh0am1" tinted>
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="01" />

      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <div className="space-y-5">
          <p className="font-mono text-sm leading-relaxed text-terminal-muted md:text-base">
            {t('p1')}
          </p>
          <p className="font-mono text-sm leading-relaxed text-terminal-muted md:text-base">
            {t('p2')}
          </p>
        </div>
        <div className="space-y-5">
          <p className="font-mono text-sm leading-relaxed text-terminal-muted md:text-base">
            {t('p3')}
          </p>
          <p className="border-l-2 border-terminal-green pl-4 font-mono text-sm leading-relaxed text-terminal-text md:text-base">
            {t('p4')}
          </p>
        </div>
      </div>
    </Section>
  );
}
