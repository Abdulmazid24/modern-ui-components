import { render } from '@testing-library/react';
import React from 'react';
import { Kinetic3DText } from './Kinetic3DText';
import { describe, it, expect } from 'vitest';

describe('Kinetic3DText Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<Kinetic3DText text="VITE" />);
    expect(container).toBeTruthy();
  });
});
