import StoreSwitcher from './StoreSwitcher';
import MainNav from './MainNav';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      <div className=" h-16 gap-5 flex items-center px-4 border-b">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className=" ml-auto flex space-x-4 items-center">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
