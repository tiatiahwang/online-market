'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChatFullIcon, ChatIcon, HomeFullIcon, HomeIcon, LifeFullIcon, LifeIcon, UserFullIcon, UserIcon } from './svg';

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className='fixed bottom-0 w-full mx-auto max-w-sm grid grid-cols-4 border-t border-dark-bg dark:border-light-bg  px-5 py-3 *:text-light-text *:dark:text-dark-text'>
      <Link href='/home' className='flex flex-col items-center gap-px'>
        {pathname === '/home' ? (
          <HomeFullIcon width='30' height='30' fill='#60BC46' stroke='none' />
        ) : (
          <HomeIcon width='30' height='30' fill='none' stroke='#ECECEC' />
        )}
      </Link>
      <Link href='/life' className='flex flex-col items-center gap-px'>
        {pathname === '/life' ? (
          <LifeFullIcon width='30' height='30' fill='#60BC46' stroke='none' />
        ) : (
          <LifeIcon width='30' height='30' fill='none' stroke='#ECECEC' />
        )}
      </Link>
      <Link href='/chat' className='flex flex-col items-center gap-px'>
        {pathname === '/chat' ? (
          <ChatFullIcon width='28' height='30' fill='#60BC46' stroke='none' />
        ) : (
          <ChatIcon width='28' height='30' fill='none' stroke='#ECECEC' />
        )}
      </Link>
      <Link href='/profile' className='flex flex-col items-center gap-px'>
        {pathname === '/profile' ? (
          <UserFullIcon width='30' height='30' fill='#60BC46' stroke='none' />
        ) : (
          <UserIcon width='30' height='30' fill='none' stroke='#ECECEC' />
        )}
      </Link>
    </div>
  );
}
