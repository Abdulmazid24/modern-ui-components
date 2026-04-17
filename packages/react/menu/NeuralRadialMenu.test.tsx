import { render } from '@testing-library/react';
import React from 'react';
import { NeuralRadialMenu } from './NeuralRadialMenu';
import { describe, it, expect } from 'vitest';

describe('NeuralRadialMenu Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeuralRadialMenu />);
    expect(container).toBeTruthy();
  });
});
