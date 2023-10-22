'use client';

import React, { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}

const AlertModal = ({ open, onConfirm, onClose, loading }: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={open}
      onClose={onClose}
    >
      <div className=" flex justify-end gap-3">
        <Button variant={'outline'} disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={'destructive'} disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
