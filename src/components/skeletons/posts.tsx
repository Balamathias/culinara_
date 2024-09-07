import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostsSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-6'>
      <Skeleton className="w-full md:max-w-[500px] h-auto aspect-square" />
      <Skeleton className="w-full md:max-w-[500px] h-auto aspect-square" />
      <Skeleton className="w-full md:max-w-[500px] h-auto aspect-square" />
    </div>
  )
}

export default PostsSkeleton