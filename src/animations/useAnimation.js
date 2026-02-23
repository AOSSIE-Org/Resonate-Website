import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { checkPrefersReducedMotion, getInstantAnimationProps } from "./reducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

export const useAnimation = (animationFn, dependencies = []) => {
  const ctxRef = useRef(null);
  const reducedMotion = checkPrefersReducedMotion();

  const runAnimation = useCallback(() => {
    if (reducedMotion) {
      return;
    }

    ctxRef.current = gsap.context(() => {
      animationFn();
    });
  }, [animationFn, reducedMotion]);

  useEffect(() => {
    runAnimation();

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [runAnimation, ...dependencies]);

  return ctxRef;
};

export const createAnimationContext = (callback) => {
  return gsap.context(callback);
};

export const cleanupAnimation = (ctx) => {
  if (ctx) {
    ctx.revert();
  }
};

export { gsap, ScrollTrigger, checkPrefersReducedMotion, getInstantAnimationProps };
