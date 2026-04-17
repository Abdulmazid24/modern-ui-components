import { render } from '@testing-library/react';
import React from 'react';
import { TrayMorphDownloadButton } from './TrayMorphDownloadButton';
import { describe, it, expect } from 'vitest';

describe('TrayMorphDownloadButton Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<TrayMorphDownloadButton />);
    expect(container).toBeTruthy();
  });
});
