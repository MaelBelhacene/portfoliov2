import { useTranslations } from 'next-intl';
import { site } from '@/config/site';

/** Status bar façon tmux. */
export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-terminal-border bg-terminal-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 font-mono text-xs md:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="border border-terminal-green/40 px-2 py-0.5 text-terminal-green">
            ~/{site.handle}
          </span>
          <span className="text-terminal-muted">
            © {year} {site.name} · {t('rights')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-terminal-muted">
          <span aria-hidden="true" className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-terminal-green" />
          <span>{t('built')}</span>
        </div>
      </div>
    </footer>
  );
}
