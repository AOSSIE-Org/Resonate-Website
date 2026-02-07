'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '@/config/languages';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [open]);

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="group flex items-center gap-2 rounded-lg border border-border 
                   bg-background px-3 py-2 text-sm font-medium 
                   transition-all duration-200 hover:border-brand-yellow hover:shadow-lg 
                   hover:shadow-brand-yellow/20"

      >
        <span className="text-base">{activeLang.flag}</span>
        <span className="text-foreground group-hover:text-[#FFC100] transition-colors">
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
          role="listbox"
          aria-label="Select language"
          className="absolute left-0 top-full z-50 mt-2 min-w-40 overflow-hidden 
                     rounded-lg border border-border bg-background 
                     shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => changeLocale(lang.code)}
                role="option"
                aria-selected={isActive}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm 
                          transition-colors duration-150
                          ${isActive
                    ? 'bg-brand-yellow/10 text-brand-yellow font-medium'
                    : 'text-foreground hover:bg-brand-yellow/5 hover:text-brand-yellow'
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
