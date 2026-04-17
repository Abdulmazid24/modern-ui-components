import { render } from '@testing-library/react';
import React from 'react';
import { KineticSocialCards } from './KineticSocialCards';
import { describe, it, expect } from 'vitest';

describe('KineticSocialCards Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<KineticSocialCards />);
    expect(container).toBeTruthy();
  });
});
