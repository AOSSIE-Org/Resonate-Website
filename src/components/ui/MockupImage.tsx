/* eslint-disable @next/next/no-img-element --
   This site is a static export with `images.unoptimized`, so next/image
   cannot produce responsive variants. The phone mockups are the heaviest
   images on the page, so we serve pre-generated width variants (see
   scripts/generate-mockup-variants.mjs) through a plain <img srcSet>. */

/**
 * Intrinsic width of each mockup and the extra width variants that exist on
 * disk next to it (e.g. `phone_about-480.webp`). Keep in sync with
 * scripts/generate-mockup-variants.mjs.
 */
const MOCKUPS: Record<string, { width: number; variants: number[] }> = {
  "/assets/mockups/phone.webp": { width: 357, variants: [] },
  "/assets/mockups/phone_about.webp": { width: 714, variants: [320, 480] },
  "/assets/mockups/phone_metric.webp": { width: 714, variants: [320, 480] },
  "/assets/mockups/phone_features.webp": { width: 714, variants: [320, 480] },
  "/assets/mockups/hand.webp": { width: 607, variants: [480] },
};

type Props = {
  src: keyof typeof MOCKUPS | (string & {});
  alt: string;
  /** Rendered CSS width, in `sizes` syntax, so the browser can pick a variant. */
  sizes: string;
  className?: string;
  width?: number;
  height?: number;
  /** Absolutely fill the (relatively positioned) parent, like next/image `fill`. */
  fill?: boolean;
  /** LCP candidate: load eagerly at high priority. */
  priority?: boolean;
  /**
   * Media query under which this image is hidden by CSS (the other layout
   * is shown instead). A 1px placeholder source is served there so browsers
   * never download the real file for a layout they are not displaying.
   */
  placeholderMedia?: string;
};

const PLACEHOLDER_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function MockupImage({
  src,
  alt,
  sizes,
  className = "",
  width,
  height,
  fill = false,
  priority = false,
  placeholderMedia,
}: Props) {
  const meta = MOCKUPS[src];
  const srcSet = meta && meta.variants.length
    ? [
        ...meta.variants.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`),
        `${src} ${meta.width}w`,
      ].join(", ")
    : undefined;

  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  const img = (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={`${fill ? "absolute inset-0 h-full w-full" : ""} ${className}`.trim()}
      style={{ color: "transparent" }}
    />
  );

  if (!placeholderMedia) return img;

  return (
    <picture className={fill ? "contents" : undefined}>
      <source media={placeholderMedia} srcSet={PLACEHOLDER_GIF} />
      {img}
    </picture>
  );
}
