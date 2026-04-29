import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { HolographicWalletConnect } from './HolographicWalletConnect';

describe('HolographicWalletConnect Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<HolographicWalletConnect isOpen={true} onClose={() => {}} />);
    expect(container).toBeTruthy();
  });
});
