import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { CategoryColumns } from './components/columns';
import CategoryClient from './components/CategoryClient';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category?.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true, // to use relation
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumns[] = categories.map(item => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label, //relation
    createdAt: format(item.createdAt, 'MMMM do,yyyy'),
  }));

  return (
    <div className=" flex col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
