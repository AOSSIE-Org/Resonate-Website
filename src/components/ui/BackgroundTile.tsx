"use client";

import { useEffect, useRef } from "react";

// Use this component in below shown way and adjust the height according to your use case.
/*
    <div className="w-full h-[50vh]">
      <BackgroundTile />
    </div>
*/

// Stable random values generated once at module level
const PHASES = Array.from({ length: 6 }, () => Math.random() * Math.PI * 2);
const FREQS  = Array.from({ length: 6 }, (_, i) => 0.3 + i * 0.13);

// ── SPEED CONFIGURATION ───────────────────────────────────────────
// Change this! 0.5 is subtle, 5.0 is incredibly fast.
const TRANSLATION_SPEED = 0.75;

// Vertical squiggling speed
const UNDULATION_SPEED = 0.055;
// ──────────────────────────────────────────────────────────────────

const BackgroundTile = () => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number | null>(null);
  const lineColorRef = useRef<string>("");
  const isRunning    = useRef(false);
  const timeRef      = useRef(0);
  const ampRef       = useRef(0);
  const ampSmoothed  = useRef(0);

  // Forward translation trackers
  const xOffsetRef    = useRef(0);
  const targetXSpeed  = useRef(0);
  const currentXSpeed = useRef(0);

  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isIntersecting = false;

    const updateLineColor = () => {
      lineColorRef.current = getComputedStyle(document.documentElement)
        .getPropertyValue("--line-color")
        .trim();
    };
    updateLineColor();

    const themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class" || m.attributeName === "data-theme") {
          updateLineColor();
        }
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    const setSize = () => {
      const dpr     = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const render = () => {
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;
      const amp = ampSmoothed.current;
      const t   = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const N = 6;
      const spacing = w / (N - 1);
      const patternWidth = N * spacing;

      const xOffset = ((xOffsetRef.current % patternWidth) + patternWidth) % patternWidth;

      const pts = [];
      for (let i = -N * 2; i <= N * 2; i++) {
        const idx = ((i % N) + N) % N;
        const w1 = Math.sin(t * FREQS[idx]        + PHASES[idx])        * 0.50;
        const w2 = Math.sin(t * FREQS[idx] * 0.43 + PHASES[idx] * 1.77) * 0.30;
        const w3 = Math.cos(t * FREQS[idx] * 0.27 + PHASES[idx] * 0.85) * 0.20;

        pts.push({
          x: i * spacing + xOffset,
          y: h * 0.5 + (w1 + w2 + w3) * h * amp * 0.95,
        });
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];
        const k  = 0.5;
        ctx.bezierCurveTo(
          p1.x + (p2.x - p0.x) * k / 3,
          p1.y + (p2.y - p0.y) * k / 3,
          p2.x - (p3.x - p1.x) * k / 3,
          p2.y - (p3.y - p1.y) * k / 3,
          p2.x, p2.y,
        );
      }

      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0,    "transparent");
      gradient.addColorStop(0.12, lineColorRef.current);
      gradient.addColorStop(0.88, lineColorRef.current);
      gradient.addColorStop(1,    "transparent");

      ctx.strokeStyle = gradient;
      ctx.lineWidth   = 14;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();
    };

    render();

    const ro = new ResizeObserver(() => { setSize(); render(); });
    ro.observe(canvas);

    const tick = () => {
      if (!isIntersecting) {
        rafRef.current = null;
        return;
      }

      // Lerp toward target, then decay target — order matters
      currentXSpeed.current += (targetXSpeed.current - currentXSpeed.current) * 0.15;
      targetXSpeed.current  *= 0.85;
      xOffsetRef.current    += currentXSpeed.current;

      const targetAmp = ampRef.current;

      if (!isRunning.current) {
        ampSmoothed.current += (targetAmp - ampSmoothed.current) * 0.18;

        if (Math.abs(ampSmoothed.current - targetAmp) > 0.001 || Math.abs(currentXSpeed.current) > 0.01) {
          render();
          rafRef.current = requestAnimationFrame(tick);
        } else {
          ampSmoothed.current = targetAmp;
          render();
          rafRef.current = null;
        }
        return;
      }

      timeRef.current     += UNDULATION_SPEED;
      ampSmoothed.current += (targetAmp - ampSmoothed.current) * 0.18;

      render();
      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      isRunning.current = false;
    };

    let lastWheelTime = 0;
    let lastScrollY   = typeof window !== "undefined" ? window.scrollY : 0;

    const triggerScroll = (amp: number) => {
      ampRef.current = amp;
      startLoop();
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(stopLoop, 80);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isIntersecting) return;
      lastWheelTime = Date.now();
      const vel = Math.min(Math.abs(e.deltaY) / 60, 1);
      triggerScroll(0.18 + vel * 0.74);

      // Direct, readable speed — TRANSLATION_SPEED is 1:1 with px/frame
      targetXSpeed.current = Math.sign(e.deltaY) * vel * TRANSLATION_SPEED * 8;

      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!isIntersecting) return;
      const currentScrollY = window.scrollY;
      const deltaY         = currentScrollY - lastScrollY;
      lastScrollY          = currentScrollY;

      if (Math.abs(deltaY) > 0) {
        targetXSpeed.current = Math.sign(deltaY) * Math.min(Math.abs(deltaY) / 60, 1) * TRANSLATION_SPEED * 8;
        if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
      }

      if (Date.now() - lastWheelTime < 100) return;
      triggerScroll(0.55);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          render();
        } else {
          stopLoop();
          if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    window.addEventListener("wheel",  onWheel,  { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopLoop();
      ro.disconnect();
      themeObserver.disconnect();
      observer.disconnect();
      if (rafRef.current)    cancelAnimationFrame(rafRef.current);
      if (stopTimer.current) clearTimeout(stopTimer.current);
      window.removeEventListener("wheel",  onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      style={{
        background:   "var(--tile-bg, #1a1a1a)",
        border:       "0.8px solid var(--tile-stroke, rgba(255,255,255,0.08))",
        borderRadius: "24px",
        width:        "100%",
        overflow:     "hidden",
        position:     "relative",
      }}
      className="w-full h-full"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset:    0,
          width:    "100%",
          height:   "100%",
          display:  "block",
        }}
      />
    </div>
  );
};

export default BackgroundTile;