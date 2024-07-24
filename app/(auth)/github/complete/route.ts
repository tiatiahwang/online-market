import db from '@/lib/db';
import getAccessToken from '@/lib/auth/github/getAccessToken';
import getGithubProfile from '@/lib/auth/github/getGithubProfile';
import loginSession from '@/lib/session/loginSession';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import checkUsername from '@/lib/auth/checkUsername';
import getGithubEmail from '@/lib/auth/github/getGithubEmail';

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

  const { id, avatar_url, username } = await getGithubProfile(access_token);

  const email = await getGithubEmail(access_token);

  const user = await db.user.findFirst({
    where: { OR: [{ github_id: id + '' }, { email }] },
    select: {
      id: true,
      github_id: true,
      email: true,
    },
  });

  const isExistUsername = await checkUsername(username);

  if (!user) {
    const newUser = await db.user.create({
      data: {
        username: isExistUsername ? `gh-${username}` : username,
        github_id: id + '',
        avatar: avatar_url,
        email,
      },
      select: {
        id: true,
      },
    });

    await loginSession(newUser.id);
    return redirect('/profile');
  } else if (user.github_id === id + '') {
    // In case of already existed github id, login
    await loginSession(user.id);
    return redirect('/profile');
  } else if (user.email === email && !user.github_id) {
    // In case of duplicated eamil but no github_id
    const updateUser = await db.user.update({
      where: {
        email,
      },
      data: {
        github_id: id + '',
      },
      select: {
        id: true,
      },
    });
    await loginSession(updateUser.id);
    return redirect('/profile');
  }
}
