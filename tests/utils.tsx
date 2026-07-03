import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import fr from '../messages/fr.json';
import en from '../messages/en.json';

const MESSAGES = { fr, en } as const;

export type TestLocale = keyof typeof MESSAGES;

export function renderWithIntl(ui: ReactNode, locale: TestLocale = 'fr') {
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={MESSAGES[locale]}
      timeZone="Europe/Paris"
    >
      {ui}
    </NextIntlClientProvider>,
  );
}

export { fr, en };
