import { render } from '@testing-library/react';
import React from 'react';
import { NeonPulseSearchBar } from './NeonPulseSearchBar';
import { describe, it, expect } from 'vitest';

describe('NeonPulseSearchBar Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeonPulseSearchBar />);
    expect(container).toBeTruthy();
  });
});
