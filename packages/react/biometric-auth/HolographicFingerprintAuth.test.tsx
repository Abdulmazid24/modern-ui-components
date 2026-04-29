import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { HolographicFingerprintAuth } from './HolographicFingerprintAuth';

describe('HolographicFingerprintAuth Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<HolographicFingerprintAuth />);
    expect(container).toBeTruthy();
  });
});
