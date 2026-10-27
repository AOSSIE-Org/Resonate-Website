"use client";

import { preload } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { MockupImage } from "../ui/MockupImage";

// Align with Tailwind's xl breakpoint (1280px)
const MOBILE_BREAKPOINT = "(max-width: 1279px)";

// How far (px) the docked phone's bottom edge extends below the bottom of the
// feature cards, so the cards always sit fully within the phone's height.
const DOCK_OVERHANG = 14;

// Right-to-centre sweep before the Features section. Clearance kept from
// content (px). The sweep is spread over SWEEP_SPEED_RATIO px of vertical
// travel per px of sideways travel, so the slide moves at the same pace as
// the rest of the phone's scroll-driven motion instead of snapping across.
const SWEEP_CLEARANCE = 16;
const SWEEP_SPEED_RATIO = 1.5;

// The phone never grows past its hero size; it only shrinks on short viewports.
const MAX_PHONE_SCALE = 1.0;

// Clamp margins keeping the phone fully inside the viewport (px).
const VIEWPORT_TOP_MARGIN = 75;    // below the fixed navbar
const VIEWPORT_BOTTOM_MARGIN = 28; // above the bottom screen edge
// Portion of the hero -> About phase over which those clamps fade in.
const CLAMP_FADE_IN = 0.35;

const getMarginX = (viewportWidth: number): number => {
  if (viewportWidth >= 1536) return 192;
  if (viewportWidth >= 1024) return 64;
  if (viewportWidth >= 640) return 32;
  return 16;
};

export function HeroVisuals() {
  // Make the hero imagery discoverable from the server-rendered HTML. This
  // component deliberately renders a neutral skeleton on the server (to
  // avoid a hydration mismatch on the mobile/desktop switch), so without
  // these hints the LCP image would only be requested after hydration.
  preload("/assets/mockups/phone.webp", { as: "image", fetchPriority: "high" });
  // Same candidates as the <img> below, so the browser preloads exactly the
  // file it will later pick and never downloads two sizes.
  preload("/assets/mockups/hand.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 1280px)",
    imageSrcSet: "/assets/mockups/hand-480.webp 480w, /assets/mockups/hand.webp 607w",
    imageSizes: "480px",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const aboutImgRef = useRef<HTMLDivElement>(null);
  const metricImgRef = useRef<HTMLDivElement>(null);
  const featuresImgRef = useRef<HTMLDivElement>(null);

  // Lazy initializer avoids sync setState inside effect
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);

    // Set initial value inside effect but via the handler, not synchronously
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    // Pass mq directly to reuse the same handler for initial + change events
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);

    return () =>
      mq.removeEventListener(
        "change",
        handler as (e: MediaQueryListEvent) => void
      );
  }, []);

  // Smooth animation loop (Lenis-friendly), with RAF cleanup
  useEffect(() => {
    if (isMobile !== false) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId: number | null = null;
    let current = 0;


    // 👉 If reduced motion → set static end state and exit
    if (prefersReducedMotion) {
      if (handRef.current) {
        handRef.current.style.opacity = "0";
      }

      if (phoneRef.current) {
        const vw = window.innerWidth;
        const maxTranslateX = vw / 2 - getMarginX(vw);

        phoneRef.current.style.transform = `translate3d(${maxTranslateX}px, 1000px, 0) rotate(-10deg)`;
      }

      return;
    }

    let cachedVh = window.innerHeight;
    let cachedVw = window.innerWidth;
    let top0 = 0;
    let top1 = cachedVh * 1;
    let top2 = cachedVh * 2;
    let top3 = cachedVh * 3;
    let targetY_about = cachedVh * 0.88;
    let targetY_metric = cachedVh * 1.76;
    let targetY_features = cachedVh * 3.12;
    // Layout-derived values cached by updateMeasurements() so the animation
    // loop itself never queries the DOM (no forced reflows while scrolling).
    let phoneTopDoc = 0;              // resting top edge of the phone, document px
    let phoneHeight = 540;            // resting (unscaled) height of the phone
    let dockLimitBottomDoc = Infinity; // lowest allowed phone bottom edge, document px
    // Phone-top positions (document px) between which the phone sweeps from
    // the right side to the centre; see updateMeasurements().
    let sweepStartTopDoc = 0;
    let sweepEndTopDoc = 1;

    const updateMeasurements = () => {
      cachedVh = window.innerHeight;
      cachedVw = window.innerWidth;

      const sy = window.scrollY;
      const heroEl = document.getElementById("section-hero");
      const aboutEl = document.getElementById("section-about");
      const metricEl = document.getElementById("section-metric");
      const featuresEl = document.getElementById("section-features");
      const marqueeEl = document.getElementById("features-marquee-row");
      const hoverCueEl = document.getElementById("features-hover-cue-row");
      const phoneSlotEl = document.getElementById("features-phone-slot");
      const phoneEl = phoneRef.current;

      if (heroEl && aboutEl && metricEl && featuresEl && phoneEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        const metricRect = metricEl.getBoundingClientRect();
        const featuresRect = featuresEl.getBoundingClientRect();

        top0 = heroRect.top + sy;
        top1 = aboutRect.top + sy - cachedVh * 0.2;
        // top2: End of Metric section (phone completes straight downward translation to targetY_metric on right side)
        top2 = featuresRect.top + sy - cachedVh * 0.85;
        // top3: Features section active (phone moves diagonally to center at targetY_features)
        top3 = featuresRect.top + sy - cachedVh * 0.15;

        // offsetTop/offsetHeight ignore CSS transforms, so they give the
        // phone's resting layout position whatever the animation state is.
        phoneHeight = phoneEl.offsetHeight || phoneHeight;
        let offsetSum = 0;
        let node: HTMLElement | null = phoneEl;
        while (node) {
          offsetSum += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        phoneTopDoc = offsetSum;
        const phoneInitialTopDoc = phoneTopDoc;
        const phoneInitialBottomDoc = phoneTopDoc + phoneHeight;
        const unscaledPhoneHeight = phoneHeight;

        // Center phone within About section content area
        const aboutCenterDoc = (aboutRect.top + sy) + aboutRect.height * 0.45;
        targetY_about = (aboutCenterDoc - unscaledPhoneHeight / 2) - phoneInitialTopDoc;

        // Center phone within Metric section content area
        const metricCenterDoc = (metricRect.top + sy) + metricRect.height * 1.5;
        targetY_metric = (metricCenterDoc - unscaledPhoneHeight / 2) - phoneInitialTopDoc;

        dockLimitBottomDoc = Infinity;
        if (marqueeEl) {
          // Dock the phone behind the feature-card row: its bottom edge sits
          // DOCK_INSET px above the row's bottom so the cards (which paint
          // above the phone) cover its lower part like a dock.
          const cardEl = marqueeEl.querySelector("button") ?? marqueeEl;
          const dockBottomDoc = cardEl.getBoundingClientRect().bottom + sy + DOCK_OVERHANG;
          targetY_features = dockBottomDoc - phoneInitialBottomDoc;
          dockLimitBottomDoc = dockBottomDoc;
        } else if (hoverCueEl) {
          const hoverCueRect = hoverCueEl.getBoundingClientRect();
          // Position phone bottom safely 16px above the "Hover over the feature cards" title
          const hoverCueTopDoc = hoverCueRect.top + sy - 16;
          targetY_features = hoverCueTopDoc - phoneInitialBottomDoc;
          dockLimitBottomDoc = hoverCueTopDoc;
        } else if (phoneSlotEl) {
          const slotRect = phoneSlotEl.getBoundingClientRect();
          targetY_features = (slotRect.top + sy) - phoneInitialTopDoc;
        } else {
          targetY_features = (featuresRect.top + sy) - top0;
        }

        // Sweep window. The phone sits on the right through the Metric
        // section and docks in the centre of Features. It may start moving
        // once the last Metric content under the *centred* phone (A) is above
        // its top edge, and must be centred before the right-hand tech-stack
        // heading (T) reaches its bottom edge. Measured from untransformed
        // layout (offset*), so the current animation pose doesn't matter.
        const phoneImg = phoneEl.querySelector("img");
        let centreLeft = 0;
        let el: HTMLElement | null = phoneImg;
        while (el) {
          centreLeft += el.offsetLeft;
          el = el.offsetParent as HTMLElement | null;
        }
        const centreRight = centreLeft + (phoneImg?.offsetWidth ?? 0);
        let obstacleBottomDoc = -Infinity;
        metricEl.querySelectorAll("p, h2, a, img").forEach((node) => {
          const r = node.getBoundingClientRect();
          if (r.height === 0 || r.right <= centreLeft || r.left >= centreRight) return;
          obstacleBottomDoc = Math.max(obstacleBottomDoc, r.bottom + sy);
        });
        const techHeading = document.querySelector("#features-top-row h3");
        const techTopDoc = techHeading
          ? techHeading.getBoundingClientRect().top + sy
          : featuresRect.top + sy;
        if (!Number.isFinite(obstacleBottomDoc)) {
          obstacleBottomDoc = metricRect.bottom + sy - phoneHeight / 2;
        }
        let start = obstacleBottomDoc + SWEEP_CLEARANCE;
        let end = techTopDoc - SWEEP_CLEARANCE - phoneHeight;
        const sideways = Math.min(cachedVw * 0.28, cachedVw / 2 - getMarginX(cachedVw));
        const span = sideways * SWEEP_SPEED_RATIO;
        if (end - start < span) {
          // Clear space is shorter than an unhurried slide: centre the slide
          // on the middle of that space rather than speeding it up.
          const mid = (start + end) / 2;
          start = mid - span / 2;
          end = mid + span / 2;
        }
        // The phone stops moving vertically once docked, so the slide must be
        // complete by then or it would freeze off-centre.
        const dockTopDoc = Number.isFinite(dockLimitBottomDoc)
          ? dockLimitBottomDoc - phoneHeight
          : Infinity;
        if (end > dockTopDoc) {
          start -= end - dockTopDoc;
          end = dockTopDoc;
        }
        sweepStartTopDoc = start;
        sweepEndTopDoc = end;
      }
    };

    updateMeasurements();

    let isIntersecting = true;

    const animate = () => {
      if (!isIntersecting) {
        rafId = null;
        return;
      }

      const sy = window.scrollY;

      // Compute scroll progress dynamically:
      // 0 -> 1: Hero to About (moves to right side, targetY_about, tilts -10deg)
      // 1 -> 2: About through Metric (straightens to 0deg, translates straight DOWNWARD on right side to targetY_metric)
      // 2 -> 3: Metric to Features (translates DIAGONALLY to center, targetY_features)
      let target = 0;
      if (sy <= top0) {
        target = 0;
      } else if (sy <= top1) {
        target = (sy - top0) / (top1 - top0 || 1);
      } else if (sy <= top2) {
        target = 1.0 + (sy - top1) / (top2 - top1 || 1);
      } else if (sy <= top3) {
        target = 2.0 + (sy - top2) / (top3 - top2 || 1);
      } else {
        target = 3.0;
      }

      target = Math.min(Math.max(target, 0), 3.0);
      // No extra easing here: Lenis already smooths the scroll itself, and
      // lagging behind it made the viewport clamps below switch on and off
      // while scrolling down, which read as stutter. Driving the phone as a
      // pure function of scroll position keeps the motion continuous both ways.
      current = target;

      const maxTranslateX = cachedVw / 2 - getMarginX(cachedVw);

      const handOpacity = Math.max(0, 1 - current * 4);
      
      // Rotation:
      // current <= 1: rotates from 0 to -10deg (in About section)
      // 1 < current <= 1.3: straightens up from -10deg back to 0deg right after About section
      // 1.3 < current: stays straight at 0deg
      let phoneRotate = 0;
      if (current <= 1) {
        phoneRotate = current * -10;
      } else if (current <= 1.3) {
        phoneRotate = -10 * ((1.3 - current) / 0.3);
      } else {
        phoneRotate = 0;
      }


      // Responsive scale for the phone: keep it at its hero size and only
      // shrink it when the viewport is too short to show it whole.
      const phoneEl = phoneRef.current;
      const basePhoneHeight = phoneHeight;
      const maxAvailableHeight = cachedVh - 130; // 75px navbar padding + 55px bottom margin
      const maxScaleByVh = Math.max(0.70, (maxAvailableHeight / (basePhoneHeight || 540)) * 0.90);
      const targetPhoneScale = Math.min(MAX_PHONE_SCALE, maxScaleByVh);

      let phoneScale = 1.0;
      if (current <= 1) {
        phoneScale = 1.0 + current * (targetPhoneScale - 1.0);
      } else {
        phoneScale = targetPhoneScale;
      }

      // Vertical Translation: dynamically interpolated across real DOM target Y coordinates
      let phoneTranslateY = 0;
      if (current <= 1) {
        phoneTranslateY = current * targetY_about;
      } else if (current <= 2) {
        phoneTranslateY = targetY_about + (current - 1) * (targetY_metric - targetY_about);
      } else {
        phoneTranslateY = targetY_metric + (current - 2) * (targetY_features - targetY_metric);
      }

      // Bounds Clamping (keeps entire phone 100% visible, above hover title & footer at all times).
      // Faded in over the first part of the hero exit rather than switched on
      // at a threshold: with the pose tied directly to scroll position, a hard
      // switch showed up as a sudden jump of the phone.
      const unclampedTranslateY = phoneTranslateY;
      if (phoneEl) {
        const phoneInitialTopDoc = phoneTopDoc;
        const currentScaledHeight = basePhoneHeight * phoneScale;
        
        const minAllowedViewportTop = VIEWPORT_TOP_MARGIN;
        const maxAllowedViewportBottom = cachedVh - VIEWPORT_BOTTOM_MARGIN;

        // 1. Viewport bottom clamping
        const currentViewportBottom = (phoneInitialTopDoc + phoneTranslateY) + currentScaledHeight - sy;
        if (currentViewportBottom > maxAllowedViewportBottom) {
          phoneTranslateY -= (currentViewportBottom - maxAllowedViewportBottom);
        }

        // 2. Viewport top clamping
        const currentViewportTop = (phoneInitialTopDoc + phoneTranslateY) - sy;
        if (currentViewportTop < minAllowedViewportTop) {
          phoneTranslateY += (minAllowedViewportTop - currentViewportTop);
        }

        // 3. Document bottom clamping: once docked behind the feature cards the
        //    phone scrolls with the page like regular content, so it never
        //    slides out below the card row (or the hover title / footer).
        if (Number.isFinite(dockLimitBottomDoc)) {
          const currentPhoneBottomDoc = phoneInitialTopDoc + currentScaledHeight;
          phoneTranslateY = Math.min(phoneTranslateY, dockLimitBottomDoc - currentPhoneBottomDoc);
        }

        const clampWeight = Math.min(Math.max(current / CLAMP_FADE_IN, 0), 1);
        const k = clampWeight * clampWeight * (3 - 2 * clampWeight);
        phoneTranslateY = unclampedTranslateY + (phoneTranslateY - unclampedTranslateY) * k;
      }

      // Horizontal Translation: slides centre -> right during the About phase,
      // stays right through Metric, then sweeps back to the centre as a
      // function of the phone's own vertical position (sweep window above),
      // so it is identical whichever way the page is scrolled.
      const finalTranslateX = Math.min(cachedVw * 0.28, maxTranslateX);
      let phoneTranslateX: number;
      if (current <= 1) {
        phoneTranslateX = current * finalTranslateX;
      } else {
        const phoneTopNow = phoneTopDoc + phoneTranslateY;
        const t = Math.min(
          Math.max((phoneTopNow - sweepStartTopDoc) / (sweepEndTopDoc - sweepStartTopDoc || 1), 0),
          1
        );
        const eased = t * t * (3 - 2 * t);
        phoneTranslateX = finalTranslateX * (1 - eased);
      }

      if (handRef.current) {
        handRef.current.style.opacity = `${handOpacity}`;
      }

      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate3d(${phoneTranslateX}px, ${phoneTranslateY}px, 0) rotate(${phoneRotate}deg) scale(${phoneScale})`;
      }

      // Calculate piecewise opacities for the mockups
      let heroOpacity = 0;
      let aboutOpacity = 0;
      let metricOpacity = 0;
      let featuresOpacity = 0;

      if (current <= 0.3) {
        heroOpacity = 1;
      } else if (current < 0.7) {
        heroOpacity = (0.7 - current) / 0.4;
      } else {
        heroOpacity = 0;
      }

      if (current <= 0.3) {
        aboutOpacity = 0;
      } else if (current < 0.7) {
        aboutOpacity = (current - 0.3) / 0.4;
      } else if (current <= 1.3) {
        aboutOpacity = 1;
      } else if (current < 1.7) {
        aboutOpacity = (1.7 - current) / 0.4;
      } else {
        aboutOpacity = 0;
      }

      if (current <= 1.3) {
        metricOpacity = 0;
      } else if (current < 1.7) {
        metricOpacity = (current - 1.3) / 0.4;
      } else if (current <= 2.3) {
        metricOpacity = 1;
      } else if (current < 2.7) {
        metricOpacity = (2.7 - current) / 0.4;
      } else {
        metricOpacity = 0;
      }

      if (current <= 2.3) {
        featuresOpacity = 0;
      } else if (current < 2.7) {
        featuresOpacity = (current - 2.3) / 0.4;
      } else {
        featuresOpacity = 1;
      }

      if (heroImgRef.current) heroImgRef.current.style.opacity = `${heroOpacity}`;
      if (aboutImgRef.current) aboutImgRef.current.style.opacity = `${aboutOpacity}`;
      if (metricImgRef.current) metricImgRef.current.style.opacity = `${metricOpacity}`;
      if (featuresImgRef.current) featuresImgRef.current.style.opacity = `${featuresOpacity}`;

      // One frame per scroll event is enough: the pose depends only on scrollY.
      rafId = null;
    };

    const handleScroll = () => {
      if (!isIntersecting) return;
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
      updateMeasurements();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && rafId === null) {
          rafId = requestAnimationFrame(animate);
        }
      },
      {
        rootMargin: "500% 0px 500% 0px",
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [isMobile]);

  // Both layouts are always rendered and toggled with CSS at the `xl`
  // breakpoint, the same 1280px line as MOBILE_BREAKPOINT. Rendering the
  // real markup on the server lets the browser paint the hero image before
  // hydration (it used to wait behind a skeleton); `isMobile` now only
  // decides whether the scroll animation effect runs.
  return (
    <>
      {/* Phone and tablet: static phone, no animation */}
      <div className="xl:hidden w-[226px] sm:w-[266px] aspect-[9/18] relative mx-auto">
        <MockupImage
          src="/assets/mockups/phone.webp"
          alt="Resonate app interface"
          fill
          className="object-contain"
          sizes="(min-width: 640px) 266px, 226px"
          priority
          placeholderMedia="(min-width: 1280px)"
        />
      </div>

      {/* Desktop: hand holding the scroll-animated phone */}
      <div
        ref={sectionRef}
        className="hidden xl:block relative w-full max-w-[300px] min-[400px]:max-w-[360px] md:max-w-[480px] mx-auto"
      >
        <div
          ref={handRef}
          className="relative w-full left-[7.4%]"
          style={{ willChange: "opacity" }}
        >
          <picture>
            {/* Below xl this block is display:none; the 1px source keeps
                browsers from downloading the real image there. */}
            <source
              media="(max-width: 1279px)"
              srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            />
            <img
              src="/assets/mockups/hand.webp"
              srcSet="/assets/mockups/hand-480.webp 480w, /assets/mockups/hand.webp 607w"
              sizes="480px"
              alt="Hand holding phone"
              width={500}
              height={900}
              className="w-full h-auto object-contain"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>

      <div
        ref={phoneRef}
        className="absolute top-[0.4%] left-[20%] w-[88%] z-30"
        style={{
          transformOrigin: "center top",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
        }}
      >
        <div className="w-2/3 overflow-hidden relative">
          {/* Hero Screen */}
          <div
            ref={heroImgRef}
            className="w-full h-auto transition-opacity duration-100 ease-in-out"
            style={{ opacity: 1, willChange: "opacity" }}
          >
            <MockupImage
              src="/assets/mockups/phone.webp"
              alt="Resonate app interface"
              width={400}
              height={800}
              className="w-full h-auto"
              sizes="282px"
              priority
              placeholderMedia="(max-width: 1279px)"
            />
          </div>

          {/* About Screen */}
          <div
            ref={aboutImgRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-100 ease-in-out"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <MockupImage
              src="/assets/mockups/phone_about.webp"
              alt="About Resonate app interface"
              width={400}
              height={800}
              className="w-full h-full object-fill"
              sizes="282px"
              placeholderMedia="(max-width: 1279px)"
            />
          </div>

          {/* Metric Screen */}
          <div
            ref={metricImgRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-100 ease-in-out"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <MockupImage
              src="/assets/mockups/phone_metric.webp"
              alt="Metric Resonate app interface"
              width={400}
              height={800}
              className="w-full h-full object-fill"
              sizes="282px"
              placeholderMedia="(max-width: 1279px)"
            />
          </div>

          {/* Features Screen */}
          <div
            ref={featuresImgRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-100 ease-in-out"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <MockupImage
              src="/assets/mockups/phone_features.webp"
              alt="Features Resonate app interface"
              width={400}
              height={800}
              className="w-full h-full object-fill"
              sizes="282px"
              placeholderMedia="(max-width: 1279px)"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
