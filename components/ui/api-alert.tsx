'use client';

import React from 'react';
import { Badge, BadgeProps } from './badge';
import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Button } from './button';
import toast from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

//It creates a textMap object, which is a record (dictionary) mapping the variant property to a string value.
//In this case, it maps 'public' to 'Public' and 'admin' to 'Admin'.
const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

//It creates a variantMap object, which is another record mapping the variant property to the BadgeProps's variant property.
//It maps 'public' to 'secondary' and 'admin' to 'destructive'.
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

const ApiAlert = ({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Api copied to clipboard');
  };

  return (
    <Alert>
      <AlertTitle className=" flex items-center gap-3">
        <Server className=" w-4 h-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className=" mt-4 flex justify-between mx-10">
        <code className=" font-bold bg-muted rounded-lg flex px-2 items-center">
          {description}
        </code>
        <Button variant={'outline'} size={'icon'} onClick={onCopy}>
          <Copy className=" w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
