'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './CellActions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumns = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: 'name', // to search and show
    header: 'Name', // just a header
  },
  {
    accessorKey: 'billboard', // to search and show
    header: 'Billboard', // just a header
    cell: ({ row }) => row.original.billboardLabel, // original obj this cell is working with is BillboardColumn obj
    //we have to add cells duz billboard is not inside BillboardColumns or formattedBillboards
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />, //original obj this cell is working with is BillboardColumn obj
  },
];
