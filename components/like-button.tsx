'use client';

import { useOptimistic } from 'react';
import { LikeIcon } from './svg';
import { dislikePost, likePost } from '@/app/posts/[id]/actions';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({ isLiked, likeCount, postId }: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (prevState, payload) => ({
    isLiked: !prevState.isLiked,
    likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
  }));

  const handleButton = async () => {
    reducerFn(undefined);

    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <button
      onClick={handleButton}
      className='flex items-center gap-2 text-sm rounded-full transition-colors bg-dark-text-3 py-2 px-4 hover:bg-dark-text-4'
    >
      <LikeIcon width='16' height='16' stroke='#ECECEC' fill={state.isLiked ? '#ECECEC' : 'none'} />
      <span>{state.likeCount}</span>
    </button>
  );
}
