import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-terminal-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-terminal-muted">
        <div>
          <span className="text-terminal-green">~/ghst.sec</span>
          {' '}· © {year} Mael Belhacene · {t('rights')}
        </div>
        <div>{t('built')}</div>
      </div>
    </footer>
  );
}
