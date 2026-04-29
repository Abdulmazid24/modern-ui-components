import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { InfiniteNodeCanvas } from './InfiniteNodeCanvas';

describe('InfiniteNodeCanvas Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<InfiniteNodeCanvas />);
    expect(container).toBeTruthy();
  });
});
