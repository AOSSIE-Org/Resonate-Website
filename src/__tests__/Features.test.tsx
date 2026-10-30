import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import en from '@/messages/en.json';

// Mock next-intl translations
vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace && (en as Record<string, Record<string, string>>)[namespace]) {
      return (en as Record<string, Record<string, string>>)[namespace][key] ?? key;
    }
    return key;
  },
}));

// Mock navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ replace: vi.fn() }),
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock useIntersectionObserver hook to control visibility
let mockIsVisible = true;
vi.mock('@/components/ui/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isVisible: mockIsVisible,
  }),
}));

import { Features } from '@/components/home/Features';

describe('Features Component', () => {
  beforeEach(() => {
    mockIsVisible = true;
    vi.clearAllMocks();
  });

  describe('Marquee Stylesheet Regression Tests', () => {
    it('emits styles that pause on hover only on hover-capable devices and on focus-visible', () => {
      const { container } = render(<Features />);
      const marqueeRow = container.querySelector('#features-marquee-row');
      expect(marqueeRow).toBeInTheDocument();

      const styleTag = marqueeRow?.querySelector('style');
      expect(styleTag).toBeInTheDocument();
      const css = styleTag?.innerHTML || '';

      // Verify @media (hover: hover) scopes the hover pause
      expect(css).toMatch(/@media\s*\(\s*hover:\s*hover\s*\)\s*\{\s*\.animate-marquee:hover\s*\{\s*animation-play-state:\s*paused;\s*\}\s*\}/);

      // Verify :has(:focus-visible) pauses for keyboard navigation
      expect(css).toMatch(/\.animate-marquee:has\(:focus-visible\)\s*\{\s*animation-play-state:\s*paused;\s*\}/);

      // Verify unconditional focus-within is completely removed
      expect(css).not.toContain('.animate-marquee:focus-within');
    });
  });

  describe('Feature Card Pointer vs Keyboard Click Activation', () => {
    it('blurs button on pointer or touch click (detail > 0) to allow marquee to resume', () => {
      // Mock matchMedia so (hover: hover) returns false (simulating a touch device)
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(hover: hover)' ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<Features />);
      const marqueeRow = container.querySelector('#features-marquee-row');
      const buttons = marqueeRow?.querySelectorAll('button') || [];
      expect(buttons.length).toBeGreaterThan(0);

      const firstCard = buttons[0];

      firstCard.focus();
      expect(document.activeElement).toBe(firstCard);

      // Pointer/touch click sets event detail to 1 (or higher)
      fireEvent.click(firstCard, { detail: 1 });

      // After a pointer click on a non-hover device, the card should lose focus
      expect(document.activeElement).not.toBe(firstCard);

      window.matchMedia = originalMatchMedia;
    });

    it('preserves button focus on keyboard activation with Enter or Space (detail === 0)', () => {
      const { container } = render(<Features />);
      const marqueeRow = container.querySelector('#features-marquee-row');
      const buttons = marqueeRow?.querySelectorAll('button') || [];
      expect(buttons.length).toBeGreaterThan(0);

      const firstCard = buttons[0];
      const blurSpy = vi.spyOn(firstCard, 'blur');

      firstCard.focus();
      expect(document.activeElement).toBe(firstCard);

      // Keyboard activation via Enter/Space sets event detail to 0
      fireEvent.click(firstCard, { detail: 0 });

      expect(blurSpy).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(firstCard);
    });
  });

  describe('Desktop Hover and Focus Cue Feedback', () => {
    it('shows hover cue prompt by default and active feature title on hover or focus', () => {
      const { container } = render(<Features />);
      const hoverCueRow = container.querySelector('#features-hover-cue-row');
      expect(hoverCueRow).toBeInTheDocument();

      // Default state shows hover cue prompt
      expect(hoverCueRow).toHaveTextContent(en.Features.hoverCueText);

      const marqueeRow = container.querySelector('#features-marquee-row');
      const buttons = marqueeRow?.querySelectorAll('button') || [];
      const firstCard = buttons[0];

      // Hover card 0 (Live Rooms) -> shows feature1Title
      fireEvent.mouseEnter(firstCard);
      expect(hoverCueRow).toHaveTextContent(en.Features.feature1Title);

      // Leave card 0 -> restores hover cue prompt
      fireEvent.mouseLeave(firstCard);
      expect(hoverCueRow).toHaveTextContent(en.Features.hoverCueText);

      // Focus card 0 -> shows feature1Title
      fireEvent.focus(firstCard);
      expect(hoverCueRow).toHaveTextContent(en.Features.feature1Title);

      // Blur card 0 -> restores hover cue prompt
      fireEvent.blur(firstCard);
      expect(hoverCueRow).toHaveTextContent(en.Features.hoverCueText);
    });
  });

  describe('Mobile Carousel Controls and Touch Gestures', () => {
    it('navigates with next and prev chevron buttons and updates active title', () => {
      render(<Features />);

      // Initially shows swipe cue text
      expect(screen.getByText(en.Features.swipeCueText)).toBeInTheDocument();

      const nextButton = screen.getByLabelText(en.Features.nextFeature);
      const prevButton = screen.getByLabelText(en.Features.prevFeature);

      // Click Next: 0 -> 1 (scheduled rooms)
      fireEvent.click(nextButton);
      expect(screen.getByText(en.Features.feature2Title)).toBeInTheDocument();

      // Click Prev: 1 -> 0 (live rooms)
      fireEvent.click(prevButton);
      expect(screen.getByText(en.Features.feature1Title)).toBeInTheDocument();

      // Click Prev from 0 wraps around to 5 (moderation)
      fireEvent.click(prevButton);
      expect(screen.getByText(en.Features.feature6Title)).toBeInTheDocument();

      // Click Next from 5 wraps around to 0
      fireEvent.click(nextButton);
      expect(screen.getByText(en.Features.feature1Title)).toBeInTheDocument();
    });

    it('supports swipe gestures on the mobile mockup container', () => {
      const { container } = render(<Features />);
      const swipeContainer = container.querySelector('.cursor-grab');
      expect(swipeContainer).toBeInTheDocument();

      // Swipe left: distance > 50 -> navigates to next feature (0 -> 1)
      fireEvent.touchStart(swipeContainer!, { targetTouches: [{ clientX: 120 }] });
      fireEvent.touchMove(swipeContainer!, { targetTouches: [{ clientX: 40 }] });
      fireEvent.touchEnd(swipeContainer!);
      expect(screen.getByText(en.Features.feature2Title)).toBeInTheDocument();

      // Swipe right: distance < -50 -> navigates to prev feature (1 -> 0)
      fireEvent.touchStart(swipeContainer!, { targetTouches: [{ clientX: 40 }] });
      fireEvent.touchMove(swipeContainer!, { targetTouches: [{ clientX: 120 }] });
      fireEvent.touchEnd(swipeContainer!);
      expect(screen.getByText(en.Features.feature1Title)).toBeInTheDocument();

      // Small swipe (< 50 distance) -> no change
      fireEvent.touchStart(swipeContainer!, { targetTouches: [{ clientX: 50 }] });
      fireEvent.touchMove(swipeContainer!, { targetTouches: [{ clientX: 45 }] });
      fireEvent.touchEnd(swipeContainer!);
      expect(screen.getByText(en.Features.feature1Title)).toBeInTheDocument();

      // TouchEnd with missing touchStart/touchEnd returns early safely
      fireEvent.touchEnd(swipeContainer!);
      expect(screen.getByText(en.Features.feature1Title)).toBeInTheDocument();

      // TouchStart without TouchMove (touchEnd is null) returns early safely
      fireEvent.touchStart(swipeContainer!, { targetTouches: [{ clientX: 50 }] });
      fireEvent.touchEnd(swipeContainer!);
      expect(screen.getByText(en.Features.feature1Title)).toBeInTheDocument();
    });
  });

  describe('Intersection Observer Visibility', () => {
    it('applies luxury reveal animation when isVisible is true', () => {
      mockIsVisible = true;
      const { container } = render(<Features />);
      const headings = container.querySelectorAll('h2');
      expect(headings[0].className).toContain('animate-luxury-reveal-1');
    });

    it('hides headings with opacity-0 when isVisible is false', () => {
      mockIsVisible = false;
      const { container } = render(<Features />);
      const headings = container.querySelectorAll('h2');
      expect(headings[0].className).toContain('opacity-0');
    });
  });
});
