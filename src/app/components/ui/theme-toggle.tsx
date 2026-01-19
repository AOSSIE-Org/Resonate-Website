"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent hover:bg-(--hover-background) transition-colors"
        aria-label="Toggle theme"
      >
        <span className="sr-only">Loading theme toggle</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent hover:scale-105 hover:bg-(--hover-background) transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Image 
          src="/assets/icons/sun.svg"
          alt="Dark Mode"
          width={20}
          height={20}
          className="transition-transform duration-200 rotate-0"
        />
      ) : (
        <Image 
          src="/assets/icons/moon.svg"
          alt="Light Mode"
          width={20}
          height={20}
          className="transition-transform duration-200 rotate-0"
        />
      )}
    </button>
  );
}