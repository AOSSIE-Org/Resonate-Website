'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '@/config/languages';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const changeLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-default 
                   bg-surface px-3 py-1.5 text-sm font-medium 
                   transition-all duration-200 hover:bg-(--hover-background)"
      >
        <span className="text-base">{activeLang.flag}</span>
        <span className="text-muted group-hover:text-primary transition-colors">
          {activeLang.code.toUpperCase()}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-muted transition-transform duration-200 
                     ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden 
                     rounded-2xl border border-default bg-surface 
                     shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => changeLocale(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm 
                          transition-colors duration-150
                          ${isActive
                            ? 'bg-(--hover-background) text-primary font-medium'
                            : 'text-muted hover:bg-(--hover-background) hover:text-primary'
                          }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.label}</span>
                {isActive && (
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}