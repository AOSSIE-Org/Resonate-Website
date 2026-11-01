"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import type SocialShareButton from "@aossie-org/social-share-button";
import "@aossie-org/social-share-button/src/social-share-button.css";

/** Networks offered in the share dialog, in display order. */
const SHARE_PLATFORMS = ["whatsapp", "twitter", "linkedin", "telegram", "email"];

/** Loads the share library in the browser only; it reads `window` when evaluated. */
async function loadShareButton(): Promise<typeof SocialShareButton | undefined> {
  const mod = await import("@aossie-org/social-share-button");
  // The package is a classic script: bundlers expose it as the default export, and it also sets a global.
  return mod.default ?? (window as Window & { SocialShareButton?: typeof SocialShareButton }).SocialShareButton;
}

/** Footer icon button that opens the AOSSIE share dialog for the current page. */
export function SiteShareButton({ className }: { className?: string }) {
  const t = useTranslations("Share");
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<SocialShareButton | null>(null);

  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const share = t("share");
  const close = t("close");
  const copy = t("copy");
  const copied = t("copied");
  const copyFailed = t("copyFailed");
  const urlLabel = t("urlLabel");

  // The dialog's theme is fixed when it is built, so a theme or language change rebuilds it.
  useEffect(() => {
    let cancelled = false;
    let instance: SocialShareButton | null = null;

    loadShareButton().then((ShareButton) => {
      if (cancelled || !ShareButton || !containerRef.current) return;
      instance = new ShareButton({
        container: containerRef.current,
        showButton: false,
        platforms: SHARE_PLATFORMS,
        theme,
        labels: { share, close, copy, copied, copyFailed, urlLabel },
      });
      instanceRef.current = instance;
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      instanceRef.current = null;
    };
  }, [theme, share, close, copy, copied, copyFailed, urlLabel]);

  const openDialog = () => {
    const instance = instanceRef.current;
    if (!instance) return;
    instance.updateOptions({ url: window.location.href, title: document.title });
    instance.openModal();
  };

  return (
    <>
      <span ref={containerRef} />
      <button type="button" onClick={openDialog} aria-label={t("trigger")} title={t("trigger")} className={className}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>
    </>
  );
}
