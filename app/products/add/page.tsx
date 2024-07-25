'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@/components/svg';
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
      <form action={uploadProduct} className='p-4 flex flex-col gap-4'>
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
