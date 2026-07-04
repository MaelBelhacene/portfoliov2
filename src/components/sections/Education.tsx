import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Degree = { title: string; school: string; period: string; detail: string };
type Certification = {
  org: string;
  title: string;
  issuedLabel: string;
  issued: string;
  credentialLabel: string;
  credentialId: string;
  url: string;
};

export function Education() {
  const t = useTranslations('education');
  const degrees = t.raw('degrees') as Degree[];
  const methods = t.raw('methods') as string[];
  const certifications = t.raw('certifications') as Certification[];

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

      {/* Certifications */}
      <div className="border border-terminal-border p-6">
        <h3 className="mb-4 font-mono text-base font-bold text-terminal-bright">
          {t('certsTitle')}
        </h3>
        <ul className="space-y-3">
          {certifications.map((cert) => (
            <li key={cert.credentialId}>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-terminal-border p-5 transition-all hover:border-terminal-green hover:shadow-[0_0_24px_rgba(0,255,65,0.08)]"
              >
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-terminal-border font-mono text-xs font-bold tracking-wider text-terminal-muted transition-colors group-hover:border-terminal-green group-hover:text-terminal-green"
                  title={`Logo de ${cert.org}`}
                >
                  UN
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs text-terminal-green">{cert.org}</div>
                  <div className="font-mono text-sm font-bold text-terminal-bright md:text-base">
                    {cert.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs text-terminal-muted">
                    <span>{cert.issuedLabel} {cert.issued}</span>
                    <span>{cert.credentialLabel} : {cert.credentialId}</span>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-terminal-muted transition-colors group-hover:text-terminal-green"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
