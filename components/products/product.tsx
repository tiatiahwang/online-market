import { formatCurrency, formatTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  created_at: Date;
  photo: string;
}

export default function Product({ id, title, price, created_at, photo }: ProductProps) {
  return (
    <Link href={`/products/${id}`} className='flex gap-4'>
      <div className='relative size-28 rounded-md overflow-hidden'>
        <Image fill src={photo} alt={title} className='object-voer' />
      </div>
      <div className='flex flex-col gap-1 *:text-light-text *:dark:text-dark-text'>
        <span className='text-lg'>{title}</span>
        <span className='text-[12px] text-neutral-400'>{formatTime(created_at.toString())}</span>
        <span className='text-lg font-semibold'>${formatCurrency(price)}</span>
      </div>
    </Link>
  );
}
