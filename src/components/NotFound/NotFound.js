import React, { useEffect } from "react";
import "./NotFound.css";
import gsap from "gsap";

const NotFound = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".not-found h1",
      { y: -50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(
      ".not-found p",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ".not-found a",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }, []);

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <a href="/">Go Home</a>
    </div>
  );
};

export default NotFound;