"use client";

import SupportUsButton from "support-us-button";
import { useTranslations } from "next-intl";
import { AOSSIE_URL, GITHUB_SPONSORS_URL } from "@/config/links";
import { SUPPORT_LOGOS, SUPPORTERS } from "@/config/support";
import "support-us-button/style.css";

/** The AOSSIE support widget; it inherits the page's font and colours. */
export function SupportUs() {
  const t = useTranslations("Support");
  const tMeta = useTranslations("metadata");

  return (
    <SupportUsButton
      Theme="auto"
      heading={t("title")}
      labels={{ madeBy: t("madeBy"), supportedBy: t("supportedBy") }}
      organizationInformation={{
        name: "AOSSIE",
        desc: t("aossieDescription"),
        image: SUPPORT_LOGOS.organization,
        link: AOSSIE_URL,
      }}
      projectInformation={{
        name: tMeta("title"),
        description: tMeta("description"),
        image: SUPPORT_LOGOS.project,
      }}
      sponsors={SUPPORTERS}
      ctaSection={{ sponsorLink: [{ name: "GitHub Sponsors", url: GITHUB_SPONSORS_URL }] }}
    />
  );
}
