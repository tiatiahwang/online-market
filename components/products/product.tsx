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
        <Image fill src={photo} alt={title} />
      </div>
      <div className='flex flex-col gap-1 *:text-white'>
        <span className='text-lg'>{title}</span>
        <span className='text-lg font-semibold'>${price}</span>
        <span className='text-sm text-neutral-500'>{created_at.toString().slice(0, 10)}</span>
      </div>
    </Link>
  );
}
