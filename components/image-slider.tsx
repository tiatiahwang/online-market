'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevLeftIcon, ChevRightIcon } from './svg';

interface ImageSliderProps {
  photo: { url: string }[];
}

export default function ImageSlider({ photo }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevImage = () => setCurrentIndex((prev) => (prev - 1 + photo.length) % photo.length);

  const handleNextImage = () => setCurrentIndex((prev) => (prev + 1) % photo.length);

  return (
    <div className='relative w-full max-w-sm mx-auto'>
      <div className='relative h-[384px] group'>
        <Image
          src={`${photo[currentIndex].url}/public`}
          alt={`product image ${currentIndex + 1}`}
          layout='fill'
          objectFit='cover'
          className='transition-all duration-500 ease-in-out cursor-pointer'
        />
        <div className='flex justify-center absolute bottom-4 left-[40%]'>
          {photo.map((_, index) => (
            <div
              key={index}
              className={`size-2 mx-1 ${
                index === currentIndex ? 'bg-primary-3 rounded-xl' : 'bg-dark-bg/60 rounded-xl'
              } transition-all duration-500 ease-in-out`}
            ></div>
          ))}
        </div>
      </div>
      {currentIndex !== 0 && (
        <button
          className='absolute left-0 top-1/2 transform h-fit rounded-full mx-1 -mt-[10px] -translate-y-1/2 bg-dark-bg/60 p-2'
          onClick={handlePrevImage}
        >
          <ChevLeftIcon width='14' height='14' stroke='#ECECEC' />
        </button>
      )}
      {currentIndex < photo.length - 1 && (
        <button
          className='absolute right-0 top-1/2 transform h-fit rounded-full mx-1 -mt-[10px] -translate-y-1/2 bg-dark-bg/60 p-2 '
          onClick={handleNextImage}
        >
          <ChevRightIcon width='14' height='14' stroke='#ECECEC' />
        </button>
      )}
    </div>
  );
}
