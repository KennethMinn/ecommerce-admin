'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SizesColumns, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import ApiLists from '@/components/ui/api-lists';

interface SizesClientProps {
  data: SizesColumns[];
}

const SizesClient = ({ data }: SizesClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className=" flex items-center justify-between">
        <Header
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className=" mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <DataTable searchKey="name" data={data} columns={columns} />
      <Header title="API" description="API calls for sizes" />
      <Separator />
      <ApiLists entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizesClient;
