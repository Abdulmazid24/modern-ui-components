import { render } from '@testing-library/react';
import React from 'react';
import { NeuralSocialReveal } from './NeuralSocialReveal';
import { describe, it, expect } from 'vitest';

describe('NeuralSocialReveal Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeuralSocialReveal />);
    expect(container).toBeTruthy();
  });
});
