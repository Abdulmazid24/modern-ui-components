import { render } from '@testing-library/react';
import React from 'react';
import { CosmicRadialShareMenu } from './CosmicRadialShareMenu';
import { describe, it, expect } from 'vitest';

describe('CosmicRadialShareMenu Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<CosmicRadialShareMenu />);
    expect(container).toBeTruthy();
  });
});
