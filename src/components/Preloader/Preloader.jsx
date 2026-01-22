import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const spinnerRef = useRef(null);

 useEffect(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    // Make all elements visible immediately
    gsap.set([textRef.current, spinnerRef.current, loaderRef.current], { opacity: 1 });
    
    // Call onComplete to continue
    onComplete?.();
    return; // exit early, skip animations
  }

  // Spinner rotation
  gsap.to(spinnerRef.current, {
    rotate: 360,
    repeat: -1,
    duration: 1,
    ease: "linear",
  });

  // Timeline for text and spinner
  const tl = gsap.timeline({
    delay: 0.2, // avoid black flash
    onComplete,
  });

  tl.fromTo(
    textRef.current,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.6 }
  )
    .fromTo(
      spinnerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      "-=0.3"
    )
    .to(
      [textRef.current, spinnerRef.current],
      { opacity: 0, duration: 0.4 },
      "+=0.4"
    )
    .to(loaderRef.current, { opacity: 0, duration: 0.3 });
}, [onComplete]);


  return (
    <div className="preloader" ref={loaderRef}>
      <h1 ref={textRef}>RESONATE</h1>
      <div className="spinner-btn" ref={spinnerRef}></div>
    </div>
  );
};

export default Preloader;
