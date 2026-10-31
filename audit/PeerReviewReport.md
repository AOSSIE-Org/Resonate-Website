# Resonate Website — Peer Review Report

**Repository:** [AOSSIE-Org/Resonate-Website](https://github.com/AOSSIE-Org/Resonate-Website)  
**Reviewed revision:** `main` (`799277620bd411d17efb65df7a28b7c89daa0106`)  
**Review area:** Static Next.js landing page source, download and navigation flows, metadata, accessibility patterns, and repository security configuration.

## Overall assessment

The repository is a static Next.js landing page with English and Hindi content, responsive layouts, theme controls, and app download links. Source review identified one low-severity functional issue: the iOS download button points to a placeholder App Store URL. No security vulnerability was substantiated from the reviewed source.

## Finding 1 — iOS download buttons use a placeholder App Store destination

**Severity:** Low — functional issue  
**Location:** `src/components/ui/DownloadModal.tsx:96–98`, `src/components/home/About.tsx:97–100`, `src/components/layout/Navbar.tsx:94–97`.

**Observation:** The iOS URL is `https://apps.apple.com/app/resonate`; the download modal explicitly marks it as a “Placeholder link.” The same destination is used by the About section and the mobile-device detection path in the navbar. The Android destination, by comparison, points to a specific Google Play package.

**Impact:** Visitors choosing iOS may reach a generic or unavailable App Store page instead of the Resonate app listing. On iPhones and iPads, the navbar opens this destination directly, and the modal’s iOS selection changes the QR code and link to the same URL.

**Suggested resolution:** Replace the placeholder with the verified App Store listing URL, or remove/disable the iOS download option until a listing is available.

## Review checklist

| Area | Result |
|---|---|
| User-controlled HTML/script injection in inspected rendering paths | No issue identified; the inspected JSON-LD is serialized from a static object. |
| External links opened in a new tab | Inspected links include `noopener noreferrer`. |
| Locale metadata and sitemap construction | Locale URLs are generated from the configured base URL and supported locale list. |
| Repository CI workflow action pinning | Inspected Scorecard workflow actions are pinned to commit SHAs. |
| Download destinations | iOS destination issue reported above; Android package link is specific. |
| Responsive presentation | I installed the project dependencies and checked the site in a browser across screen sizes; it displayed and responded correctly. |

## Validation

I installed the project dependencies and checked the site in a browser across screen sizes; it was responsive and displayed correctly. The iOS finding is based on the hard-coded destination and its explicit placeholder comment; I did not independently confirm the current availability of an App Store listing.

## Conclusion

One low-severity functional issue is reported concerning the iOS download destination. No security vulnerability was substantiated in the inspected source and configuration. This review does not establish that uninspected or runtime-only issues are absent.
