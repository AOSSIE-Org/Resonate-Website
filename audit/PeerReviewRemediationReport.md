# Resonate Website: Peer Review Remediation Report

|                       |                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Peer review**       | [`audit/PeerReviewReport.md`](PeerReviewReport.md) (merged in [PR #407](https://github.com/AOSSIE-Org/Resonate-Website/pull/407)) |
| **Reviewer**          | Piyush ([@Piyushbijarania](https://github.com/Piyushbijarania))                                                                   |
| **Reviewed revision** | `main` @ [`7992776`](https://github.com/AOSSIE-Org/Resonate-Website/commit/799277620bd411d17efb65df7a28b7c89daa0106)              |
| **Remediated by**     | Saksham Jain ([@reach2saksham](https://github.com/reach2saksham))                                                                 |
| **Date**              | 1 November 2026                                                                                                                   |

## Summary

| Finding                                                                 | Severity | Status              |
| ----------------------------------------------------------------------- | -------- | ------------------- |
| Finding 1: iOS download buttons use a placeholder App Store destination | Low      | ✅ Fixed in this PR |

## Finding 1: iOS download buttons use a placeholder App Store destination

**Severity:** Low · **Status:** Fixed

**Cause.** `APP_STORE_URL` in `src/config/links.ts` was `https://apps.apple.com/app/resonate`, which returns 404. Resonate is not listed on the App Store, so there is no correct URL to switch to.

**Fix.**

- Removed `APP_STORE_URL` from `src/config/links.ts`, with a note to add it back once the app is listed.
- `DownloadModal`: the iOS tab now shows an "iOS app coming soon" notice (`role="status"`) instead of a QR code and store link.
- `Navbar`: on iPhone and iPad the download button opens the modal on the iOS tab, instead of opening the 404 page.
- `About`: the App Store icon is no longer a link. It is shown dimmed, labelled "App Store (coming soon)".
- Added the new strings in English and Hindi, and removed the unused `redirectToAppStore` string.

**Regression tests.** New `src/__tests__/DownloadModal.test.tsx`: the Android tab links to Google Play; the iOS tab shows the notice and renders no link; switching tabs works.

## Verification

`npm run lint` ✅ · `npx vitest run` ✅ 70/70 · `npm run build` ✅ · no `apps.apple.com` link in `out/`
