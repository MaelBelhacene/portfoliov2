import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from './ContactForm';
import { site } from '@/config/site';

export function Contact() {
  const t = useTranslations('contact');

  return (
    <Section id="c0nt4ct">
      <SectionHeader cmd={t('sectionCmd')} title={t('sectionTitle')} index="08" />

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Gauche — accroche + liens */}
        <div>
          <p className="glow-green mb-4 font-mono text-2xl font-bold text-terminal-bright">
            {t('tagline')}
          </p>
          <p className="mb-10 font-mono text-sm leading-relaxed text-terminal-muted">
            {t('description')}
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 font-mono text-sm">
              <span className="w-4 text-terminal-green" aria-hidden="true">@</span>
              <span className="text-terminal-muted">{t('emailDisplay')}</span>
            </li>
            <li className="flex items-center gap-3 font-mono text-sm">
              <span className="w-4 text-terminal-green" aria-hidden="true">▸</span>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted transition-colors hover:text-terminal-green"
              >
                github.com/MaelBelhacene
              </a>
            </li>
            <li className="flex items-center gap-3 font-mono text-sm">
              <span className="w-4 text-terminal-green" aria-hidden="true">▸</span>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted transition-colors hover:text-terminal-green"
              >
                linkedin.com/in/mael-belhacene-89545b294
              </a>
            </li>
            <li className="flex items-center gap-3 font-mono text-sm">
              <span className="w-4 text-terminal-amber" aria-hidden="true">↓</span>
              <a
                href={site.cvPath}
                download
                className="text-terminal-amber transition-colors hover:text-terminal-amber-dim"
              >
                {t('cvLabel')}
              </a>
            </li>
          </ul>
        </div>

        {/* Droite — formulaire */}
        <div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
