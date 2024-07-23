import checkUsername from '@/lib/auth/checkUsername';
import getAccessToken from '@/lib/auth/google/getAccessToken';
import getGoogleProfile from '@/lib/auth/google/getGoogleProfile';
import db from '@/lib/db';
import loginSession from '@/lib/session/loginSession';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return notFound();
  }

  const { error, access_token } = await getAccessToken(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { username, email, avatar_url } = await getGoogleProfile(access_token);

  const user = await db.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  const isExistUsername = await checkUsername(username);

  if (!user) {
    const newUser = await db.user.create({
      data: {
        username: isExistUsername ? `gg-${username}` : username,
        avatar: avatar_url,
        email,
      },
      select: {
        id: true,
      },
    });

    await loginSession(newUser.id);
    return redirect('/profile');
  }

  await loginSession(user.id);
  return redirect('/profile');
}
