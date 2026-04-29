import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { QuantumLootbox } from './QuantumLootbox';

describe('QuantumLootbox Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<QuantumLootbox />);
    expect(container).toBeTruthy();
  });
});
