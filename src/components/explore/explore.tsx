'use client'

import React from 'react'
import { useInfiniteExplore } from '@/services/client/posts';
import { User } from '@/types/db';
import { Loader2 } from 'lucide-react';
import useInfiniteScroll from '../hooks/use-infinite-scroll';
import PostsSkeleton from '../skeletons/posts';
import Post from '../post';
import Empty from '../empty';
import { useSearchParams } from 'next/navigation';

interface Props {
  user: User
}

const Explore = ({ user }: Props) => {

  const params = useSearchParams()
  const tab = params.get('tab') ?? 'all'

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error
  } = useInfiniteExplore(tab)

  useInfiniteScroll({ fetchNextPage, hasNextPage })

  if (isPending) return <PostsSkeleton />

  if (error) return <div className='p-4 rounded-xl text-red-500 bg-red-500/15'>Error loading posts...</div>

  return (
    <div className='flex flex-col gap-y-6 max-sm:mb-20'>
      {
        data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {
              page?.results?.length ? page?.results.map(post => (
                <Post post={post} key={post.id} user={user} />
              )) : (
                <Empty 
                  title="No Posts could be found"
                  description={`Sorry, we could not find any post in the "${tab}" tab, but do not fret!`}
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

export default Explore