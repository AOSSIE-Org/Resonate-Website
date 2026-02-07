'use client';

import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

// const LanguageSwitcher = dynamic(() => import('@/components/ui/LanguageSwitcher'), {
//   ssr: false,
// });


export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-xl">{t('subtitle')}</p>
    </div>
  );
}
