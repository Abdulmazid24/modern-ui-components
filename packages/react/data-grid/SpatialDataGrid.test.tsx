import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { SpatialDataGrid, ColumnDef } from './SpatialDataGrid';

describe('SpatialDataGrid Smoke Test', () => {
  it('mounts without crashing', () => {
    type TestData = { id: string; name: string };
    const columns: ColumnDef<TestData>[] = [{ key: 'name', header: 'Name' }];
    const data: TestData[] = [{ id: '1', name: 'Alpha' }];
    
    const { container } = render(<SpatialDataGrid data={data} columns={columns} />);
    expect(container).toBeTruthy();
  });
});
