import { render } from '@testing-library/react';
import React from 'react';
import { RetroVisionCalculator } from './RetroVisionCalculator';
import { describe, it, expect } from 'vitest';

describe('RetroVisionCalculator Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<RetroVisionCalculator />);
    expect(container).toBeTruthy();
  });
});
