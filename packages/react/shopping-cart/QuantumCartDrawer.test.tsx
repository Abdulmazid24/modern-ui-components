import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { QuantumCartDrawer } from './QuantumCartDrawer';

describe('QuantumCartDrawer Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(
      <QuantumCartDrawer isOpen={true} onClose={() => {}} items={[]} />
    );
    expect(container).toBeTruthy();
  });
});
