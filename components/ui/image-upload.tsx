'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className=" flex items-center gap-x-6">
        {value.map(url => (
          <div
            key={url}
            className=" relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className=" z-10 absolute right-2 top-2">
              <Button
                type="button"
                variant={'destructive'}
                onClick={() => onRemove(url)}
              >
                <Trash className=" w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              className=" object-cover"
              alt="Billboard Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="fuxgja5l">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={'secondary'}
              onClick={onClick}
            >
              <ImagePlus className=" w-4 h-4 mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
