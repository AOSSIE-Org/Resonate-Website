import { describe, it, expect, afterEach, vi } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { fireEvent, screen, within } from '@testing-library/react';
import { LOCALES, messages, renderWithIntl } from './helpers/intl';
import { setIntersecting } from './helpers/observers';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Features } from '@/components/home/Features';
import { FeatureIllustration, type FeatureKind } from '@/components/home/FeatureIllustrations';
import * as links from '@/config/links';

afterEach(() => vi.unstubAllGlobals());

const expectNewTab = (link: HTMLElement) => {
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
};

describe('Hero', () => {
  it.each(LOCALES)('shows the %s headline, AOSSIE link and mobile download link', (locale) => {
    renderWithIntl(<Hero />, locale);
    const t = messages[locale].Hero;
    expect(screen.getByRole('heading', { level: 1, name: t.headline })).toBeInTheDocument();
    expect(screen.getByText(t.subHeadline)).toBeInTheDocument();
    expect(screen.getByText(t.maintainedBy)).toBeInTheDocument();
    const aossie = screen.getByRole('link', { name: t.visitAossie });
    expect(aossie).toHaveAttribute('href', links.AOSSIE_URL);
    expect(aossie).toHaveTextContent(t.orgName);
    expectNewTab(aossie);
    const download = screen.getByRole('link', { name: t.downloadAria });
    expect(download).toHaveAttribute('href', links.PLAY_STORE_URL);
    expect(download).toHaveTextContent(t.download);
    expectNewTab(download);
  });

  it('includes the phone visuals with the hero mockup as the high-priority image', () => {
    renderWithIntl(<Hero />);
    const phones = screen.getAllByAltText('Resonate app interface');
    expect(phones.length).toBeGreaterThan(0);
    for (const img of phones) expect(img).toHaveAttribute('fetchpriority', 'high');
  });
});

describe('About', () => {
  it.each(LOCALES)('shows the %s copy, video link and store badges', (locale) => {
    renderWithIntl(<About />, locale);
    const t = messages[locale].About;
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(`${t.title1}${t.title2}`);
    expect(screen.getByText(t.description)).toBeInTheDocument();
    const video = screen.getByRole('link', { name: t.videoButton });
    expect(video).toHaveAttribute('href', links.YOUTUBE_URL);
    expectNewTab(video);
    const play = screen.getByAltText(t.playStoreAlt).closest('a')!;
    expect(play).toHaveAttribute('href', links.PLAY_STORE_URL);
    expectNewTab(play);
    // Not on the App Store yet: a labelled, non-interactive badge rather than a link
    const apple = screen.getByAltText(t.appStoreComingSoon);
    expect(apple.closest('a')).toBeNull();
    expect(apple.parentElement).toHaveAttribute('title', t.appStoreComingSoon);
    expect(screen.getByAltText(t.mockupAlt)).toHaveAttribute('src', '/assets/mockups/phone_about.webp');
  });

  it('reveals the tagline once it scrolls into view', () => {
    renderWithIntl(<About />);
    const tagline = screen.getByText(messages.en.About.tagline1);
    expect(tagline.className).toContain('opacity-0');
    setIntersecting(true);
    expect(tagline.className).toContain('animate-luxury-reveal-1');
    expect(screen.getByText(messages.en.About.tagline2).className).toContain('animate-luxury-reveal-2');
  });
});

const KINDS: FeatureKind[] = ['live-rooms', 'scheduled-rooms', 'stories', 'friends-calls', 'audio-spaces', 'moderation'];
const CARD_KEYS = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'] as const;
const TITLE_KEYS = ['feature1Title', 'feature2Title', 'feature3Title', 'feature4Title', 'feature5Title', 'feature6Title'] as const;

describe('FeatureIllustration', () => {
  it.each(KINDS)('draws a decorative %s illustration with a brand-yellow accent', (kind) => {
    const { container } = renderWithIntl(<FeatureIllustration kind={kind} className="illo" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg).toHaveClass('illo');
    expect(svg.querySelector('[fill="var(--color-brand-yellow)"], [stroke="var(--color-brand-yellow)"]')).not.toBeNull();
  });

  it('draws a different picture for each feature', () => {
    const markup = KINDS.map((kind) => {
      const { container, unmount } = renderWithIntl(<FeatureIllustration kind={kind} />);
      const html = container.innerHTML;
      unmount();
      return html;
    });
    expect(new Set(markup).size).toBe(KINDS.length);
  });
});

describe('Features', () => {
  const t = messages.en.Features;
  const overlay = () => screen.getByAltText(t.resonateAppInterface).closest('div')!.querySelector('span.text-highlight')!;
  const liveRegions = () => document.querySelectorAll('[aria-live="polite"]');
  const mobileCue = () => liveRegions()[1] as HTMLElement;
  const desktopCue = () => liveRegions()[0] as HTMLElement;

  it.each(LOCALES)('shows the %s community block, tech stack and contribute links', (locale) => {
    renderWithIntl(<Features />, locale);
    const f = messages[locale].Features;
    const words = f.joinCommunity.split(' ');
    for (const heading of screen.getAllByRole('heading', { level: 2 })) {
      const [lead, highlight] = heading.querySelectorAll('span');
      expect(lead.textContent).toBe(`${words.slice(0, 2).join(' ')} `);
      expect(highlight.textContent).toBe(words.slice(2).join(' '));
    }
    const contribute = screen.getAllByRole('link', { name: new RegExp(f.contributeButton) });
    expect(contribute).toHaveLength(2);
    for (const link of contribute) {
      expect(link).toHaveAttribute('href', links.GITHUB_APP_REPO_URL);
      expectNewTab(link);
    }
    for (const tech of [f.flutter, f.dart, f.appwrite, f.livekit]) {
      expect(screen.getAllByAltText(`${tech} logo`)).toHaveLength(2);
    }
  });

  it('loops the six feature cards three times in the marquee', () => {
    renderWithIntl(<Features />);
    const cards = screen.getAllByRole('button').filter((b) => b.closest('.animate-marquee'));
    expect(cards).toHaveLength(18);
    expect(cards.slice(0, 6).map((c) => c.textContent)).toEqual(CARD_KEYS.map((k, i) => `0${i + 1}${t[k]}`));
  });

  it('shows the hovered or focused card title, and the hover cue otherwise', () => {
    renderWithIntl(<Features />);
    const cards = screen.getAllByRole('button').filter((b) => b.closest('.animate-marquee'));
    expect(desktopCue()).toHaveTextContent(t.hoverCueText);
    fireEvent.mouseEnter(cards[2]);
    expect(desktopCue()).toHaveTextContent(t.feature3Title);
    fireEvent.mouseLeave(cards[2]);
    expect(desktopCue()).toHaveTextContent(t.hoverCueText);
    fireEvent.focus(cards[10]);
    expect(desktopCue()).toHaveTextContent(t.feature5Title);
    fireEvent.blur(cards[10]);
    expect(desktopCue()).toHaveTextContent(t.hoverCueText);
  });

  it('selecting a marquee card shows it on the phone', () => {
    renderWithIntl(<Features />);
    const cards = screen.getAllByRole('button').filter((b) => b.closest('.animate-marquee'));
    fireEvent.click(cards[15]);
    expect(overlay()).toHaveTextContent(t.card4);
  });

  it('starts with the swipe cue and steps through features with the chevrons, wrapping around', () => {
    renderWithIntl(<Features />);
    expect(mobileCue()).toHaveTextContent(t.swipeCueText);
    expect(overlay()).toHaveTextContent(t.card1);
    fireEvent.click(screen.getByRole('button', { name: t.prevFeature }));
    expect(overlay()).toHaveTextContent(t.card6);
    expect(mobileCue()).toHaveTextContent(t.feature6Title);
    fireEvent.click(screen.getByRole('button', { name: t.nextFeature }));
    expect(overlay()).toHaveTextContent(t.card1);
    expect(mobileCue()).toHaveTextContent(t.feature1Title);
  });

  it('swipes left for the next feature and right for the previous one, ignoring short drags', () => {
    renderWithIntl(<Features />);
    const phone = screen.getByAltText(t.resonateAppInterface).closest('div')!;
    const swipe = (from: number, to?: number) => {
      fireEvent.touchStart(phone, { targetTouches: [{ clientX: from }] });
      if (to !== undefined) fireEvent.touchMove(phone, { targetTouches: [{ clientX: to }] });
      fireEvent.touchEnd(phone);
    };
    swipe(300, 200);
    expect(overlay()).toHaveTextContent(t.card2);
    swipe(100, 220);
    expect(overlay()).toHaveTextContent(t.card1);
    swipe(200, 170);
    expect(overlay()).toHaveTextContent(t.card1);
    expect(mobileCue()).toHaveTextContent(t.feature1Title);
    // A tap (no move) is not a swipe
    swipe(200);
    expect(overlay()).toHaveTextContent(t.card1);
  });

  it('property: any sequence of next/prev steps moves the carousel by (nexts - prevs) mod 6', () => {
    // One render for all runs: each run continues from wherever the previous one left the carousel.
    renderWithIntl(<Features />);
    const next = screen.getByRole('button', { name: t.nextFeature });
    const prev = screen.getByRole('button', { name: t.prevFeature });
    let index = 0;
    fc.assert(
      fc.property(fc.array(fc.boolean(), { maxLength: 8 }), (steps) => {
        const expected = (index + steps.reduce((n, forward) => n + (forward ? 1 : -1), 0) + 6 * 12) % 6;
        for (const forward of steps) fireEvent.click(forward ? next : prev);
        index = expected;
        expect(overlay()).toHaveTextContent(t[CARD_KEYS[index]]);
        if (steps.length) expect(mobileCue()).toHaveTextContent(t[TITLE_KEYS[index]]);
      }),
      { numRuns: 25 },
    );
  });

  it('reveals the headings once the section scrolls into view', () => {
    renderWithIntl(<Features />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    for (const h of headings) expect(h.className).toContain('opacity-0');
    setIntersecting(true);
    for (const h of headings) expect(h.className).toContain('animate-luxury-reveal-1');
  });

  it('keeps the tech stack visible in both layouts', () => {
    renderWithIntl(<Features />);
    expect(screen.getAllByRole('heading', { level: 3, name: t.techStack })).toHaveLength(2);
    expect(within(document.getElementById('features-tech-card')!).getByText(t.mobileDev)).toBeInTheDocument();
  });
});
