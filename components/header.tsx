import Link from 'next/link';
import { ChevLeftIcon, XIcon } from './svg';

interface HeaderProps {
  title: string;
  href: string;
  showXIcon?: boolean;
  showPrevIcon?: boolean;
}

export default function Header({ title, href, showXIcon = false, showPrevIcon = false }: HeaderProps) {
  return (
    <div className='z-10 fixed top-0 mx-auto max-w-sm w-full p-4 grid grid-cols-4 items-center justify-between bg-dark-bg border-b'>
      {showXIcon && (
        <Link href={href} className='flex cursor-pointer'>
          <XIcon width='26' height='26' stroke='#ECECEC' />
        </Link>
      )}
      {showPrevIcon && (
        <Link href={href} className='flex cursor-pointer'>
          <ChevLeftIcon width='18' height='18' stroke='#ECECEC' />
        </Link>
      )}
      <div className='col-span-2 text-center text-title-small font-semibold space-x-1'>
        <span>{title}</span>
      </div>
    </div>
  );
}
