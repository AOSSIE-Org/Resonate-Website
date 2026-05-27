'use client';

import { useTranslations } from 'next-intl';
import { Hero } from '@/components/home/Hero';

import dynamic from 'next/dynamic';

// const LanguageSwitcher = dynamic(() => import('@/components/ui/LanguageSwitcher'), {
//   ssr: false,
// });


export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="flex h-[400vh] flex-col mx-4 sm:mx-8 lg:mx-16 xl:mx-48 ">
      <Hero />
    </div>
  );
}
