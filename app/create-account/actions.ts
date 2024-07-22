'use server';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'username must be a string!',
        required_error: 'username is required!',
      })
      .trim()
      .toLowerCase(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Both passwords should be the same.',
        path: ['confirm_password'],
      });
    }
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  // parse: throws error when data is invalidate. always use with try/catch.
  // safeParse: do not throw error even when data is invalidate
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
