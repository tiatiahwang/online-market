'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { ArrowRightIcon, PhotoIcon, XIcon } from '@/components/svg';
import { useState } from 'react';
import { uploadProduct } from './actions';
import Image from 'next/image';

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (!files) {
      throw new Error('알 수 없는 에러가 발생하였습니다.');
    }

    const newPreviews = [...previews];

    if (newPreviews.length === 0) {
      setImages(Array.from(files));

      for (let i = 0; i < 5; i++) {
        const reader = new FileReader();

        reader.onloadend = (e) => {
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        if (files[i]) {
          reader.readAsDataURL(files[i]);
        }
      }
    } else if (newPreviews.length < 5) {
      const addedFiles = Array.from(files);
      setImages((prev) => [...prev, ...addedFiles]);

      for (let i = 0; i < 5 - newPreviews.length; i++) {
        const reader = new FileReader();

        reader.onloadend = (e) => {
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        if (files[i]) {
          reader.readAsDataURL(files[i]);
        }
      }
    }
  };

  const handlePreviews = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  return (
    <div>
      {/* Header */}
      <div className='z-10 fixed top-0 mx-auto max-w-sm w-full p-4 grid grid-cols-4  justify-between bg-dark-bg border-b'>
        <div className='flex'>
          <XIcon width='26' height='26' stroke='#ECECEC' />
        </div>
        <div className='col-span-2 text-center text-title-small font-semibold space-x-1'>
          <span>Sell My Product</span>
        </div>
        <div />
      </div>
      <form action={uploadProduct} className='pt-20 flex flex-col gap-8'>
        {/* Image Upload */}
        <div className='flex space-x-4 px-4'>
          <label htmlFor='images'>
            <input type='file' id='images' onChange={handleFileChange} multiple accept='img/*' className='hidden' />
            <div className='size-[70px] space-y-0.5 bg-gray-90 flex flex-col items-center justify-center rounded-md cursor-pointer border border-dark-text-2'>
              <PhotoIcon width='30' height='30' stroke='#ACACAC' />
              <span className='text-sm text-dark-text-2 font-medium'>
                <span className={`${previews.length > 0 && 'font-semibold text-primary-3'}`}>{previews.length}</span>
                /5
              </span>
            </div>
          </label>
          {previews.length > 0 && (
            <div className='flex overflow-x-scroll space-x-4 w-full max-w-sm'>
              {previews.map((src, index) => (
                <div key={index} className='relative min-h-[70px] min-w-[70px]'>
                  <Image
                    width={70}
                    height={70}
                    src={src}
                    alt={`${src}-${index}`}
                    style={{
                      borderRadius: '6px',
                      objectFit: 'cover',
                      minHeight: '70px',
                      minWidth: '70px',
                    }}
                  />
                  <div
                    className='absolute -right-1 top-0 cursor-pointer size-4 flex items-center justify-center rounded-full bg-dark-text'
                    onClick={() => handlePreviews(index)}
                  >
                    <XIcon width='14' height='14' stroke='#212529' />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='px-4 space-y-3'>
          <label htmlFor='title' className='text-sm font-semibold'>
            Title
          </label>
          <Input name='title' required placeholder='title' type='text' />
        </div>
        <div className='px-4 space-y-3'>
          <label htmlFor='price' className='text-sm font-semibold'>
            Price
          </label>
          <Input name='price' type='number' required placeholder='price' />
        </div>
        <div className='px-4 space-y-3'>
          <label htmlFor='price' className='text-sm font-semibold'>
            Description
          </label>
          <Input name='description' type='text' required placeholder='description' />
        </div>
        <div className='px-4 space-y-3 cursor-pointer'>
          <span className='text-sm font-semibold'>Desired Selling Location</span>
          <div className='bg-transparent rounded-md w-full h-10 px-4 text-placeholder border border-dark-text-2 flex items-center justify-between'>
            <span>add location</span>
            <ArrowRightIcon width='20' height='20' stroke='#ECECEC' />
          </div>
        </div>
        <div className='fixed bottom-10 w-full max-w-sm px-4'>
          <Button text='Done' />
        </div>
      </form>
    </div>
  );
}
