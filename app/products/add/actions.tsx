'use server';

import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const productSchema = z.object({
  photo_url: z
    .string({
      required_error: 'Photo is required.',
    })
    .array(),
  title: z.string({
    required_error: 'Title is required.',
  }),
  description: z.string({
    required_error: 'Description is required.',
  }),
  price: z.coerce.number({
    required_error: 'Price is required.',
  }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo_url: formData.getAll('photo_url'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  console.log(data);
  const result = productSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (!session.id) return;

    const product = await db.product.create({
      data: {
        title: result.data.title,
        price: result.data.price,
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

    for (let i = 0; i < result.data.photo_url.length; i++) {
      await db.photo.create({
        data: {
          url: result.data.photo_url[i],
          product: {
            connect: {
              id: product.id,
            },
          },
        },
      });
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
