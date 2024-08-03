import { CommentIcon, LikeIcon } from '@/components/svg';
import db from '@/lib/db';
import { formatTime } from '@/lib/utils';
import Link from 'next/link';

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  return posts;
}

export default async function Life() {
  const posts = await getPosts();

  return (
    <div className='p-5 flex flex-col'>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className='pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0'
        >
          <h2 className='text-white text-lg font-semibold'>{post.title}</h2>
          <p>{post.description}</p>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex gap-2 items-center'>
              <span>{formatTime(post.created_at.toString())}</span>
              <span className='text-[10px]'>|</span>
              <span>views {post.views}</span>
            </div>
            <div className='flex gap-2 items-center *:flex *:gap-1 *:items-center'>
              <span>
                <LikeIcon width='16' height='16' stroke='#ECECEC' />
                {post._count.likes}
              </span>
              <span>
                <CommentIcon width='16' height='16' stroke='#ECECEC' />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
