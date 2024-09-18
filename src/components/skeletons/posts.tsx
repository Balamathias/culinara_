'use client'

import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostsSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-8 md:w-[500px] w-full'>
      {[0, 2, 3].map(item => (
        <div className='flex flex-col gap-y-2.5' key={item}>
          <div className='flex flex-row items-center gap-x-2'>
            <Skeleton className='h-14 w-14 rounded-full' />
            <Skeleton className='w-28 h-4' />
          </div>

          <div className='flex flex-col gap-y-3'>
            <Skeleton className='rounded-t w-full aspect-square' />

            <div className='flex flex-row items-center gap-x-2.5'>
              {['tag1', 'tag2', 'tag3', 'tag4'].map(tag => (
                <Skeleton key={tag} className='h-5 w-14 rounded-xl' />
              ))}
            </div>

            <div className='flex flex-col gap-y-1.5'>
              <Skeleton className='h-4' />
              <Skeleton className='h-4' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsSkeleton