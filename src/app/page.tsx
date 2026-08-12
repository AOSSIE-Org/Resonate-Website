'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLanguage } from '@/config/languages';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLanguage}`);
  }, [router]);

  return null;
}
