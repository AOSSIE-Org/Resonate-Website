"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceType = "android" | "ios";

const emptySubscribe = () => () => {};

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const t = useTranslations("DownloadModal");
  const [activeDevice, setActiveDevice] = useState<DeviceType>("android");
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );


  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  // Focus trap, Escape key handling, and Focus restoration
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Set initial focus
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLElement>("button");
      closeBtn?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDarkMode = mounted && (resolvedTheme === "dark" || theme === "dark");

  const config = {
    android: {
      qr: isDarkMode ? "/assets/images/qr_android.svg" : "/assets/images/qr_light_android.svg",
      href: "https://play.google.com/store/apps/details?id=com.resonate.resonate",
      label: t("redirectToPlayStore"),
    },
    ios: {
      qr: isDarkMode ? "/assets/images/qr_apple.svg" : "/assets/images/qr_light_apple.svg",
      href: "https://apps.apple.com/app/resonate", // Placeholder link
      label: t("redirectToAppStore"),
    },
  };

  const current = config[activeDevice];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Full-screen Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        className="relative w-full max-w-sm sm:max-w-md max-h-[95vh] overflow-y-auto transform rounded-3xl bg-(--download-modal-bg) p-6 sm:p-10 shadow-2xl transition-all animate-in zoom-in-95 duration-300 flex flex-col items-center"
     >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 text-muted hover:text-primary transition-colors hover:scale-110 z-10"
          aria-label={t("closeLabel")}
        >
          <Image
            src="/assets/icons/close.svg"
            alt= {t("closeAlt")}
            width={20}
            height={20}
            className="h-4 w-4 theme-icon"
          />
        </button>
        
        <div className="w-full">
          <h2 id="download-modal-title" className="mb-6 text-xl sm:text-2xl font-bold text-center">
            {t("title")}
          </h2>
        </div>

        <div className="flex items-center justify-center border p-6 sm:p-8 border-(--border) rounded-3xl bg-white/5">
          <Image
            src={current.qr}
            alt={t("qrAlt", { device: activeDevice })}
            width={200}
            height={200}
            className="h-48 w-48 sm:h-64 sm:w-64"
          />
        </div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-sm sm:text-base">
          <Image
            src="/assets/icons/expand.svg"
            alt= {t("scanAlt")}
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 theme-icon"
          />
          <p className="font-medium">
            {t("scanInstruction")}
          </p>
        </div>

        {/* OR Divider */}
        <div className="flex items-center w-full gap-4 my-6">
          <div className="h-px bg-(--border) flex-1" />
          <p className="text-xs text-(--foreground-muted) uppercase tracking-widest">
            {t("or")}
          </p>
          <div className="h-px bg-(--border) flex-1" />
        </div>

        <div className="w-full">
          <a 
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-(--button-primary-bg) text-(--button-primary-text) border border-(--border-subtle) hover:bg-(--button-primary-hover-bg) px-6 py-3 rounded-lg transition-all font-bold group"
          >
           <span>
            {current.label}
           </span>
           <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>

        {/* SWITCH BETWEEN DEVICES Divider */}
        <div className="flex items-center w-full gap-4 mt-8 mb-6">
          <div className="h-px bg-(--border) flex-1" />
          <p className="text-[10px] sm:text-xs text-(--foreground-muted) uppercase tracking-widest whitespace-nowrap">
            {t("switchBetweenDevices")}
          </p>
          <div className="h-px bg-(--border) flex-1" />
        </div>

        <div className="flex gap-4 w-full">
          <button 
            onClick={() => setActiveDevice("android")}
            className={`flex-1 flex justify-center items-center py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border ${
              activeDevice === "android" 
                ? "bg-(--button-secondary-bg) border-(--border-subtle) shadow-lg scale-105" 
                : "bg-(--button-subtle-bg) border-(--border-subtle) hover:bg-(--hover-background)"
            }`}
          >
            <Image
              src="/assets/icons/playstore.svg"
              alt={t("playStoreAlt")}
              width={24}
              height={24}
              className={`h-6 w-6 `}
            />
          </button>
          <button 
            onClick={() => setActiveDevice("ios")}
            className={`flex-1 flex justify-center items-center py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border ${
              activeDevice === "ios" 
                ? "bg-(--button-secondary-bg) border-(--border-subtle) shadow-lg scale-105" 
                : "bg-(--button-subtle-bg) border-(--border-subtle) hover:bg-(--hover-background)"
            }`}
          >
            <Image
              src="/assets/icons/apple.svg"
              alt= {t("appStoreAlt")}
              width={24}
              height={24}
              className={`h-6 w-6 theme-icon`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
