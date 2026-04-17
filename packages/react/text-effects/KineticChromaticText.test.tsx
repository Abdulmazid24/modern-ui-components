import { render } from '@testing-library/react';
import React from 'react';
import { KineticChromaticText } from './KineticChromaticText';
import { describe, it, expect } from 'vitest';

describe('KineticChromaticText Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<KineticChromaticText text="Rainbow" />);
    expect(container).toBeTruthy();
  });
});
