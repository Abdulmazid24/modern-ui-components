import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { SemanticSearchConstellation } from './SemanticSearchConstellation';

describe('SemanticSearchConstellation Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<SemanticSearchConstellation />);
    expect(container).toBeTruthy();
  });
});
