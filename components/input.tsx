import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  { name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className='flex flex-col gap-2'>
      <input
        ref={ref}
        name={name}
        className='bg-light-bg dark:bg-dark-bg rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-dark-text-2 focus:ring-primary-3 border-none px-4 text-light-text dark:text-dark-text placeholder:text-placeholder'
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className='font-medium text-red-500'>
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
