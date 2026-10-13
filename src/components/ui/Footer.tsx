"use client";

import React, { useSyncExternalStore } from "react";
import BackgroundTile from "./BackgroundTile";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const emptySubscribe = () => () => {};

// Defined structure with translation keys and actual URLs
const NAV_CONFIG = [
  {
    titleKey: "Resources.title",
    links: [
      { labelKey: "Resources.links.website", href: "https://github.com/AOSSIE-Org/Resonate-Website" },
      { labelKey: "Resources.links.app", href: "https://github.com/AOSSIE-Org/Resonate" },
      { labelKey: "Resources.links.backend", href: "https://github.com/AOSSIE-Org/Resonate-Backend" },
    ],
  },
  {
    titleKey: "AboutUs.title",
    links: [
      { labelKey: "AboutUs.links.aossie", href: "https://aossie.org" },
      { labelKey: "AboutUs.links.otherProjects", href: "https://aossie.org/projects" },
    ],
  },
  {
    titleKey: "Social.title",
    links: [
      { labelKey: "Social.links.discord", href: "https://discord.gg/hjUhu33uAn" },
      { labelKey: "Social.links.youtube", href: "https://www.youtube.com/@AOSSIE-Org" },
      { labelKey: "Social.links.twitter", href: "https://twitter.com/aossie_org" },
      { labelKey: "Social.links.linkedin", href: "https://www.linkedin.com/company/aossie/" },
    ],
  },
];

const Footer = () => {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const t = useTranslations("Footer");

  const brandingSrc =
    !mounted
      ? "/assets/icons/resonate_branding_light.svg"
      : (resolvedTheme === "dark" || theme === "dark")
      ? "/assets/icons/resonate_branding_dark.svg"
      : "/assets/icons/resonate_branding_light.svg";

  return (
    <div className="w-full">
      {/* Background wrapper */}

        <div className="relative">
          <div className="absolute inset-0">
            <BackgroundTile />
          </div>

          {/* Footer content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center sm:justify-between px-6 md:px-16 py-10 gap-10 md:gap-0">

            {/* Brand */}
            <Image
              src={brandingSrc}
              alt="Resonate Branding"
              width={524}
              height={73}
              className="hover:scale-105 transition-transform select-none w-90 md:w-70 lg:w-auto"
            />

            {/* Nav columns */}
            <nav className="flex justify-center md:justify-end gap-6 sm:gap-10 md:gap-14">
              {NAV_CONFIG.map((col) => (
                <div key={col.titleKey}>
                  <p className="text-(--footer-headings) text-sm sm:text-lg font-bold mb-3">
                    {t(col.titleKey)}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link.labelKey}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-(--footer-text) text-sm font-light hover:text-yellow-600 transition-colors"
                        >
                          {t(link.labelKey)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col text-sm sm:text-base md:flex-row justify-between py-4 px-4 md:px-8 xl:px-16 font-medium gap-2">
        <div>{t("copyright")}</div>
        <div>{t("madeWith")}</div>
      </div>
    </div>
  );
};

export default Footer;