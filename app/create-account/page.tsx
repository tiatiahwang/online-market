import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CreateAccount() {
  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>Hello 😄</h1>
        <h2 className='text-xl'>Fill out the form below to join Online Market!</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput name='username' type='text' placeholder='username' required errors={[]} />
        <FormInput name='email' type='email' placeholder='email' required errors={[]} />
        <FormInput name='password' type='password' placeholder='password' required errors={[]} />
        <FormInput name='password' type='password' placeholder='confirm password' required errors={[]} />
        <FormButton text='Create Account' />
      </form>
      <div className='w-full h-px bg-neutral-500' />
      <Link href='/sms' className='primary-btn flex h-10 items-center justify-center gap-2'>
        <span>
          <ChatBubbleOvalLeftEllipsisIcon className='size-6' />
        </span>
        <span>Sign up with SMS</span>
      </Link>
    </div>
  );
}
