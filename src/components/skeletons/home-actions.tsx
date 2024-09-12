import React from 'react'
import { Skeleton } from '../ui/skeleton'

const HomeActionsSkeleton = () => {
  return (
    <div className='md:flex basis-1/3 w-full flex-col gap-y-3 hidden'>
      <Skeleton className='w-full h-24' />
      <Skeleton className='w-full h-24 mt-6' />
      <Skeleton className='w-full h-24' />
      <Skeleton className='w-full h-24' />
      <Skeleton className='w-full h-24' />
      <Skeleton className='w-full h-24' />
    </div>
  )
}

export default HomeActionsSkeleton