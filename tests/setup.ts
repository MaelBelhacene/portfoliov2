import '@testing-library/jest-dom/vitest';
import { vi, beforeEach, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Sans `globals: true`, l'auto-cleanup de Testing Library ne s'active pas.
afterEach(cleanup);

// jsdom does not implement matchMedia. Tests toggle reduced motion via setReducedMotion().
let reducedMotion = false;

export function setReducedMotion(value: boolean) {
  reducedMotion = value;
}

beforeEach(() => {
  reducedMotion = false;
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // jsdom does not implement IntersectionObserver (Navbar active tracking, scroll reveals).
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = () => [];
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });

  window.scrollTo = vi.fn();
}
