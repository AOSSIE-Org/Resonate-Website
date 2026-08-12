"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { LanguageDropdown } from "../ui/LanguageDropdown";
import { DownloadModal } from "../ui/DownloadModal";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isIslandFocused, setIsIslandFocused] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimatedIn(true);
    }, 100);

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = `${
          62.83 - (62.83 * progress) / 100
        }`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDownloadClick = useCallback(() => {
    const userAgent =
      navigator.userAgent ||
      navigator.vendor ||
      ("opera" in window ? (window as unknown as { opera?: string }).opera : undefined) ||
      "";

    // Detect Android (excluding smart displays like Nest Hub/Chromecast)
    const isAndroid = /android/i.test(userAgent) && !/CrKey/i.test(userAgent);
    
    // Detect iOS and iPadOS (including modern iPads that report as Macintosh)
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isAndroid) {
      window.open("https://play.google.com/store/apps/details?id=com.resonate.resonate", "_blank", "noopener,noreferrer");
    } else if (isIOS) {
      window.open("https://apps.apple.com/app/resonate", "_blank", "noopener,noreferrer");
    } else {
      // For Desktop, Nest Hub, Fuchsia, or other non-mobile OS, show the QR code modal
      setIsDownloadModalOpen(true);
    }
  }, []);

  const shouldShowNavContent = !isScrolled || isNavHovered || isIslandFocused;

  return (
    <>
      <header className="fixed top-4 lg:top-0 left-4 right-4 sm:left-8 sm:right-8 lg:left-16 lg:right-16 2xl:left-48 2xl:right-48 z-50 border-[0.6px] border-default rounded-2xl lg:rounded-b-3xl lg:rounded-t-none backdrop-blur-md bg-(--nav-background) transition-colors duration-300"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}>
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
            onFocus={() => setIsIslandFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsIslandFocused(false);
              }
            }}
            className={`hidden lg:flex items-center border rounded-full border-default py-1 bg-surface transition-all duration-1000 ease-in-out ${
              hasAnimatedIn
                ? "translate-y-0 opacity-100"
                : "-translate-y-[50px] opacity-0"
            } ${
              shouldShowNavContent ? "gap-4 xl:gap-8 px-3 xl:px-4" : "gap-18 px-3"
            }`}
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
              {/* Language Switcher — now inside the island */}
              <LanguageDropdown />
              <NavLink href="https://github.com/AOSSIE-Org" external>
                {t("developers")}
              </NavLink>
              <NavLink href="https://discord.gg/hjUhu33uAn" external>
                {t("community")}
              </NavLink>
              <NavLink href="https://aossie.org" external>
                {t("aossie")}
              </NavLink>
              {/* Divider */}
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
                  ref={progressCircleRef}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="62.83"
                  strokeDashoffset="62.83"
                  strokeLinecap="round"
                  transform="rotate(-90 12 12)"
                  style={{ willChange: "stroke-dashoffset" }}
                />
              </svg>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3 justify-end">
            <Button onClick={handleDownloadClick}>
              {t("download")}
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex justify-end">
          <button
            className="p-1.5 text-primary hover:bg-(--hover-background) rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("toggleMenu")}
          >
            {isMobileMenuOpen ? (
              <Image
                src="/assets/icons/close.svg"
                alt={t("close")}
                width={32}
                height={32}
                className="h-5 xl:h-6 w-auto icon-secondary theme-icon"
              />
            ) : (
              <Image
                src="/assets/icons/menu.svg"
                alt={t("menu")}
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
          <div className="lg:hidden border-t border-default px-4 sm:px-6 py-4 shadow-xl animate-in slide-in-from-top-5 rounded-b-3xl">
            <nav className="flex flex-col gap-3 sm:gap-4">
              <MobileNavLink
                href="https://github.com/AOSSIE-Org"
                external
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("developers")}
              </MobileNavLink>
              <MobileNavLink
                href="https://discord.gg/hjUhu33uAn"
                external
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("community")}
              </MobileNavLink>
              <MobileNavLink
                href="https://aossie.org"
                external
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("aossie")}
              </MobileNavLink>

              <div className="pt-3 sm:pt-4 border-t border-default mt-2 flex flex-col gap-3">
                <ThemeToggle isMobile />
                {/* Language Switcher — mobile */}
                <LanguageDropdown isMobile />
              </div>

              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleDownloadClick();
                }}
                className="mt-2 h-10 sm:h-11 w-full text-sm font-bold"
              >
                {t("download")}
              </Button>
            </nav>
          </div>
        )}
      </header>

      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />
    </>
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