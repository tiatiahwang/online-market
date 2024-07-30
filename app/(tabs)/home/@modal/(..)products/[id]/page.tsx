'use client';

import { PhotoIcon, XIcon } from '@/components/svg';
import { useRouter } from 'next/navigation';

export default function Modal({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className='w-full max-w-sm mx-auto h-screen z-50 flex items-center justify-center bg-[#212121] bg-opacity-50 absolute top-0'>
      <div className='relative w-full max-w-sm h-full'>
        <button onClick={handleClose} className='absolute right-5 top-5'>
          <XIcon width='28' height='28' stroke='#ACACAC' />
        </button>
        <div className='flex justify-center items-center h-full'>
          <div className='max-w-sm h-1/2 aspect-square border rounded-md flex justify-center items-center'>
            <PhotoIcon width='30' height='30' stroke='#ACACAC' />
          </div>
        </div>
      </div>
    </div>
  );
}
