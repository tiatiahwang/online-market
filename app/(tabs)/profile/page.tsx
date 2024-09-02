import Header from '@/components/header';
import { DeleteIcon, LikeIcon, LogoutIcon, PurchaseIcon, SellIcon, UserIcon } from '@/components/svg';
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
    <>
      <Header href='' title='My Profile' />
      <div className='p-4 pt-[78px] divide-y divide-dark-text-3/50'>
        <section className='flex justify-between items-center gap-3 pb-4'>
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
        </section>
        <section className='py-4'>
          <div className='font-semibold pb-6'>My History</div>
          <div className='space-y-4'>
            <div className='w-fit flex items-center space-x-2 cursor-pointer'>
              <LikeIcon width='18' height='18' fill='#212529' stroke='#ECECEC' />
              <span>Favorites</span>
            </div>
            <div className='w-fit flex items-center space-x-2 cursor-pointer'>
              <PurchaseIcon width='18' height='18' stroke='#ECECEC' />
              <span>Purchases</span>
            </div>
            <div className='w-fit flex items-center space-x-2 cursor-pointer'>
              <SellIcon width='18' height='18' stroke='#ECECEC' />
              <span>Sells</span>
            </div>
          </div>
        </section>
        <section className='py-4'>
          <div className='font-semibold pb-6'>Others</div>
          <div className='space-y-4'>
            <form action={logout}>
              <div className='w-fit flex items-center space-x-2 cursor-pointer'>
                <LogoutIcon width='18' height='18' stroke='#ECECEC' />
                <div>Log out</div>
              </div>
            </form>
            {/* TODO: delete account */}
            <form action={logout}>
              <div className='w-fit flex items-center space-x-2 cursor-pointer'>
                <DeleteIcon width='18' height='18' stroke='#ECECEC' />
                <div>Delete Account</div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
