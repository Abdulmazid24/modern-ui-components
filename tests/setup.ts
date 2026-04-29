import '@testing-library/jest-dom';

// Mock requestAnimationFrame and cancelAnimationFrame to prevent memory leaks and high CPU usage in tests
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0) as unknown as number;
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
};
