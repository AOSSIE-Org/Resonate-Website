import { act } from '@testing-library/react';

type IntersectionCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
type ResizeCallback = (entries: Partial<ResizeObserverEntry>[]) => void;

/**
 * Test doubles for the observers jsdom lacks. Each instance is recorded so a test can
 * report an element as (not) intersecting or resized, as the browser would.
 */
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly observed = new Set<Element>();
  disconnected = false;

  constructor(
    readonly callback: IntersectionCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.add(el);
  }

  unobserve(el: Element) {
    this.observed.delete(el);
  }

  disconnect() {
    this.disconnected = true;
    this.observed.clear();
  }

  takeRecords() {
    return [];
  }
}

export class MockResizeObserver {
  static instances: MockResizeObserver[] = [];
  readonly observed = new Set<Element>();
  disconnected = false;

  constructor(readonly callback: ResizeCallback) {
    MockResizeObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.add(el);
  }

  unobserve(el: Element) {
    this.observed.delete(el);
  }

  disconnect() {
    this.disconnected = true;
    this.observed.clear();
  }
}

/** Reports every element observed by any live IntersectionObserver as (not) intersecting. */
export function setIntersecting(isIntersecting: boolean) {
  act(() => {
    for (const observer of MockIntersectionObserver.instances) {
      if (observer.disconnected) continue;
      for (const target of observer.observed) observer.callback([{ isIntersecting, target }]);
    }
  });
}

/** Fires every live ResizeObserver, optionally with a content rect. */
export function triggerResize(contentRect?: Partial<DOMRectReadOnly>) {
  act(() => {
    for (const observer of MockResizeObserver.instances) {
      if (observer.disconnected) continue;
      observer.callback(contentRect ? [{ contentRect: contentRect as DOMRectReadOnly }] : []);
    }
  });
}

export function resetObservers() {
  MockIntersectionObserver.instances = [];
  MockResizeObserver.instances = [];
}
