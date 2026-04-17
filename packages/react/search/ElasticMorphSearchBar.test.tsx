import { render } from '@testing-library/react';
import React from 'react';
import { ElasticMorphSearchBar } from './ElasticMorphSearchBar';
import { describe, it, expect } from 'vitest';

describe('ElasticMorphSearchBar Smoke Test', () => {
  it('mounts without crashing', () => {
    const { container } = render(<ElasticMorphSearchBar />);
    expect(container).toBeTruthy();
  });
});
