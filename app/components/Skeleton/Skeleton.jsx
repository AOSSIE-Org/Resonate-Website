import styles from "./Skeleton.module.css";

export function SkeletonText({ lines = 3, className = "", style = {} }) {
  return (
    <div className={className} style={style}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={styles.skeleton}
          style={{
            height: "1em",
            marginBottom: i < lines - 1 ? "0.5em" : "0",
            width: i === lines - 1 ? "70%" : "100%",
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonTitle({ className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonTitle} ${className}`}
      style={style}
    />
  );
}

export function SkeletonButton({ className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonButton} ${className}`}
      style={style}
    />
  );
}

export function SkeletonImage({ aspectRatio = "4/3", className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonImage} ${className}`}
      style={{ "--skeleton-aspect-ratio": aspectRatio, ...style }}
    />
  );
}

export function SkeletonCircle({ size = 100, className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        ...style,
      }}
    />
  );
}

export function SkeletonCard({ className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonCard} ${className}`}
      style={style}
    />
  );
}

export function SkeletonRow({ count = 3, className = "", style = {} }) {
  return (
    <div className={`${styles.skeletonRow} ${className}`} style={style}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeleton} style={{ height: "80px" }} />
      ))}
    </div>
  );
}

export function SkeletonIcon({ className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonIcon} ${className}`}
      style={style}
    />
  );
}
