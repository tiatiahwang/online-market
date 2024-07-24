import Link from 'next/link';
import '@/lib/db';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between min-h-screen p-4'>
      <div className='my-auto flex flex-col items-center gap-2 *:font-medium'>
        <span className='text-9xl'>🙌🏻</span>
        <h1 className='text-2xl'>Welcome to Online Market!</h1>
      </div>
      <div className='flex flex-col items-center gap-4 w-full'>
        <Link href='/create-account' className='primary-btn text-lg py-2.5'>
          Start
        </Link>
        <div className='flex gap-2'>
          <span>Already have an account?</span>
          <Link href='/login' className='hover:underline'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
