import React from 'react';
import BillboardForm from './components/BillboardForm';
import prismadb from '@/lib/prismadb';

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await prismadb.billboard?.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialValues={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
