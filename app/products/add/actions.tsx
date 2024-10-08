'use server';

import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { redirect } from 'next/navigation';
import { productSchema } from './schema';

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.getAll('photo'),
    photo_id: formData.getAll('photo_id'),
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

    const product = await db.product.create({
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

    if (result.data.photo && result.data.photo_id) {
      for (let i = 0; i < result.data.photo.length; i++) {
        await db.photo.create({
          data: {
            url: result.data.photo[i],
            cf_id: result.data.photo_id[i],
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

export async function getPhotoUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data;
}
