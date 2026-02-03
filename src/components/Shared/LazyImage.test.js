import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  const SRC = '/test-image.png';
  const ALT = 'test image';

  afterEach(() => {
    // Clean up any mocked globals
    delete global.IntersectionObserver;
    // Remove 'loading' property if we added it
    try {
      delete HTMLImageElement.prototype.loading;
    } catch (e) {}
  });

  test('uses native loading attribute when supported', () => {
    // Make the environment claim support for native loading
    Object.defineProperty(HTMLImageElement.prototype, 'loading', {
      configurable: true,
      value: '',
    });

    render(<LazyImage src={SRC} alt={ALT} loading="lazy" />);

    const img = screen.getByAltText(ALT);
    // Should immediately have the src and loading attribute
    expect(img.getAttribute('src')).toBe(SRC);
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  test('defers loading until intersection when native loading is not available', () => {
    let intersectionCallback;

    // Mock IntersectionObserver
    class MockObserver {
      constructor(cb) {
        intersectionCallback = cb;
      }
      observe() {}
      disconnect() {}
    }
    global.IntersectionObserver = MockObserver;

    render(<LazyImage src={SRC} alt={ALT} loading="lazy" />);

    const img = screen.getByAltText(ALT);

    // Initially, no src attribute (or empty)
    expect(img.getAttribute('src')).toBe(null);

    // Trigger intersection
    act(() => {
      intersectionCallback([{ isIntersecting: true, target: img }]);
    });

    // Now the src should be set
    expect(img.getAttribute('src')).toBe(SRC);
  });
});
