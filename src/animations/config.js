export const DURATIONS = {
  fast: 0.5,
  normal: 0.8,
  slow: 1,
  slower: 1.2,
};

export const EASING = {
  power2: "power2.out",
  power3: "power3.out",
  power4: "power4.out",
  back: "back.out(1.7)",
  bounce: "bounce.out",
};

export const STAGGER = {
  small: 0.1,
  medium: 0.2,
  large: 0.4,
};

export const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
};
