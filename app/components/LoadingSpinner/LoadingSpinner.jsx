import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="skeleton-hero">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-subtitle"></div>
          <div className="skeleton-line skeleton-text"></div>
          <div className="skeleton-buttons">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
      <div className="skeleton-features">
        {[1, 2].map((i) => (
          <div key={i} className="skeleton-feature-item">
            <div className="skeleton-feature-image"></div>
            <div className="skeleton-feature-text"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
