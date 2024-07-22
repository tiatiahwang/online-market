'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './action';

const INITIAL_STATE = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useFormState(smsLogin, INITIAL_STATE);

  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form action={action} className='flex flex-col gap-3'>
        {state.token ? (
          <Input
            key='token'
            name='token'
            type='number'
            placeholder='verification code'
            min={100000}
            max={999999}
            required
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            key='phone'
            name='phone'
            type='number'
            placeholder='phone number'
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? 'Verify Token' : 'Send Verification SMS'} />
      </form>
    </div>
  );
}
