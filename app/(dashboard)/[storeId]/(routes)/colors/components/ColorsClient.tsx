'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ColorsColumns, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import ApiLists from '@/components/ui/api-lists';

interface ColorsClientProps {
  data: ColorsColumns[];
}

const ColorsClient = ({ data }: ColorsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className=" flex items-center justify-between">
        <Header
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className=" mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <DataTable searchKey="name" data={data} columns={columns} />
      <Header title="API" description="API calls for colors" />
      <Separator />
      <ApiLists entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorsClient;
