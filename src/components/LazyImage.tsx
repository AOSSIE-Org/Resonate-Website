import Image from 'next/image';

// Discriminated union to ensure width/height are required when fill is false
type LazyImageProps =
  | {
      src: string;
      alt: string;
      fill: true;
      width?: never;
      height?: never;
      className?: string;
      priority?: boolean;
      sizes?: string;
      style?: React.CSSProperties;
    }
  | {
      src: string;
      alt: string;
      fill?: false;
      width: number;
      height: number;
      className?: string;
      priority?: boolean;
      sizes?: string;
      style?: React.CSSProperties;
    };

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  style,
}: LazyImageProps) {
  // Use Next.js Image for all images (including external URLs)
  // Note: External domains must be whitelisted in next.config.ts remotePatterns
  // This ensures Next.js optimization (AVIF/WEBP conversion, responsive sizing, CDN caching)
  
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      style={style}
    />
  );
}
