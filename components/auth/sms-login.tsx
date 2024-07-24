import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SMSLogin() {
  return (
    <Link href='/sms' className='primary-btn flex h-10 items-center justify-center gap-2'>
      <span>
        <ChatBubbleOvalLeftEllipsisIcon className='size-6' />
      </span>
      <span>Login with SMS</span>
    </Link>
  );
}
