import { render } from '@testing-library/react';
import React from 'react';
import { LiquidTrashButton } from './LiquidTrashButton';
import { describe, it, expect } from 'vitest';

describe('LiquidTrashButton Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<LiquidTrashButton />);
    expect(container).toBeTruthy();
  });
});
