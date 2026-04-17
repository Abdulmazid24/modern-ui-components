import { render } from '@testing-library/react';
import React from 'react';
import { ChronosNeonClock } from './ChronosNeonClock';
import { describe, it, expect } from 'vitest';

describe('ChronosNeonClock Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<ChronosNeonClock />);
    expect(container).toBeTruthy();
  });
});
