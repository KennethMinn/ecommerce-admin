import prismadb from '@/lib/prismadb';
import BillBoardClient from './components/BillboardClient';
import { format } from 'date-fns';
import { BillboardColumns } from './components/columns';

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard?.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumns[] = billboards.map(item => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do,yyyy'),
  }));

  return (
    <div className=" flex col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
