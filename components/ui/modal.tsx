import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  title,
  description,
  children,
  onClose,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      //!open = setOpen(false)
      onClose();
      //  console.log(isOpen)false
    }
  };

  // console.log(isOpen); true
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
