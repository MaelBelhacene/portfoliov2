import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Degree = { title: string; school: string; period: string; detail: string };

export function Education() {
  const t = useTranslations('education');
  const degrees = t.raw('degrees') as Degree[];
  const methods = t.raw('methods') as string[];

  return (
    <Section id="f0rm4t10n">
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="06" />

      {/* Diplômes */}
      <div className="mb-12 space-y-4">
        {degrees.map((deg) => (
          <article
            key={deg.title}
            className="border border-terminal-border p-6 transition-all hover:border-terminal-amber hover:shadow-[0_0_24px_rgba(255,179,0,0.07)]"
          >
            <div className="mb-2 font-mono text-xs text-terminal-green">{deg.period}</div>
            <h3 className="mb-1 font-mono text-base font-bold text-terminal-bright">
              {deg.title}
            </h3>
            <div className="mb-3 font-mono text-sm text-terminal-amber">{deg.school}</div>
            <p className="font-mono text-sm leading-relaxed text-terminal-muted">{deg.detail}</p>
          </article>
        ))}
      </div>

      {/* Méthodologies */}
      <div className="mb-4 border border-terminal-border p-6">
        <h3 className="mb-4 font-mono text-base font-bold text-terminal-bright">
          {t('methodsTitle')}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {methods.map((m) => (
            <li
              key={m}
              className="border border-terminal-green px-3 py-1 font-mono text-xs text-terminal-green transition-shadow hover:shadow-[0_0_12px_rgba(0,255,65,0.2)]"
            >
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications à venir */}
      <div className="border border-dashed border-terminal-border p-6">
        <h3 className="mb-2 font-mono text-base font-bold text-terminal-muted">
          {t('certsTitle')}
        </h3>
        <p className="cursor-blink inline-block font-mono text-sm text-terminal-green">
          {t('certsPlaceholder')}
        </p>
      </div>
    </Section>
  );
}
