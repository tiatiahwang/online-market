import { UserIcon } from '@/components/svg';
import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unstable_cache as nextCache } from 'next/cache';
import BottomDrawer from '@/components/products/bottom-drawer';
import ImageSlider from '@/components/image-slider';
import Header from '@/components/header';

async function CheckIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  console.log('product');
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
      photo: {
        select: {
          url: true,
        },
      },
    },
  });

  return product;
}

const getCachedProduct = nextCache(getProduct, ['product-detail'], {
  tags: ['product-detail'],
});

async function getProductTitle(id: number) {
  console.log('title');
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });

  return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
  tags: ['product-title', 'product-detail'],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));

  return {
    title: product?.title,
  };
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = +params.id;

  if (isNaN(id)) {
    return notFound();
  }

  const product = await getCachedProduct(id);

  if (!product) {
    return notFound();
  }

  const isOwner = await CheckIsOwner(product.userId);

  return (
    <>
      <Header title={product.title} showPrevIcon={true} href={`/`} />
      <div className='relative aspect-square pt-[52px]'>
        <ImageSlider photo={product.photo} />
      </div>
      <div className='p-5 flex justify-between items-center gap-3 border-b border-neutral-700'>
        <div className='w-[80%] size-10 flex items-center space-x-2'>
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
              className='rounded-full'
            />
          ) : (
            <UserIcon width='50' height='50' fill='none' stroke='#ECECEC' />
          )}
          <div>{product.user.username}</div>
        </div>
        <div>{isOwner ? <BottomDrawer productId={String(product.id)} /> : null}</div>
      </div>
      <div className='p-5'>
        <h1 className='text-2xl font-semibold'>{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className='w-full max-w-sm mx-auto fixed bottom-0 p-5 pb-10 border-t flex justify-between items-center'>
        <span className='font-semibold text-xl'>${formatCurrency(product.price)}</span>
        <Link
          className='bg-primary-4 px-5 py-2.5 rounded-md text-light-text dark:text-dark-text font-semibold'
          href={``}
        >
          Chat
        </Link>
      </div>
    </>
  );
}
