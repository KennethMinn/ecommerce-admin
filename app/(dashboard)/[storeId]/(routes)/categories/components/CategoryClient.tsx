'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CategoryColumns, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import ApiLists from '@/components/ui/api-lists';

interface CategoryClientProps {
  data: CategoryColumns[];
}

const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className=" flex items-center justify-between">
        <Header
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className=" mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <DataTable searchKey="name" data={data} columns={columns} />
      <Header title="API" description="API calls for categories" />
      <Separator />
      <ApiLists entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoryClient;
