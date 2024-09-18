'use client'

import React from 'react'
import { useInfinitePostsByTags } from '@/services/client/posts';
import { User } from '@/types/db';
import { Loader2 } from 'lucide-react';
import useInfiniteScroll from '../hooks/use-infinite-scroll';
import PostsSkeleton from '../skeletons/posts';
import Post from '../post';
import Empty from '../empty';

interface Props {
  user: User,
  tag: string
}

const TagPosts = ({ user, tag }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error
  } = useInfinitePostsByTags(tag)

  useInfiniteScroll({ fetchNextPage, hasNextPage })

  if (isPending) return <PostsSkeleton />
  
  if (!data?.pages.length) {
    return <PostsSkeleton />
  }

  if (error) return <div className='p-4 rounded-xl text-red-500 bg-red-500/15'>Error loading posts...</div>

  return (
    <div className='flex flex-col gap-y-6'>
      {
        data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {
              page?.results ? page?.results.map(post => (
                <Post post={post} key={post.id} user={user} />
              )): (
                <Empty 
                  title={`No post found for #${tag}`}
                  description={`Sorry, we could not find any post for #${tag}, please try another one.`}
                />
              )
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

export default TagPosts