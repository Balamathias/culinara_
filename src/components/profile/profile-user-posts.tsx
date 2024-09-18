'use client'

import React from 'react'
import { useInfiniteProfileUserPosts } from '@/services/client/posts';
import { User } from '@/types/db';
import { Loader2 } from 'lucide-react';
import useInfiniteScroll from '../hooks/use-infinite-scroll';
import PostsSkeleton from '../skeletons/posts';
import Post from '../post';

interface Props {
  user: User
}

const ProfileUserPosts = ({ user }: Props) => {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isLoading,
    error
  } = useInfiniteProfileUserPosts(user.username)

  useInfiniteScroll({ fetchNextPage, hasNextPage })

  if (isPending || isLoading) return <PostsSkeleton />
  
  if (error) return <div className='p-4 rounded-xl text-red-500 bg-red-500/15 w-full flex items-center justify-center'>Error loading posts...</div>

  if (!data?.pages.length) {
    return <PostsSkeleton />
  }

  return (
    <div className='flex flex-col gap-y-6 max-sm:mb-20'>
      {
        data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {
              page?.results.map(post => (
                <Post post={post} key={post.id} user={user} />
              ))
            }
          </React.Fragment>
        ))
      }

      {isFetchingNextPage && (
        <div className='w-full py-2 max-sm:mb-20'>
          <Loader2 className='animate-spin w-6 h-6 mx-auto' />
        </div>
      )}
    </div>
  )
}

export default ProfileUserPosts