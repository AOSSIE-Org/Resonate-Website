"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const t = useTranslations("ThemeToggle");
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return isMobile ? (
      <div className="w-full h-12 animate-pulse bg-(--hover-background) rounded-lg" />
    ) : (
      <button
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent hover:bg-(--hover-background) transition-colors"
        aria-label={t("toggleTheme")}
      >
        <span className="sr-only">{t("loading")}</span>
      </button>
    );
  }

  // Mobile version - full clickable row
  if (isMobile) {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-between w-full hover:bg-(--hover-background) mt-2 px-4 py-1 rounded-full transition-all active:scale-[0.98] bg-(--button-subtle-bg)"
        aria-label={t("toggleTheme")}
      >
        <span className="text-sm font-medium text-muted">
          {t("switchTheme")}
        </span>
        <div className="flex items-center justify-center h-9 w-9">
          {theme === "dark" ? (
            <Image 
              src="/assets/icons/sun.svg"
              alt={t("lightMode")}
              width={20}
              height={20}
              className="transition-transform duration-200 rotate-0"
            />
          ) : (
            <Image 
              src="/assets/icons/moon.svg"
              alt={t("darkMode")}
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
      aria-label={t("toggleTheme")}
    >
      {theme === "dark" ? (
        <Image 
          src="/assets/icons/sun.svg"
          alt={t("lightMode")}
          width={20}
          height={20}
          className="transition-transform duration-200 rotate-0"
        />
      ) : (
        <Image 
          src="/assets/icons/moon.svg"
          alt={t("darkMode")}
          width={20}
          height={20}
          className="transition-transform duration-200 rotate-0"
        />
      )}
    </button>
  );
}