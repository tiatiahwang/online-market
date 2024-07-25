'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChatFullIcon, ChatIcon, HomeFullIcon, HomeIcon, LifeFullIcon, LifeIcon, UserFullIcon, UserIcon } from './svg';

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className='fixed bottom-0 w-full mx-auto max-w-sm grid grid-cols-4 border-neutral-600 border-t px-5 py-3 bg-neutral-900 *:text-white'>
      <Link href='/products' className='flex flex-col items-center gap-px'>
        {pathname === '/products' ? (
          <HomeFullIcon width='30' height='30' fill='#fff' stroke='none' />
        ) : (
          <HomeIcon width='30' height='30' fill='none' stroke='#fff' />
        )}
      </Link>
      <Link href='/live' className='flex flex-col items-center gap-px'>
        {pathname === '/live' ? (
          <LifeFullIcon width='30' height='30' fill='#fff' stroke='none' />
        ) : (
          <LifeIcon width='30' height='30' fill='none' stroke='#fff' />
        )}
      </Link>
      <Link href='/chat' className='flex flex-col items-center gap-px'>
        {pathname === '/chat' ? (
          <ChatFullIcon width='28' height='30' fill='#fff' stroke='none' />
        ) : (
          <ChatIcon width='28' height='30' fill='none' stroke='#fff' />
        )}
      </Link>
      <Link href='/profile' className='flex flex-col items-center gap-px'>
        {pathname === '/profile' ? (
          <UserFullIcon width='30' height='30' fill='#fff' stroke='none' />
        ) : (
          <UserIcon width='30' height='30' fill='none' stroke='#fff' />
        )}
      </Link>
    </div>
  );
}
