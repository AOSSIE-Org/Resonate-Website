"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return isMobile ? (
      <div className="w-full h-12 animate-pulse bg-(--hover-background) rounded-lg" />
    ) : (
      <button
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent hover:bg-(--hover-background) transition-colors"
        aria-label="Toggle theme"
      >
        <span className="sr-only">Loading theme toggle</span>
      </button>
    );
  }

  // Mobile version - full clickable row
  if (isMobile) {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-between w-full hover:bg-(--hover-background) mt-2 px-4 py-1 rounded-full transition-all active:scale-[0.98] bg-(--button-subtle-bg)"
        aria-label="Toggle theme"
      >
        <span className="text-sm font-medium text-muted">
          Switch Theme
        </span>
        <div className="flex items-center justify-center h-9 w-9">
          {theme === "dark" ? (
            <Image 
              src="/assets/icons/sun.svg"
              alt="Light Mode"
              width={20}
              height={20}
              className="transition-transform duration-200 rotate-0"
            />
          ) : (
            <Image 
              src="/assets/icons/moon.svg"
              alt="Dark Mode"
              width={20}
              height={20}
              className="transition-transform duration-200 rotate-0"
            />
          )}
        </div>
      </button>
    );
  }

  // Desktop version - just the icon button
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent hover:scale-105 hover:bg-(--hover-background) transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Image 
          src="/assets/icons/sun.svg"
          alt="Light Mode"
          width={20}
          height={20}
          className="transition-transform duration-200 rotate-0"
        />
      ) : (
        <Image 
          src="/assets/icons/moon.svg"
          alt="Dark Mode"
          width={20}
          height={20}
          className="transition-transform duration-200 rotate-0"
        />
      )}
    </button>
  );
}