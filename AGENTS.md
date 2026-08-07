<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Resonate Website

The official landing page for **Resonate** - an open-source social voice platform built under the **AOSSIE** organization.

## 🛠️ Stack & Commands

- **Stack:** Next.js 16 App Router (Turbopack / Webpack), React 19, Tailwind CSS v4, `next-intl` (i18n), `next-themes` (light/dark theme manager), `lenis` (smooth scrolling).
- **Build:** `npm run build` (Static export into `./out`)
- **Develop:** `npm run dev`
- **Lint:** `npm run lint`
- **Test:** `npm run test`

---

## 🎨 Styles & Theme System

- **Class-Based Dark Mode:** Tailwind CSS v4 configured for class-based overrides using `@custom-variant dark (&:where(.dark, .dark *))` in [`globals.css`](src/app/[locale]/globals.css).
- **Semantic Tokens:** Do **not** write inline layout dark utilities (e.g., `dark:bg-black` or `dark:text-zinc-50`). Always write semantic classes linked to central theme variables (e.g., `bg-background`, `text-foreground`).
- **Typography:** The default font family is **Inter**. It is mapped to `--font-inter` and applied to `font-sans`.

---

## 🌐 i18n & l10n Routing

- **Dynamic Segment:** All localized pages and layouts are nested inside [`src/app/[locale]/`](src/app/[locale]/).
- **Awaiting Params:** Layout and Page `params` props are Promises in Next.js 15/16. Always `await params` before accessing `locale`.
- **Static Export:** Call `setRequestLocale(locale)` where appropriate and export `generateStaticParams()` to support static HTML export (`output: 'export'`).
- **Navigation:** Always import `Link`, `useRouter`, or `usePathname` from configuration helpers in [`src/i18n/navigation.ts`](src/i18n/navigation.ts).

---

## 📦 Project Boundaries

- **Config Alias Map:** Turbopack and Webpack alias resolvers map `"next-intl/config"` to our local request setup inside [`next.config.ts`](next.config.ts).
- **Branding Assets:** Official branding logos, favicon, and style specifications reside inside [`public/brand/`](public/brand/).
