'use client';

import Footer from '@/components/ui/Footer';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Metric } from '@/components/home/Metric';
import { Features } from '@/components/home/Features';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col mx-4 sm:mx-8 lg:mx-16 xl:mx-48">
      <div className="min-h-screen md:min-h-[400vh] h-auto">
      <Hero />
      <About />
      <Metric />
      <Features />
      </div>
      <div className="bottom-0 pb-4 pt-24">
        <Footer />
      </div>
   </div>
  );
}
