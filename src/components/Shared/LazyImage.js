import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt = '', className = '', loading = 'lazy', ...props }) => {
  const imgRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(() => {
    if (loading === 'eager' || 'loading' in HTMLImageElement.prototype) return src;
    return undefined;
  });

  useEffect(() => {
    if (loading === 'eager') {
      setCurrentSrc(src);
      return;
    }

    if ('loading' in HTMLImageElement.prototype) {
      setCurrentSrc(src);
      return;
    }

    // If IntersectionObserver isn't available (e.g., test environment, older browsers), fall back to immediate load
    if (typeof IntersectionObserver === 'undefined') {
      setCurrentSrc(src);
      return;
    }

    let observer;
    const imgEl = imgRef.current;
    if (imgEl && !currentSrc) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            if (observer) observer.disconnect();
          }
        });
      }, { rootMargin: '200px' });

      observer.observe(imgEl);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [src, loading, currentSrc]);

  const imgAttrs = {};
  if ('loading' in HTMLImageElement.prototype) imgAttrs.loading = loading;

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={className}
      {...imgAttrs}
      {...props}
    />
  );
};

export default LazyImage;
