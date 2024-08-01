import db from '@/lib/db';

export async function getProductDetail(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      price: true,
      description: true,
      userId: true,
      photo: true,
    },
  });

  return product;
}
