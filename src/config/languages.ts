export type Locale = 'en' | 'hi';

export type Language = {
  code: Locale;
  label: string;
  flag: string;
  name?: string;
  localName?: string;
};

export const defaultLanguage: Locale = 'en';

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', name: 'English', localName: 'English' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳', name: 'Hindi', localName: 'हिन्दी' }
];

export const languages = LANGUAGES;
