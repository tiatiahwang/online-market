import ProductList from '@/components/products/product-list';
import { PlusIcon } from '@/components/svg';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      price: true,
      created_at: true,
    },
    take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });

  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div className='w-full max-w-sm p-4 flex flex-col gap-4'>
      <ProductList initialProducts={initialProducts} />
      <div className='flex justify-end pr-4'>
        <div className='fixed bottom-24'>
          <Link
            href='/products/add'
            className='bg-primary-4 flex items-center justify-center rounded-full size-12 text-light-text dark:text-dark-text transition-colors hover:bg-pink-400'
          >
            <PlusIcon width='30' height='30' fill='#ECECEC' />
          </Link>
        </div>
      </div>
    </div>
  );
}
