import { DURATIONS, EASING } from "./config.js";

export const fadeInUp = {
  from: { y: 50, opacity: 0 },
  to: { y: 0, opacity: 1, duration: DURATIONS.normal, ease: EASING.power3 },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: DURATIONS.normal, ease: EASING.power3 },
};

export const scaleIn = {
  from: { scale: 0.8, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: DURATIONS.normal, ease: EASING.power3 },
};

export const slideFromLeft = {
  from: { x: -50, opacity: 0 },
  to: { x: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
};

export const slideFromRight = {
  from: { x: 50, opacity: 0 },
  to: { x: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
};

export const slideFromBottom = {
  from: { y: 30, opacity: 0 },
  to: { y: 0, opacity: 1, duration: DURATIONS.normal, ease: EASING.power3 },
};

export const rotateXIn = {
  from: { rotateX: -20, y: 100, opacity: 0 },
  to: { rotateX: 0, y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power4 },
};

export const staggerReveal = (stagger = 0.1) => ({
  from: { y: 30, opacity: 0 },
  to: {
    y: 0,
    opacity: 1,
    duration: DURATIONS.normal,
    stagger,
    ease: EASING.back,
  },
});

export const scaleInStagger = (stagger = 0.2) => ({
  from: { scale: 0.8, opacity: 0 },
  to: {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    stagger,
    ease: EASING.back,
  },
});
