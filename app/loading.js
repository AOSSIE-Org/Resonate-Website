import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <span className={styles.loadingText}>Loading content...</span>
    </div>
  );
}
