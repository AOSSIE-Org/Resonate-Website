'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import { useIntersectionObserver } from '../ui/useIntersectionObserver';
import { GITHUB_APP_REPO_URL } from '@/config/links';

export function Contribute() {
  const t = useTranslations('Contribute');
  const { ref: revealRef, isVisible } = useIntersectionObserver();

  return (
    <section
      id="section-contribute"
      ref={revealRef}
      className="relative flex flex-col items-center gap-6 px-4 py-20 text-center sm:py-28"
      aria-labelledby="contribute-title"
    >
      <div
        className={`flex flex-col items-center gap-4 ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}
      >
        <h2
          id="contribute-title"
          className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl"
        >
          {t('title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t('description')}
        </p>
        <Button
          href={GITHUB_APP_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          right_arrow
        >
          {t('cta')}
        </Button>
      </div>
    </section>
  );
}
