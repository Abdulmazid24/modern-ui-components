import { render } from '@testing-library/react';
import React from 'react';
import { HolographicGlassCard } from './HolographicGlassCard';
import { describe, it, expect } from 'vitest';

describe('HolographicGlassCard Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<HolographicGlassCard />);
    expect(container).toBeTruthy();
  });
});
