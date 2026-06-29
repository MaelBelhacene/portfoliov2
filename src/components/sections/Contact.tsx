import { getTranslations } from 'next-intl/server';
import { ContactForm } from './ContactForm';

export async function Contact() {
  const t = await getTranslations('contact');

  return (
    <section id="c0nt4ct" className="py-24 px-4">
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

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — tagline + social links */}
          <div>
            <p className="font-mono font-bold text-terminal-text text-2xl mb-4">
              {t('tagline')}
            </p>
            <p className="font-mono text-terminal-muted text-sm leading-relaxed mb-10">
              {t('description')}
            </p>

            <ul className="space-y-4">
              {/* Email placeholder */}
              <li className="flex items-center gap-3 font-mono text-sm">
                <span className="text-terminal-green w-4" aria-hidden="true">@</span>
                <span className="text-terminal-muted">{t('emailDisplay')}</span>
              </li>
              {/* GitHub */}
              <li className="flex items-center gap-3 font-mono text-sm">
                <span className="text-terminal-green w-4" aria-hidden="true">▸</span>
                <a
                  href="https://github.com/MaelBelhacene"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-terminal-green transition-colors"
                >
                  github.com/MaelBelhacene
                </a>
              </li>
              {/* LinkedIn */}
              <li className="flex items-center gap-3 font-mono text-sm">
                <span className="text-terminal-green w-4" aria-hidden="true">▸</span>
                <a
                  href="https://linkedin.com/in/mael-belhacene-89545b294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-terminal-green transition-colors"
                >
                  linkedin.com/in/mael-belhacene-89545b294
                </a>
              </li>
              {/* CV */}
              <li className="flex items-center gap-3 font-mono text-sm">
                <span className="text-terminal-amber w-4" aria-hidden="true">↓</span>
                <a
                  href="/cv.pdf"
                  download
                  className="text-terminal-amber hover:text-terminal-amber-dim transition-colors"
                >
                  {t('cvLabel')}
                </a>
              </li>
            </ul>
          </div>

          {/* Right — contact form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
