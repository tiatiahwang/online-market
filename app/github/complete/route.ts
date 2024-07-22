import db from '@/lib/db';
import getAccessToken from '@/lib/auth/github/getAccessToken';
import getGithubProfile from '@/lib/auth/github/getGithubProfile';
import getSession from '@/lib/session/getSession';
import updateSession from '@/lib/session/updateSession';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import checkUsername from '@/lib/auth/checkUsername';
import getGithubEmail from '@/lib/auth/github/getGithubEmail';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { error, access_token } = await getAccessToken(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const { id, avatar_url, username } = await getGithubProfile(access_token);
  const githubEmail = await getGithubEmail(access_token);

  const user = await db.user.findUnique({
    where: {
      github_id: id + '',
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await updateSession(user.id);
    return redirect('/profile');
  }

  const isExistUsername = await checkUsername(username);

  const newUser = await db.user.create({
    data: {
      username: isExistUsername ? `gh-${username}` : username,
      github_id: id + '',
      avatar: avatar_url,
      email: githubEmail,
    },
    select: {
      id: true,
    },
  });

  await updateSession(newUser.id);
  return redirect('/profile');
}
