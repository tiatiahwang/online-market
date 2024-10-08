import { notFound } from 'next/navigation';
import { unstable_cache as nextCache } from 'next/cache';
import { getProductDetail } from './action';
import getSession from '@/lib/session/getSession';
import EditForm from '@/components/products/edit-form';
import { XIcon } from '@/components/svg';
import Link from 'next/link';
import Header from '@/components/header';

const getCachedProduct = nextCache(getProductDetail, ['product-detail'], {
  tags: ['product-detail'],
});

export default async function EditProduct({ params }: { params: { id: string } }) {
  const id = +params.id;

  if (isNaN(id)) {
    return notFound();
  }

  const product = await getCachedProduct(id);

  if (!product) {
    return notFound();
  }

  const session = await getSession();
  const isOwner = session.id === product.userId;

  if (!isOwner) {
    return notFound();
  }

  return (
    <>
      <Header title='Edit Product' showXIcon={true} href={`/products/${id}`} />
      <EditForm id={id} product={product} />
    </>
  );
}
