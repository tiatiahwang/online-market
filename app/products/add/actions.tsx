'use server';

import { z } from 'zod';

const productSchema = z.object({
  photo: z.string({
    required_error: 'Photo is required.',
  }),
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
export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  console.log(data);
}
