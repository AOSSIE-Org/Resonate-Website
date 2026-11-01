import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Footer from '@/components/ui/Footer';
import { SupportUs } from '@/components/support/SupportUs';
import { generateLocaleMetadata } from '@/i18n/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata(locale, 'support');
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex min-h-screen flex-col mx-4 sm:mx-8 lg:mx-16 2xl:mx-48">
      <div className="flex-1 pt-12 sm:pt-16">
        <SupportUs />
      </div>
      <div className="pb-4 pt-24">
        <Footer />
      </div>
    </div>
  );
}
