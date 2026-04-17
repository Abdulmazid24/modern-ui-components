import { render } from '@testing-library/react';
import React from 'react';
import { FluxAuraButton } from './FluxAuraButton';
import { describe, it, expect } from 'vitest';

describe('FluxAuraButton Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<FluxAuraButton>Click Me</FluxAuraButton>);
    expect(container).toBeTruthy();
  });
});
