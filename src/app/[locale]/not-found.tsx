import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl border border-terminal-border bg-terminal-surface/80 shadow-[0_0_60px_rgba(0,255,65,0.06)]">
        <div className="flex items-center gap-2 border-b border-terminal-border px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </span>
          <span className="ml-2 font-mono text-xs text-terminal-muted">bash — 404</span>
        </div>
        <div className="space-y-4 p-8 font-mono">
          <p className="text-sm text-terminal-muted">
            <span className="text-terminal-green">$</span> {t('cmd')}
          </p>
          <h1 className="text-lg text-terminal-amber">bash: 404: {t('title')}</h1>
          <p className="text-sm text-terminal-muted">{t('hint')}</p>
          <Link
            href="/"
            className="inline-block border border-terminal-green px-4 py-2 text-sm text-terminal-green transition-colors hover:bg-terminal-green hover:text-black"
          >
            [ cd ~ ]
          </Link>
        </div>
      </div>
    </main>
  );
}
