'use client';

import Footer from '@/components/ui/Footer';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Metric } from '@/components/home/Metric';
import { Features } from '@/components/home/Features';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Resonate - Open Source Social Voice Platform",
    "description": "The Open-Source Voice of the Internet. Real-time audio communication, scheduled rooms, and pair chatting for open-source communities.",
    "publisher": {
      "@type": "Organization",
      "name": "AOSSIE",
      "url": "https://aossie.org",
      "logo": "https://resonate.aossie.org/brand/icons/aossie_logo.svg",
    },
  };

  return (
    <div className="flex min-h-screen flex-col mx-4 sm:mx-8 lg:mx-16 2xl:mx-48">
      <script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
