import React from 'react';
import prismadb from '@/lib/prismadb';
import SizeForm from './components/SizeForm';

interface SizePageProps {
  params: { sizeId: string };
}

const SizePage = async ({ params }: SizePageProps) => {
  const size = await prismadb.size?.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialValues={size} />
      </div>
    </div>
  );
};

export default SizePage;
