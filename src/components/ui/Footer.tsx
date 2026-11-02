"use client";

import React, { useSyncExternalStore } from "react";
import BackgroundTile from "./BackgroundTile";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  AOSSIE_URL,
  AOSSIE_PROJECTS_URL,
  GITHUB_APP_REPO_URL,
  GITHUB_BACKEND_REPO_URL,
  GITHUB_WEBSITE_REPO_URL,
  DISCORD_URL,
  TWITTER_URL,
  LINKEDIN_URL,
  YOUTUBE_URL,
} from "@/config/links";
import { LEGAL_PAGES, type LegalPage } from "@/config/legal";
import { Link } from "@/i18n/navigation";
import { SUPPORT_PAGE_PATH } from "@/config/support";
import { SiteShareButton } from "./SiteShareButton";

const emptySubscribe = () => () => {};

/**
 * Bottom-bar link style: the legal links' look plus a visible keyboard focus ring. The ring uses the footer heading
 * colour (near-black in light mode, white in dark), which keeps well above 3:1 contrast against the footer in both
 * themes; brand yellow was only about 1.5:1 on the light footer.
 */
const BOTTOM_BAR_LINK_CLASSES =
  "rounded-sm text-(--footer-text) font-light hover:text-yellow-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--footer-headings)";

/** Anchor id of the footer, used by the navbar's Contact link. */
export const CONTACT_SECTION_ID = "contact";

// Defined structure with translation keys and actual URLs
const NAV_CONFIG = [
  {
    titleKey: "Resources.title",
    links: [
      { labelKey: "Resources.links.website", href: GITHUB_WEBSITE_REPO_URL },
      { labelKey: "Resources.links.app", href: GITHUB_APP_REPO_URL },
      { labelKey: "Resources.links.backend", href: GITHUB_BACKEND_REPO_URL },
    ],
  },
  {
    titleKey: "AboutUs.title",
    links: [
      { labelKey: "AboutUs.links.aossie", href: AOSSIE_URL },
      { labelKey: "AboutUs.links.otherProjects", href: AOSSIE_PROJECTS_URL },
    ],
  },
  {
    titleKey: "Social.title",
    links: [
      { labelKey: "Social.links.discord", href: DISCORD_URL },
      { labelKey: "Social.links.youtube", href: YOUTUBE_URL },
      { labelKey: "Social.links.twitter", href: TWITTER_URL },
      { labelKey: "Social.links.linkedin", href: LINKEDIN_URL },
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
  const tLegal = useTranslations("Legal");

  const brandingSrc =
    !mounted
      ? "/assets/icons/resonate_branding_light.svg"
      : (resolvedTheme === "dark" || theme === "dark")
      ? "/assets/icons/resonate_branding_dark.svg"
      : "/assets/icons/resonate_branding_light.svg";

  return (
    // tabIndex -1 lets the navbar's Contact link move keyboard focus here after scrolling
    <footer id={CONTACT_SECTION_ID} tabIndex={-1} className="w-full scroll-mt-24 outline-none">
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
            <nav aria-label={t("navLabel")} className="flex justify-center md:justify-end gap-6 sm:gap-10 md:gap-14">
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

      {/* Bottom bar: from xl it is a three-cell grid whose equal side cells keep the links centred on the viewport */}
      <div className="flex flex-col items-center gap-2 py-4 px-4 md:px-8 xl:px-12 text-center text-sm sm:text-base font-medium xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-x-4">
        <div className="xl:justify-self-start xl:text-left">{t("copyright")}</div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 xl:gap-x-4">
          {(Object.keys(LEGAL_PAGES) as LegalPage[]).map((page) => (
            <li key={page}>
              <Link href={LEGAL_PAGES[page].path} className={BOTTOM_BAR_LINK_CLASSES}>
                {tLegal(`${page}.title`)}
              </Link>
            </li>
          ))}
          <li>
            <Link href={SUPPORT_PAGE_PATH} className={BOTTOM_BAR_LINK_CLASSES}>
              <span aria-hidden="true">♥ </span>
              {t("supportLink")}
            </Link>
          </li>
          <li className="flex items-center">
            <SiteShareButton className={`inline-flex cursor-pointer items-center ${BOTTOM_BAR_LINK_CLASSES}`} />
          </li>
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 xl:justify-self-end xl:justify-end xl:flex-nowrap">
          {t.rich("madeWith", {
            // The logo is decorative and never wraps away from the word "AOSSIE" right after it
            logo: (name) => (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Image
                  src="/brand/icons/aossie_logo.svg"
                  alt=""
                  aria-hidden="true"
                  width={22}
                  height={24}
                  className="h-5 w-auto"
                />
                {name}
              </span>
            ),
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;