import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { BionicProseRenderer } from './BionicProseRenderer';

// Mock matchMedia for framer-motion useScroll inside JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('BionicProseRenderer Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(
      <BionicProseRenderer content="This is a test paragraph.\n\nThis is another paragraph." />
    );
    expect(container).toBeTruthy();
  });
});
