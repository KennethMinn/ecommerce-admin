'use client';

import Header from '@/components/Header';
import React from 'react';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Header
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable searchKey="products" data={data} columns={columns} />
    </>
  );
};

export default OrderClient;
