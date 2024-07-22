import { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        name={name}
        className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-pink-300 border-none px-4 placeholder:text-neutral-400'
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className='font-medium text-red-500'>
          {error}
        </span>
      ))}
    </div>
  );
}
