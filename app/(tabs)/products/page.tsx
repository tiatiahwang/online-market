import Product from '@/components/products/product';
import db from '@/lib/db';

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
    },
  });

  return products;
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div className='p-4 flex flex-col gap-4'>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
