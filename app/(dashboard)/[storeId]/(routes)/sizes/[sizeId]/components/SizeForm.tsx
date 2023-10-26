'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AlertModal from '@/components/modals/alert-modal';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Size } from '@prisma/client';
import ImageUpload from '@/components/ui/image-upload';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

interface SizeFormProps {
  initialValues: Size | null;
}

const SizeForm = ({ initialValues }: SizeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialValues ? 'Edit size' : 'Create size';
  const description = initialValues ? 'Edit a size' : 'Add a new size';
  const toastMessage = initialValues ? 'Size Updated' : 'Size Created';
  const action = initialValues ? 'Save changes' : 'Create';

  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initialValues) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success('Size Deleted Successfully!');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={isLoading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        open={open}
      />
      <div className=" flex items-center justify-between">
        <Header title={title} description={description} />
        {initialValues && (
          <Button
            variant={'destructive'}
            size={'icon'}
            disabled={isLoading}
            onClick={() => setOpen(true)}
          >
            <Trash className=" h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className=" my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className=" w-auto">
                    <Input disabled={isLoading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl className=" w-auto">
                    <Input
                      disabled={isLoading}
                      placeholder="Value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
