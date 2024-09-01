import Header from '@/components/header';
import { UserIcon } from '@/components/svg';
import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const logout = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };

  return (
    <div>
      <div className='p-4 flex justify-between items-center gap-3'>
        <div className='size-10 flex items-center space-x-2'>
          {user.avatar !== null ? (
            <Image src={user.avatar} width={40} height={40} alt={user.username} className='rounded-full' />
          ) : (
            <UserIcon width='50' height='50' fill='none' stroke='#ECECEC' />
          )}
          <div>{user.username}</div>
        </div>
        <Link href={`/profile/edit`} className='text-[12px] bg-dark-text-4 px-4 py-2 rounded-xl'>
          Edit Profile
        </Link>
      </div>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
}
