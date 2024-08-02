'use server';

import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { productSchema } from '../../add/schema';
import { redirect } from 'next/navigation';

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

export async function editProduct(formData: FormData) {
  const data = {
    id: formData.get('id'),
    photo: formData.getAll('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };

  const result = productSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (!session.id) return;

    const product = await db.product.update({
      where: {
        id: result.data.id,
      },
      data: {
        title: result.data.title,
        price: +result.data.price,
        description: result.data.description,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!product.id) return;

    if (result.data.photo) {
      for (let i = 0; i < result.data.photo.length; i++) {
        const photo_id = result.data.photo[i].split('/')[4];
        await db.photo.create({
          data: {
            url: result.data.photo[i],
            cf_id: photo_id,
            product: {
              connect: {
                id: product.id,
              },
            },
          },
        });
      }
    }

    redirect(`/products/${product.id}`);
  }
}

export async function deletePhotoUrl(id: string) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    },
  );
  const data = await response.json();

  if (!data.success) {
    return {
      fieldErrors: {
        photo: ['Could not delete photo.'],
      },
    };
  }

  await db.photo.delete({
    where: {
      cf_id: id,
    },
  });
}
