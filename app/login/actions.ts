'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import loginSession from '@/lib/session/loginSession';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkEmailExists, 'Email does not exist.'),
  password: z.string({
    required_error: 'Password is required',
  }),
  //.min(PASSWORD_MIN_LENGTH),
  //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const logIn = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? 'xx');

    if (ok) {
      await loginSession(user!.id);
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['Please check your password.'],
          email: [],
        },
      };
    }
  }
};
