import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { NeuralCheckout } from './NeuralCheckout';

describe('NeuralCheckout Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeuralCheckout />);
    expect(container).toBeTruthy();
  });
});
