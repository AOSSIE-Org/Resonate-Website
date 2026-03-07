export type Locale = 'en' | 'hi';

export type Language = {
  code: Locale;
  label: string;
  flag: string;
};

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
];
