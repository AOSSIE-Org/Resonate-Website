'use client';

import { useTranslations } from 'next-intl';
import Footer from '@/components/ui/Footer';

import dynamic from 'next/dynamic';

// const LanguageSwitcher = dynamic(() => import('@/components/ui/LanguageSwitcher'), {
//   ssr: false,
// });


export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="flex min-h-screen flex-col mx-4 sm:mx-8 lg:mx-16 xl:mx-48">
      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="mt-4 text-xl">{t('subtitle')}</p>
      </main>

      {/* Footer*/}
      <div className="bottom-0 pb-4">
        <Footer />
      </div>
    </div>
  );
}
