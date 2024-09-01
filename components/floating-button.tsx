import Link from 'next/link';
import { PlusIcon } from './svg';

export default function FloatingButton({ href }: { href: string }) {
  return (
    <div className='flex justify-end pr-4'>
      <div className='fixed bottom-20'>
        <Link
          href={href}
          className='bg-primary-4 flex items-center justify-center rounded-full size-12 text-light-text dark:text-dark-text transition-colors hover:bg-pink-400'
        >
          <PlusIcon width='30' height='30' fill='#ECECEC' />
        </Link>
      </div>
    </div>
  );
}
