'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';

export default function Login() {
  const [state, action] = useFormState(handleForm, {
    potatio: 1,
  } as any);

  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>Welcome!</h1>
        <h2 className='text-xl'>Login in with email and passwrod.</h2>
      </div>
      <form className='flex flex-col gap-3' action={action}>
        <FormInput name='email' type='email' placeholder='email' required errors={[]} />
        <FormInput name='password' type='password' placeholder='password' required errors={state?.errors ?? []} />
        <FormButton text='Login' />
      </form>
      <div className='w-full h-px bg-neutral-500' />
      <SocialLogin />
    </div>
  );
}
