"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "HI" },
];

function LanguageDropdown({ isMobile = false }: { isMobile?: boolean }) {
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
            aria-label="Select language"
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
        className="flex items-center gap-1.5 h-9 xl:h-10 px-3 xl:px-4 rounded-full border border-default bg-surface text-sm font-medium text-muted hover:text-primary hover:bg-(--hover-background) transition-colors whitespace-nowrap"
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
          aria-label="Select language"
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
              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-(--hover-background) focus:outline-none focus:bg-(--hover-background) ${
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

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimatedIn(true);
    }, 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldShowNavContent = !isScrolled || isNavHovered;

  return (
    <header className="fixed top-4 lg:top-0 left-0 right-0 z-50 mx-4 sm:mx-8 lg:mx-16 xl:mx-48 border-[0.6px] border-default rounded-2xl lg:rounded-b-3xl lg:rounded-t-none backdrop-blur-md bg-(--nav-background) transition-colors duration-300">
      <div className="mx-auto flex lg:grid lg:grid-cols-[1fr_auto_1fr] py-3 sm:py-4 items-center justify-between lg:justify-normal px-4 sm:px-6 lg:px-9">
        {/* LEFT: Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 transition-opacity hover:opacity-80 cursor-pointer"
        >
          <div className="relative">
            <Image
              src="/assets/icons/resonate_logo.svg"
              alt="Resonate Logo"
              width={33}
              height={60}
              className="h-9 sm:h-10 w-auto transition-all duration-200 theme-icon"
            />
          </div>
          <span className="text-xl sm:text-2xl font-medium tracking-tight text-primary">
            Resonate
          </span>
        </Link>

        {/* CENTER: Desktop Navigation */}
        <nav
          className={`hidden lg:flex items-center border rounded-full border-default py-1 bg-surface transition-all duration-1000 ease-in-out ${
            hasAnimatedIn
              ? "translate-y-0 opacity-100"
              : "-translate-y-[50px] opacity-0"
          } ${
            shouldShowNavContent ? "gap-4 xl:gap-8 px-3 xl:px-4" : "gap-18 px-3"
          }`}
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
        >
          <Image
            src="/assets/icons/hover_cue.svg"
            alt="Hover Interaction Cue"
            width={32}
            height={32}
            className="h-6 w-auto icon-secondary transition-all duration-500"
          />
          <div
            className={`flex items-center gap-4 xl:gap-8 transition-all duration-500 ${
              shouldShowNavContent
                ? "opacity-100 max-w-[500px]"
                : "opacity-0 max-w-0 overflow-hidden"
            }`}
          >
            <NavLink href="https://github.com/AOSSIE-Org" external>
              Developers
            </NavLink>
            <NavLink href="https://discord.gg/hjUhu33uAn" external>
              Community
            </NavLink>
            <NavLink href="https://aossie.org" external>
              Aossie
            </NavLink>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
          <div className="relative h-6 w-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-full w-full icon-secondary transition-all duration-500"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.2"
                fill="none"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="62.83"
                strokeDashoffset={62.83 - (62.83 * scrollProgress) / 100}
                strokeLinecap="round"
                transform="rotate(-90 12 12)"
                style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
              />
            </svg>
          </div>
        </nav>

        {/* RIGHT: Actions */}
        <div className="hidden lg:flex items-center gap-3 justify-end">
          {/* Language Switcher */}
          <LanguageDropdown />

          <Link
            href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 xl:h-10 items-center justify-center rounded-full px-4 xl:px-6 text-sm xl:text-md font-semibold transition-all hover:scale-105 active:scale-95 bg-(--button-primary-bg) text-(--button-primary-text) border-(--button-primary-border) border-[1.5px] hover:bg-(--button-primary-hover-bg) hover:border-(--button-primary-hover-border)"
          >
            Download Now
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="lg:hidden flex justify-end">
        <button
          className="p-1.5 text-primary hover:bg-(--hover-background) rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <Image
              src="/assets/icons/close.svg"
              alt="Close"
              width={32}
              height={32}
              className="h-5 xl:h-6 w-auto icon-secondary theme-icon"
            />
          ) : (
            <Image
              src="/assets/icons/menu.svg"
              alt="Menu"
              width={32}
              height={32}
              className="h-5 xl:h-6 w-auto icon-secondary theme-icon"
            />
          )}
        </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-default bg-(--background-secondary) px-4 sm:px-6 py-4 shadow-xl animate-in slide-in-from-top-5 rounded-b-3xl">
          <nav className="flex flex-col gap-3 sm:gap-4">
            <MobileNavLink
              href="https://github.com/AOSSIE-Org"
              external
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Developers
            </MobileNavLink>
            <MobileNavLink
              href="https://discord.gg/hjUhu33uAn"
              external
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </MobileNavLink>
            <MobileNavLink
              href="https://aossie.org"
              external
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AOSSIE
            </MobileNavLink>

            <div className="pt-3 sm:pt-4 border-t border-default mt-2 flex flex-col gap-3">
              <ThemeToggle isMobile />
              {/* Language Switcher — mobile */}
              <LanguageDropdown isMobile />
            </div>

            <Link
              href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex h-10 sm:h-11 w-full items-center justify-center rounded-full text-sm font-bold transition-all bg-(--button-primary-bg) text-(--button-primary-text) border-(--button-primary-border) border-[1.5px] hover:bg-(--button-primary-hover-bg) active:scale-95"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
  external,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-base font-medium text-primary py-2 block hover:text-secondary transition-colors"
    >
      {children}
    </Link>
  );
}