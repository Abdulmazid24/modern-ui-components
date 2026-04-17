import { render } from '@testing-library/react';
import React from 'react';
import { NeonBeamLoginForm } from './NeonBeamLoginForm';
import { describe, it, expect } from 'vitest';

describe('NeonBeamLoginForm Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeonBeamLoginForm />);
    expect(container).toBeTruthy();
  });
});
