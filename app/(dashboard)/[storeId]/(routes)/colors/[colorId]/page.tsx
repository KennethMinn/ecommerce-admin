import React from 'react';
import prismadb from '@/lib/prismadb';
import ColorForm from './components/ColorForm';

interface ColorPageProps {
  params: { colorId: string };
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const color = await prismadb.color?.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialValues={color} />
      </div>
    </div>
  );
};

export default ColorPage;
