import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostsSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-6'>
      <Skeleton className="w-full md:max-w-[500px] h-auto" />
      <Skeleton className="w-full md:max-w-[500px] h-auto" />
      <Skeleton className="w-full md:max-w-[500px] h-auto" />
    </div>
  )
}

export default PostsSkeleton