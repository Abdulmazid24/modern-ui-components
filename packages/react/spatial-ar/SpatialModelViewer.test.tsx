import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { SpatialModelViewer } from './SpatialModelViewer';

describe('SpatialModelViewer Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<SpatialModelViewer />);
    expect(container).toBeTruthy();
  });
});
