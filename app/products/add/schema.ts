import { z } from 'zod';

export const productSchema = z.object({
  photo: z
    .string({
      required_error: 'Photo is required.',
    })
    .array(),
  photo_id: z.string().array(),
  title: z.string({
    required_error: 'Title is required.',
  }),
  description: z.string({
    required_error: 'Description is required.',
  }),
  price: z.string({
    required_error: 'Price is required.',
  }),
});

export type ProductType = z.infer<typeof productSchema>;
