import { render } from '@testing-library/react';
import React from 'react';
import { NeuralPathTracer } from './NeuralPathTracer';
import { describe, it, expect } from 'vitest';

describe('NeuralPathTracer Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeuralPathTracer />);
    expect(container).toBeTruthy();
  });
});
