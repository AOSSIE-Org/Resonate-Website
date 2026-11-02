import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import hi from '@/messages/hi.json';

export const messages = { en, hi } as const;
export type TestLocale = keyof typeof messages;
export const LOCALES = Object.keys(messages) as TestLocale[];

/** Wraps UI in the real message catalog for `locale`, as the locale layout does. */
export function IntlWrapper({ locale = 'en', children }: { locale?: TestLocale; children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}

/** `render` inside NextIntlClientProvider with the real `en` or `hi` messages. */
export function renderWithIntl(ui: React.ReactElement, locale: TestLocale = 'en', options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <IntlWrapper locale={locale}>{children}</IntlWrapper>,
    ...options,
  });
}
