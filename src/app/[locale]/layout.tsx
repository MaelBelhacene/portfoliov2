import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { site } from '@/config/site';
import { jetbrainsMono } from '@/lib/fonts';
import '../globals.css';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const canonical = `${site.url}/${locale}`;

  return {
    metadataBase: new URL(site.url),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        fr: `${site.url}/fr`,
        en: `${site.url}/en`,
        'x-default': `${site.url}/fr`,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonical,
      siteName: site.name,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: `${site.url}/og`,
          width: 1200,
          height: 630,
          alt: `${site.name} — Cybersécurité, GRC & Développement sécurisé`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${site.url}/og`],
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
  name: site.name,
  jobTitle: site.jobTitle,
  url: site.url,
  sameAs: [site.github, site.linkedin],
  worksFor: { '@type': 'Organization', name: site.organization },
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
  knowsAbout: [...site.knowsAbout],
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-terminal-bg text-terminal-text font-mono antialiased">
        {/* Atmosphère CRT : scanlines + vignette, purement décoratif */}
        <div className="crt-overlay" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
