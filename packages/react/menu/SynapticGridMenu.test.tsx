import { render } from '@testing-library/react';
import React from 'react';
import { SynapticGridMenu } from './SynapticGridMenu';
import { describe, it, expect } from 'vitest';

describe('SynapticGridMenu Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<SynapticGridMenu />);
    expect(container).toBeTruthy();
  });
});
