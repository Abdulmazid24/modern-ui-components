import { render } from '@testing-library/react';
import React from 'react';
import { PixelFlowLoader } from './PixelFlowLoader';
import { describe, it, expect } from 'vitest';

describe('PixelFlowLoader Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<PixelFlowLoader />);
    expect(container).toBeTruthy();
  });
});
