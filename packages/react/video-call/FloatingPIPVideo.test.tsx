import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { FloatingPIPVideo } from './FloatingPIPVideo';

describe('FloatingPIPVideo Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<FloatingPIPVideo />);
    expect(container).toBeTruthy();
  });
});
