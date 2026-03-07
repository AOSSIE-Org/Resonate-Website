"use client";

import { useEffect, useRef } from "react";

// Stable random values generated once at module level — fixes "impure function in render" warning
const PHASES = Array.from({ length: 6 }, () => Math.random() * Math.PI * 2);
const FREQS  = Array.from({ length: 6 }, (_, i) => 0.3 + i * 0.13);

interface BackgroundTileProps {
  /** Height of the tile in viewport height units. Defaults to 50. */
  heightVh?: number;
}

const BackgroundTile = ({ heightVh = 50 }: BackgroundTileProps) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number | null>(null);
  const lineColorRef = useRef<string>("");
  const isRunning    = useRef(false);
  const timeRef      = useRef(0);
  const ampRef       = useRef(0);      // target amplitude
  const ampSmoothed  = useRef(0);      // smoothed amplitude (what's actually rendered)
  const stopTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── cache line color, refresh on theme changes ────────────────────
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

    // ── resize ────────────────────────────────────────────────────────
    const setSize = () => {
      const dpr     = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    // ── render one frame ──────────────────────────────────────────────
    const render = () => {
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;
      const amp = ampSmoothed.current;
      const t   = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const N   = 6;
      const pts = Array.from({ length: N }, (_, i) => {
        const w1 = Math.sin(t * FREQS[i]        + PHASES[i])        * 0.50;
        const w2 = Math.sin(t * FREQS[i] * 0.43 + PHASES[i] * 1.77) * 0.30;
        const w3 = Math.cos(t * FREQS[i] * 0.27 + PHASES[i] * 0.85) * 0.20;
        return {
          x: (i / (N - 1)) * w,
          y: h * 0.5 + (w1 + w2 + w3) * h * amp * 0.95,
        };
      });

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 0; i < N - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(N - 1, i + 2)];
        const k  = 0.5;
        ctx.bezierCurveTo(
          p1.x + (p2.x - p0.x) * k / 3,
          p1.y + (p2.y - p0.y) * k / 3,
          p2.x - (p3.x - p1.x) * k / 3,
          p2.y - (p3.y - p1.y) * k / 3,
          p2.x, p2.y,
        );
      }

      ctx.strokeStyle = lineColorRef.current;  // ← cached, not computed per-frame
      ctx.lineWidth   = 14;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();
    };

    render(); // initial flat line

    // ── loop — only alive while scrolling ─────────────────────────────
    const tick = () => {
      if (!isRunning.current) {
        // Smoothly finish lerping to the frozen target, then stop
        const target  = ampRef.current;
        const current = ampSmoothed.current;
        ampSmoothed.current += (target - current) * 0.18;

        if (Math.abs(ampSmoothed.current - target) > 0.001) {
          render();
          rafRef.current = requestAnimationFrame(tick);
        } else {
          ampSmoothed.current = target; // snap to exact target
          render();
          rafRef.current = null;
        }
        return;
      }

      timeRef.current += 0.055;

      // Lerp smoothed amp toward target — fast rise
      const target  = ampRef.current;
      const current = ampSmoothed.current;
      ampSmoothed.current += (target - current) * 0.18;

      render();
      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }
    };

    const stopLoop = () => {
      // Stop animating time — amplitude stays frozen at current ampRef value
      isRunning.current = false;
    };

    // ── scroll / wheel ─────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      const vel      = Math.min(Math.abs(e.deltaY) / 60, 1);
      ampRef.current = 0.18 + vel * 0.74;
      startLoop();
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(stopLoop, 80);
    };

    const onScroll = () => {
      ampRef.current = 0.55;
      startLoop();
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(stopLoop, 80);
    };

    window.addEventListener("wheel",  onWheel,  { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopLoop();
      ro.disconnect();
      themeObserver.disconnect();
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
        height:       `${heightVh}vh`,
        overflow:     "hidden",
        position:     "relative",
      }}
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