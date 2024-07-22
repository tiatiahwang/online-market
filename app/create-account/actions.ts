'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { z } from 'zod';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkPasswords = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
  password === confirm_password;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user) === false;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'username must be a string!',
        required_error: 'username is required!',
      })
      .trim()
      .toLowerCase()
      .refine(checkUniqueUsername, 'Please type another username.'),
    email: z.string().email().toLowerCase().refine(checkUniqueEmail, 'Please type another email.'),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: 'Passwords should be the same.',
    path: ['confirm_password'],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  // parse: throws error when data is invalidate. always use with try/catch.
  // safeParse: do not throw error even when data is invalidate. (=spa)
  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();

    //@ts-ignore
    session.id = user.id;
    await session.save();

    redirect('/profile');
  }
};
