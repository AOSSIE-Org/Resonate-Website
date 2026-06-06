"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "HI" },
];

interface LanguageDropdownProps {
  isMobile?: boolean;
}

export function LanguageDropdown({ isMobile = false }: LanguageDropdownProps) {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale() ?? "en";
  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `lang-menu-${isMobile ? "mobile" : "desktop"}`;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus first menu item when menu opens
  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLButtonElement>('[role="menuitem"]');
      first?.focus();
    }
  }, [open]);

  function switchLocale(code: string) {
    const query = Object.fromEntries(searchParams.entries());
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace({ pathname, query }, { locale: code });
    if (hash) {
      // Re-append hash after navigation settles
      requestAnimationFrame(() => {
        window.location.hash = hash;
      });
    }
    setOpen(false);
  }

  // Keyboard nav: Escape closes; Arrow keys move focus within menu
  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    if (!items) return;
    const arr = Array.from(items);
    const focused = document.activeElement as HTMLButtonElement;
    const idx = arr.indexOf(focused);
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      arr[(idx + 1) % arr.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      arr[(idx - 1 + arr.length) % arr.length]?.focus();
    }
  }

  if (isMobile) {
    return (
      <div ref={ref} className="relative w-full">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-full border border-default bg-surface text-sm font-medium text-primary hover:bg-(--hover-background) transition-colors"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
        >
          <span className="flex items-center gap-2">
            <GlobeIcon />
            {current.label}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={t("selectLanguage")}
            onKeyDown={handleMenuKeyDown}
            className="absolute left-0 right-0 mt-2 rounded-2xl border border-default bg-surface shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
            style={{ backgroundColor: "var(--background, white)" }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                role="menuitem"
                onClick={() => switchLocale(lang.code)}
                aria-current={lang.code === currentLocale ? "true" : undefined}
                className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors hover:bg-(--hover-background) focus:outline-none focus:bg-(--hover-background) ${
                  lang.code === currentLocale ? "text-primary" : "text-muted"
                }`}
              >
                <span>{lang.label}</span>
                {lang.code === currentLocale && <CheckIcon />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-9 xl:h-10 px-3 xl:px-4 bg-surface text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
      >
        <GlobeIcon />
        <span>{current.short}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={t("selectLanguage")}
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 mt-2 w-36 rounded-2xl border border-default bg-surface shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          style={{ backgroundColor: "var(--background, white)" }}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="menuitem"
              onClick={() => switchLocale(lang.code)}
              aria-current={lang.code === currentLocale ? "true" : undefined}
              className={`flex items-center justify-between w-full px-4 py-4 text-sm font-medium transition-colors hover:bg-(--hover-background) focus:outline-none ${
                lang.code === currentLocale ? "text-primary" : "text-muted"
              }`}
            >
              <span>{lang.label}</span>
              {lang.code === currentLocale && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Small reusable icons
function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
