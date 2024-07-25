import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { formatCurrency } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function CheckIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return product;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = +params.id;

  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await CheckIsOwner(product.userId);

  return (
    <div>
      <div className='relative aspect-square'>
        <Image fill src={product.photo} alt={product.title} />
      </div>
      <div className='p-5 flex justify-between items-center gap-3 border-b border-neutral-700'>
        <div className='w-[80%] size-10 rounded-full flex'>
          {product.user.avatar !== null ? (
            <Image src={product.user.avatar} width={40} height={40} alt={product.user.username} />
          ) : (
            <UserIcon className='w-[40px] h-[40px]' />
          )}
          <div>{product.user.username}</div>
        </div>
        <div>
          {isOwner ? (
            <div className='cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
      <div className='p-5'>
        <h1 className='text-2xl font-semibold'>{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className='w-full max-w-sm mx-auto fixed bottom-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center'>
        <span className='font-semibold text-xl'>${formatCurrency(product.price)}</span>
        <Link className='bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold' href={``}>
          Chat
        </Link>
      </div>
    </div>
  );
}
