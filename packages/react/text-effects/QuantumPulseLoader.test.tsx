import { render } from '@testing-library/react';
import React from 'react';
import { QuantumPulseLoader } from './QuantumPulseLoader';
import { describe, it, expect } from 'vitest';

describe('QuantumPulseLoader Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<QuantumPulseLoader />);
    expect(container).toBeTruthy();
  });
});
