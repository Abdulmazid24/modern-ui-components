import { render } from '@testing-library/react';
import React from 'react';
import { CosmicSpotlightTabs } from './CosmicSpotlightTabs';
import { describe, it, expect } from 'vitest';

describe('CosmicSpotlightTabs Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<CosmicSpotlightTabs />);
    expect(container).toBeTruthy();
  });
});
