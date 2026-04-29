import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { FluidDynamicsBackground } from './FluidDynamicsBackground';

describe('FluidDynamicsBackground Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<FluidDynamicsBackground />);
    expect(container).toBeTruthy();
  });
});
