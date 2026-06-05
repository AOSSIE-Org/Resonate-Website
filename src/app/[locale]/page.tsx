'use client';

import { useTranslations } from 'next-intl';
import Footer from '@/components/ui/Footer';
import { Hero } from '@/components/home/Hero';

import dynamic from 'next/dynamic';

// const LanguageSwitcher = dynamic(() => import('@/components/ui/LanguageSwitcher'), {
//   ssr: false,
// });


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col mx-4 sm:mx-8 lg:mx-16 xl:mx-48">
      <div className="h-[300vh]">
        <Hero />
      </div>
      <div className="bottom-0 pb-4">
        <Footer />
      </div>
   </div>
  );
}
