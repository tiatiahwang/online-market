import FloatingButton from '@/components/floating-button';
import ProductList from '@/components/products/product-list';
import { PlusIcon } from '@/components/svg';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

async function getInitialProducts() {
  console.log('hit!');
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      photo: {
        select: {
          url: true,
        },
      },
      price: true,
      created_at: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export const metadata = {
  title: 'Home',
};

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div className='w-full max-w-sm p-4 flex flex-col gap-4'>
      <ProductList initialProducts={initialProducts} />
      <FloatingButton href='/products/add' />
    </div>
  );
}
