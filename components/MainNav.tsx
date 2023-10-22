'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const params = useParams(); // client
  const pathname = usePathname();

  const routes = [
    {
      label: 'Setting',
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn(' flex gap-4 items-center', className)}>
      {routes.map(route => (
        <Link
          href={route.href}
          key={route.label}
          className={cn(
            ' flex items-center hover:text-slate-800',
            route.active
              ? ' text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
