import { EyeIcon, LikeIcon } from '@/components/svg';
import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { formatTime } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
}

async function getIsLiked(postId: number) {
  const session = await getSession();

  const like = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });

  return Boolean(like);
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = +params.id;

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  const likePost = async () => {
    'use server';

    try {
      const session = await getSession();

      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });

      revalidatePath(`/posts/${id}`);
    } catch (e) {}
  };

  const dislikePost = async () => {
    'use server';
    try {
      const session = await getSession();

      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });

      revalidatePath(`/posts/${id}`);
    } catch (e) {}
  };

  const isLiked = await getIsLiked(id);

  return (
    <div className='p-4 text-light-text dark:text-dark-text'>
      <div className='flex items-center gap-2 mb-2'>
        <Image
          width={28}
          height={28}
          className='size-10 rounded-full'
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className='text-sm font-semibold'>{post.user.username}</span>
          <div className='text-xs'>
            <span>{formatTime(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className='text-lg font-semibold'>{post.title}</h2>
      <p className='mb-4'>{post.description}</p>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex items-center gap-2 text-sm'>
          <EyeIcon width='16' height='16' stroke='#ECECEC' />
          <span>views {post.views}</span>
        </div>
        <form action={isLiked ? dislikePost : likePost} className='flex items-center gap-4 text-sm'>
          <button
            className={`flex items-center gap-2 p-2 text-sm rounded-full transition-colors ${
              isLiked ? 'hover:bg-light-text dark:hover:bg-dark-text' : 'hover:bg-primary-3'
            }`}
          >
            <LikeIcon width='16' height='16' stroke={isLiked ? '#60BC46' : '#ECECEC'} />
          </button>
          <span>likes {post._count.likes}</span>
        </form>
      </div>
    </div>
  );
}
