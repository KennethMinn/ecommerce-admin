'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './CellActions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizesColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizesColumns>[] = [
  {
    accessorKey: 'name', // to search
    header: 'Name', // just a header
  },
  {
    accessorKey: 'value', // to search
    header: 'Value', // just a header
  },
  {
    accessorKey: 'createdAt', // to search
    header: 'Date', // just a header
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />, //original obj this cell is working with is SizesColumn obj
  },
];
