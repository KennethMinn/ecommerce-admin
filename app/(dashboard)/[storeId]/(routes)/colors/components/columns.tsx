'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './CellActions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorsColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorsColumns>[] = [
  {
    accessorKey: 'name', // to search show
    header: 'Name', // just a header
  },
  {
    accessorKey: 'value', // to search and show
    header: 'Value', // just a header
    cell: (
      { row } //  we have value and wanna add one more.So, we use cell
    ) => (
      <div className=" flex items-center gap-x-2">
        {row.original.value}
        <div
          className=" h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt', // to search
    header: 'Date', // just a header
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />, //original obj this cell is working with is ColorsColumn obj
  },
];
