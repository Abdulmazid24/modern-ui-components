import { render } from '@testing-library/react';
import React from 'react';
import { LiquidGooeyNavBar } from './LiquidGooeyNavBar';
import { describe, it, expect } from 'vitest';

describe('LiquidGooeyNavBar Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<LiquidGooeyNavBar />);
    expect(container).toBeTruthy();
  });
});
