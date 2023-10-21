'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import Modal from '@/components/ui/modal';
import { useStoreModal } from '../hooks/use-store-modal';
import { useEffect } from 'react';

export default function Home() {
  const isOpen = useStoreModal(state => state.isOpen);
  const onOpen = useStoreModal(state => state.onOpen);
  const onClose = useStoreModal(state => state.onClose);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
