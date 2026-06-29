import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { jetbrainsMono } from '@/lib/fonts';
import '../globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maelbelhacene.fr';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const canonical = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonical,
      siteName: 'Mael Belhacene',
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: `${SITE_URL}/og`,
          width: 1200,
          height: 630,
          alt: 'Mael Belhacene — Cybersécurité, GRC & Développement sécurisé',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${SITE_URL}/og`],
    },
    keywords:
      locale === 'fr'
        ? 'cybersécurité, GRC, RGPD, ANSSI, EDR, XDR, SOC, Sekoia, Laravel, alternance cybersécurité, Grenoble France'
        : 'cybersecurity, GRC, GDPR, ANSSI, EDR, XDR, SOC, Sekoia, Laravel, work-study cybersecurity, Grenoble France',
    robots: { index: true, follow: true },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mael Belhacene',
  jobTitle: 'IT Security Assistant',
  url: SITE_URL,
  sameAs: [
    'https://github.com/MaelBelhacene',
    'https://linkedin.com/in/mael-belhacene-89545b294',
  ],
  worksFor: { '@type': 'Organization', name: 'DOMPLUS Groupe' },
  address: { '@type': 'PostalAddress', addressLocality: 'Grenoble', addressCountry: 'FR' },
  knowsAbout: ['Cybersecurity', 'GRC', 'GDPR', 'EDR/XDR', 'Laravel', 'Node.js', 'ANSSI'],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-terminal-bg text-terminal-text font-mono antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
