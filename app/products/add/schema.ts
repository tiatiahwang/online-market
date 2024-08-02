import { z } from 'zod';

export const productSchema = z.object({
  id: z.coerce.number().optional(),
  photo: z
    .string({
      required_error: 'Photo is required.',
    })
    .array()
    .optional(),
  photo_id: z.string().array().optional(),
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
