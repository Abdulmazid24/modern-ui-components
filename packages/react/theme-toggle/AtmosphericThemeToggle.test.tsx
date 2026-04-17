import { render } from '@testing-library/react';
import React from 'react';
import { AtmosphericThemeToggle } from './AtmosphericThemeToggle';
import { describe, it, expect } from 'vitest';

describe('AtmosphericThemeToggle Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<AtmosphericThemeToggle />);
    expect(container).toBeTruthy();
  });
});
