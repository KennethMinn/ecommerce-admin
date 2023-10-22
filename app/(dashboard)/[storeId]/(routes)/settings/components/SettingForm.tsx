'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Store } from '@prisma/client';
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

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 characters.',
  }),
});

interface SettingFormProps {
  initialValues: Store;
}

const SettingForm = ({ initialValues }: SettingFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success('Store Updated Successfully!');
    } catch (error) {
      toast.success('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/'); //  '/' route will check if the storeId exists;
      toast.success('Store Deleted Successfully!');
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
        <Header title="Settings" description="Manage store preferences" />
        <Button
          variant={'destructive'}
          size={'icon'}
          disabled={isLoading}
          onClick={() => setOpen(true)}
        >
          <Trash className=" h-4 w-4" />
        </Button>
      </div>
      <Separator className=" my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className=" w-auto">
                  <Input disabled={isLoading} placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingForm;
