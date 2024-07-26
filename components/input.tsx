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
        className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-primary-2 focus:ring-primary-3 border-none px-4 text-light-text'
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
