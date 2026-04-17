import { render } from '@testing-library/react';
import React from 'react';
import { HolographicAutocomplete } from './HolographicAutocomplete';
import { describe, it, expect } from 'vitest';

const mockOptions = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
];

describe('HolographicAutocomplete Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<HolographicAutocomplete options={mockOptions} />);
    expect(container).toBeTruthy();
  });
});
