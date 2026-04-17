import { render } from '@testing-library/react';
import React from 'react';
import { MagicFloatingTabNav } from './MagicFloatingTabNav';
import { describe, it, expect } from 'vitest';

describe('MagicFloatingTabNav Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<MagicFloatingTabNav />);
    expect(container).toBeTruthy();
  });
});
