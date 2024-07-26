'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon, XIcon } from '@/components/svg';
import { useState } from 'react';
import { uploadProduct } from './actions';

export default function AddProduct() {
  const [preview, setPreview] = useState('');

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div>
      <div className='z-10 fixed top-0 mx-auto max-w-sm w-full p-4 grid grid-cols-4  justify-between bg-dark-bg border-b'>
        <div className='flex'>
          <XIcon width='26' height='26' stroke='#ECECEC' />
        </div>
        <div className='col-span-2 text-center text-title-small font-semibold space-x-1'>
          <span>Sell My Product</span>
        </div>
        <div />
      </div>
      <form action={uploadProduct} className='px-4 pt-20 flex flex-col gap-4'>
        <label
          htmlFor='photo'
          className='border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 borde-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover'
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon width='40' height='40' stroke='#FFF' />
              <div className='text-neutral-400 text-sm'>Add photo</div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type='file' id='photo' name='photo' accept='image/*' className='hidden' />
        <Input name='title' required placeholder='title' type='text' />
        <Input name='price' type='number' required placeholder='price' />
        <Input name='description' type='text' required placeholder='description' />
        <Button text='Done' />
      </form>
    </div>
  );
}
