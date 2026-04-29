import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { NeuroDiverseA11yWidget } from './NeuroDiverseA11yWidget';

describe('NeuroDiverseA11yWidget Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<NeuroDiverseA11yWidget />);
    expect(container).toBeTruthy();
  });
});
