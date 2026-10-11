'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLanguage } from '@/config/languages';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLanguage}`);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Resonate</h1>
      <p>Continue to the English website.</p>
      <a
        href={`/${defaultLanguage}`}
        className="rounded-lg border border-current px-4 py-2 underline underline-offset-4"
      >
        Continue in English
      </a>
    </main>
  );
}
