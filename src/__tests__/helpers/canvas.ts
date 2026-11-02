import { vi } from 'vitest';

/** A 2D canvas context that records the drawing calls made on it (jsdom has no canvas backend). */
export function createMockContext2D() {
  const gradient = { addColorStop: vi.fn() };
  return {
    gradient,
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    stroke: vi.fn(),
    setTransform: vi.fn(),
    createLinearGradient: vi.fn(() => gradient),
    strokeStyle: '' as unknown,
    lineWidth: 0,
    lineJoin: '',
    lineCap: '',
  };
}

export type MockContext2D = ReturnType<typeof createMockContext2D>;
