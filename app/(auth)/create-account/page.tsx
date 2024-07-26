'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>Hello 😄</h1>
        <h2 className='text-xl'>Fill out the form below to join Online Market!</h2>
      </div>
      <form action={action} className='flex flex-col gap-3'>
        <Input
          name='username'
          type='text'
          placeholder='username'
          minLength={3}
          maxLength={10}
          required
          errors={state?.fieldErrors.username}
        />
        <Input name='email' type='email' placeholder='email' required errors={state?.fieldErrors.email} />
        <Input
          name='password'
          type='password'
          placeholder='password'
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name='confirm_password'
          type='password'
          placeholder='confirm password'
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text='Create Account' />
      </form>
      <div className='w-full h-px bg-dark-bg dark:bg-light-bg ' />
      <Link href='/sms' className='primary-btn flex h-10 items-center justify-center gap-2'>
        <span>Login with SMS</span>
      </Link>
    </div>
  );
}
