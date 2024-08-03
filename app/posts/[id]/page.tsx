import { EyeIcon, LikeIcon } from '@/components/svg';
import db from '@/lib/db';
import getSession from '@/lib/session/getSession';
import { formatTime } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { unstable_cache as nextCache, revalidateTag } from 'next/cache';
import LikeButton from '@/components/like-button';

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
          },
        },
      },
    });

    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;

  const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
    tags: [`like-status-${postId}`],
  });

  return cachedOperation(postId, userId!);
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = +params.id;

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);

  if (!post) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

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
      <div className='flex items-center gap-2'>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}
