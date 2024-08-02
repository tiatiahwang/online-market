'use client';

import { productSchema, ProductType } from '@/app/products/add/schema';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, PhotoIcon, XIcon } from '../svg';
import Button from '../button';
import Input from '../input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPhotoUrl } from '@/app/products/add/actions';
import { deletePhotoUrl, editProduct } from '@/app/products/[id]/edit/action';

interface EditFormProps {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    userId: number;
    photo: {
      id: number;
      cf_id: string;
      url: string;
    }[];
  };
}

export default function EditForm({ id, product }: EditFormProps) {
  const [files, setFiles] = useState<{ [x: string]: File }[] | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);
  const [uploadPhotoIds, setUploadPhotoIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urls = product.photo.map((item) => item.url);
    setPreviews(urls);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const handleUrl = async () => {
    const { success, result } = await getPhotoUrl();
    if (success) {
      return result;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (!files) {
      throw new Error('알 수 없는 에러가 발생하였습니다.');
    }

    const newPreviews = [...previews];
    const newUploadUrls = [...uploadUrls];
    const newUploadIds = [...uploadPhotoIds];

    const sliced = Object.entries(files)
      .slice(0, 5 - newPreviews.length)
      .map((file) => ({ [file[0]]: file[1] }));

    setFiles(sliced);

    if (newPreviews.length < 5) {
      for (let i = 0; i < 5 - newPreviews.length; i++) {
        const reader = new FileReader();

        reader.onloadend = async (e) => {
          setIsLoading(true);
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
          const { id, uploadURL } = await handleUrl();
          newUploadUrls.push(uploadURL);
          newUploadIds.push(id);
          setIsLoading(false);
        };
        if (files[i]) {
          reader.readAsDataURL(files[i]);
        }
        setUploadUrls(newUploadUrls);
        setUploadPhotoIds(newUploadIds);
        setValue('photo', newUploadUrls);
      }
    }
  };

  const handlePreviews = async (index: number) => {
    const photoId = previews[index].split('/')[4];
    const response = await deletePhotoUrl(photoId);
    if (response?.fieldErrors?.photo) {
      setError('photo', { message: response?.fieldErrors?.photo[0] });
      return;
    }
    const newPreviews = [...previews];
    const newUploadUrls = [...uploadUrls];
    const newUploadIds = [...uploadPhotoIds];
    newPreviews.splice(index, 1);
    newUploadUrls.splice(index, 1);
    newUploadIds.splice(index, 1);
    setPreviews(newPreviews);
    setUploadUrls(newUploadUrls);
    setUploadPhotoIds(newUploadIds);
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    console.log('submit!!');
    if (!files) {
      throw new Error('알 수 없는 에러가 발생하였습니다.');
    }

    let urls = [];
    for (let i = 0; i < files.length; i++) {
      const cloudflareForm = new FormData();
      cloudflareForm.append('file', files[i][i], `${uploadPhotoIds[i]}`);

      const response = await fetch(uploadUrls[i], {
        method: 'POST',
        body: cloudflareForm,
      });

      if (response.status !== 200) {
        throw new Error('알 수 없는 에러가 발생하였습니다.');
      }

      const photoUrl = `https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${uploadPhotoIds[i]}`;
      urls.push(photoUrl);
    }

    const formData = new FormData();

    formData.append('id', id + '');
    formData.append('title', data.title);
    formData.append('price', data.price + '');
    formData.append('description', data.description);

    for (const url of urls) {
      formData.append('photo', url);
    }

    const errors = await editProduct(formData);

    if (errors) {
      // setError('')
    }
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <div className='z-10 fixed top-0 mx-auto max-w-sm w-full p-4 grid grid-cols-4  justify-between bg-dark-bg border-b'>
        <div className='flex cursor-pointer'>
          <XIcon width='26' height='26' stroke='#ECECEC' />
        </div>
        <div className='col-span-2 text-center text-title-small font-semibold space-x-1'>
          <span>Edit Product</span>
        </div>
        <div />
      </div>
      <form action={onValid} className='pt-20 flex flex-col gap-8'>
        {/* Image Upload */}
        <div className='flex flex-col px-4'>
          <div className='flex space-x-4'>
            <label htmlFor='photo'>
              <input
                type='file'
                id='photo'
                name='photo'
                onChange={handleFileChange}
                multiple
                accept='img/*'
                className='hidden'
              />
              <div className='size-[70px] space-y-0.5 bg-gray-90 flex flex-col items-center justify-center rounded-md cursor-pointer border border-dark-text-2'>
                <PhotoIcon width='30' height='30' stroke='#ACACAC' />
                <span className='text-sm text-dark-text-2 font-medium'>
                  <span className={`${previews.length > 0 && 'font-semibold text-primary-3'}`}>{previews.length}</span>
                  /5
                </span>
              </div>
            </label>
            {/* TODO: need to add loading spinner */}
            {isLoading && 'Loading'}
            {!isLoading && previews.length > 0 && (
              <div className='flex overflow-x-scroll space-x-4 w-full max-w-sm'>
                {previews.map((src, index) => (
                  <div key={index} className='relative min-h-[70px] min-w-[70px] max-w-[70px] max-h-[70px]'>
                    <Image
                      width={70}
                      height={70}
                      src={src.includes('https') ? `${src}/avatar` : src}
                      alt={`${src}-${index}`}
                      style={{
                        borderRadius: '6px',
                        objectFit: 'cover',
                        minHeight: '70px',
                        minWidth: '70px',
                        maxHeight: '70px',
                        maxWidth: '70px',
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
          {errors.photo?.message && <div>{errors.photo.message}</div>}
        </div>
        <div className='px-4 space-y-3'>
          <label htmlFor='title' className='text-sm font-semibold'>
            Title
          </label>
          <Input
            required
            placeholder='title'
            defaultValue={product.title}
            type='text'
            errors={[errors.title?.message ?? '']}
            {...register('title')}
          />
        </div>
        <div className='px-4 space-y-3'>
          <label htmlFor='price' className='text-sm font-semibold'>
            Price
          </label>
          <Input
            type='number'
            required
            placeholder='price'
            defaultValue={product.price}
            errors={[errors.price?.message ?? '']}
            {...register('price')}
          />
        </div>
        <div className='px-4 space-y-3'>
          <label htmlFor='price' className='text-sm font-semibold'>
            Description
          </label>
          <Input
            type='text'
            required
            placeholder='description'
            defaultValue={product.description}
            errors={[errors.description?.message ?? '']}
            {...register('description')}
          />
        </div>
        <div className='px-4 space-y-3 cursor-pointer'>
          <span className='text-sm font-semibold'>Desired Selling Location</span>
          <div className='bg-transparent rounded-md w-full h-10 px-4 text-placeholder border border-dark-text-2 flex items-center justify-between'>
            <span>add location</span>
            <ArrowRightIcon width='20' height='20' stroke='#ECECEC' />
          </div>
        </div>
        <div className='fixed bottom-10 w-full max-w-sm px-4'>
          <Button text='Edit' />
        </div>
      </form>
    </div>
  );
}
