import { render } from '@testing-library/react';
import React from 'react';
import { FractalNebulaLoginForm } from './FractalNebulaLoginForm';
import { describe, it, expect } from 'vitest';

describe('FractalNebulaLoginForm Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<FractalNebulaLoginForm />);
    expect(container).toBeTruthy();
  });
});
