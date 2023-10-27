'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './CellActions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumns = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: 'label', // to search and show below header
    header: 'Label', // just a header
  },
  {
    accessorKey: 'createdAt', // to search and show header
    header: 'Date', // just a header
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />, //original obj this cell is working with is BillboardColumn obj
    // we have to add cells duz actions is not inside BillboardColumns or formattedBillboards
  },
];
