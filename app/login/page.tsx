'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { logIn } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

export default function Login() {
  const [state, action] = useFormState(logIn, {
    potatio: 1,
  } as any);

  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>Welcome!</h1>
        <h2 className='text-xl'>Login in with email and passwrod.</h2>
      </div>
      <form action={action} className='flex flex-col gap-3'>
        <Input name='email' type='email' placeholder='email' required errors={state?.fieldErrors.email} />
        <Input
          name='password'
          type='password'
          placeholder='password'
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Button text='Login' />
      </form>
      <div className='w-full h-px bg-neutral-500' />
      <SocialLogin />
    </div>
  );
}
