/**
 * Minimal line illustrations for the feature cards.
 *
 * Each one is a 96×96 stroke drawing in `currentColor` with a single
 * brand-yellow accent, so it inherits the card's text colour and stays
 * coherent across light/dark themes. Small looping animations run only
 * while the parent `.group` is hovered and are disabled for reduced motion.
 */

export type FeatureKind =
  | "live-rooms"
  | "scheduled-rooms"
  | "stories"
  | "friends-calls"
  | "audio-spaces"
  | "moderation";

const accent = "var(--color-brand-yellow)";
const anim = "motion-reduce:animate-none [transform-box:fill-box] origin-center";

function Svg({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function FeatureIllustration({
  kind,
  className,
}: {
  kind: FeatureKind;
  className?: string;
}) {
  switch (kind) {
    case "live-rooms":
      return (
        <Svg className={className}>
          <rect x="40" y="22" width="16" height="30" rx="8" />
          <path d="M32 46a16 16 0 0 0 32 0" />
          <path d="M48 62v10M40 72h16" />
          <path d="M24 34a26 26 0 0 0 0 24" className={`${anim} group-hover:animate-illo-pulse`} />
          <path d="M72 34a26 26 0 0 1 0 24" className={`${anim} group-hover:animate-illo-pulse`} />
          <path d="M16 28a34 34 0 0 0 0 36" opacity="0.45" className={`${anim} group-hover:animate-illo-pulse [animation-delay:300ms]`} />
          <path d="M80 28a34 34 0 0 1 0 36" opacity="0.45" className={`${anim} group-hover:animate-illo-pulse [animation-delay:300ms]`} />
          <circle cx="70" cy="22" r="4" fill={accent} stroke="none" className={`${anim} group-hover:animate-illo-pulse`} />
        </Svg>
      );

    case "scheduled-rooms":
      return (
        <Svg className={className}>
          <rect x="16" y="22" width="52" height="50" rx="8" />
          <path d="M16 36h52M30 16v10M54 16v10" />
          <path d="M28 48h.01M40 48h.01M52 48h.01M28 58h.01M40 58h.01" strokeWidth="3" />
          <circle cx="66" cy="66" r="14" fill="var(--feature-card-bg)" stroke={accent} />
          <path d="M66 58v8l5 3" stroke={accent} className={`${anim} group-hover:animate-illo-tick`} />
        </Svg>
      );

    case "stories":
      return (
        <Svg className={className}>
          <circle cx="36" cy="44" r="18" strokeDasharray="8 6" className={`${anim} group-hover:animate-illo-spin`} />
          <circle cx="36" cy="44" r="11" />
          <circle cx="64" cy="56" r="18" strokeDasharray="8 6" opacity="0.55" className={`${anim} group-hover:animate-illo-spin-reverse`} />
          <circle cx="64" cy="56" r="11" opacity="0.55" />
          <circle cx="72" cy="28" r="9" fill={accent} stroke="none" />
          <path d="M72 23.5v9M67.5 28h9" stroke="var(--feature-card-bg)" strokeWidth="2.2" />
        </Svg>
      );

    case "friends-calls":
      return (
        <Svg className={className}>
          <circle cx="36" cy="34" r="10" />
          <path d="M18 68c0-11 8-18 18-18s18 7 18 18" />
          <circle cx="63" cy="38" r="8" opacity="0.55" />
          <path d="M63 52c8 0 14 5 15 13" opacity="0.55" />
          <path
            d="M67 70c2.5 6 7.5 11 13.5 13.5l3.5-3.5-4.5-4.5-3 1.5c-2.5-1.3-4.7-3.5-6-6l1.5-3-4.5-4.5-3.5 3.5z"
            fill={accent}
            stroke="none"
            className={`${anim} group-hover:animate-illo-ring`}
          />
        </Svg>
      );

    case "audio-spaces":
      return (
        <Svg className={className}>
          <rect x="14" y="20" width="68" height="56" rx="18" />
          <g strokeWidth="3">
            <path d="M30 42v12" className={`${anim} group-hover:animate-illo-bars`} />
            <path d="M39 36v24" className={`${anim} group-hover:animate-illo-bars [animation-delay:120ms]`} />
            <path d="M48 30v36" stroke={accent} className={`${anim} group-hover:animate-illo-bars [animation-delay:240ms]`} />
            <path d="M57 38v20" className={`${anim} group-hover:animate-illo-bars [animation-delay:360ms]`} />
            <path d="M66 42v12" className={`${anim} group-hover:animate-illo-bars [animation-delay:480ms]`} />
          </g>
        </Svg>
      );

    case "moderation":
      return (
        <Svg className={className}>
          <path d="M48 16l26 10v20c0 16-11 28-26 34C33 74 22 62 22 46V26z" />
          <path d="M38 48l7 7 14-15" stroke={accent} strokeWidth="3" className={`${anim} group-hover:animate-illo-tick`} />
        </Svg>
      );
  }
}
