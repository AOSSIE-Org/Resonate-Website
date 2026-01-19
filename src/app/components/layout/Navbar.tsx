"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ThemeToggle } from "../ui/theme-toggle";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Trigger initial animation
    const timer = setTimeout(() => {
      setHasAnimatedIn(true);
    }, 100);

    // Handle scroll detection and progress
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial state
    handleScroll();
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldShowNavContent = !isScrolled || isNavHovered;

  return (
    <header className="fixed top-4 lg:top-0 left-0 right-0 z-50 mx-4 sm:mx-8 lg:mx-16 xl:mx-48 border-[0.6px] border-default rounded-2xl  lg:rounded-b-3xl lg:rounded-t-none backdrop-blur-md bg-(--nav-background) transition-colors duration-300">
      <div className="mx-auto flex py-3 sm:py-4 items-center justify-between px-4 sm:px-6 lg:px-9">
        
        {/* LEFT: Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 transition-opacity hover:opacity-80 cursor-pointer"
        >
          <div className="relative">
            {/* FIXED: Added 'theme-icon' class */}
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
            hasAnimatedIn ? "translate-y-0 opacity-100" : "-translate-y-[50px] opacity-0"
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
              shouldShowNavContent ? "opacity-100 max-w-[500px]" : "opacity-0 max-w-0 overflow-hidden"
            }`}
          >
            <NavLink href="https://github.com/AOSSIE-Org" external>Developers</NavLink>
            <NavLink href="https://discord.gg/hjUhu33uAn" external>Community</NavLink>
            <NavLink href="https://aossie.org" external>Aossie</NavLink>
            <ThemeToggle />
          </div>
          <div className="relative h-6 w-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-full w-full icon-secondary transition-all duration-500"
            >
              {/* Background circle */}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.2"
                fill="none"
              />
              {/* Progress circle */}
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
                style={{
                  transition: "stroke-dashoffset 0.1s ease-out",
                }}
              />
            </svg>
          </div>
        </nav>

        {/* RIGHT: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
            target="_blank"
            className="inline-flex h-9 xl:h-10 items-center justify-center rounded-full px-4 xl:px-6 text-sm xl:text-md font-semibold transition-all hover:scale-105 active:scale-95 bg-(--button-primary-bg) text-(--button-primary-text) border-(--button-primary-border) border-[1.5px] hover:bg-(--button-primary-hover-bg) hover:border-(--button-primary-hover-border)"
          >
            Download Now
          </Link>
        </div>

        {/* MOBILE TOGGLE - Hamburger Menu */}
        <button
          className="lg:hidden p-1.5 text-primary hover:bg-(--hover-background) rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            // Close Icon with theme-icon
            <Image
              src="/assets/icons/close.svg"
              alt="Close"
              width={32}
              height={32}
              className="h-5 xl:h-6 w-auto icon-secondary theme-icon"
            />
          ) : (
            // Menu Icon with theme-icon
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

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-default bg-(--background-secondary) px-4 sm:px-6 py-4 shadow-xl animate-in slide-in-from-top-5 rounded-b-3xl">
          <nav className="flex flex-col gap-3 sm:gap-4">
            <MobileNavLink
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Developers
            </MobileNavLink>
            <MobileNavLink
              href="#community"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </MobileNavLink>
            <MobileNavLink
              href="https://aossie.org"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AOSSIE
            </MobileNavLink>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-default mt-2">
              <span className="text-sm font-medium text-muted">
                Switch Theme
              </span>
              <ThemeToggle />
            </div>

            <Link
              href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
              target="_blank"
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

// Helper Components
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
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-base font-medium text-primary py-2 block hover:text-secondary transition-colors"
    >
      {children}
    </Link>
  );
}