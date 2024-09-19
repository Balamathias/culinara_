import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProfileThumbSkeleton = () => {
  return (
    <div className='flex gap-y-4 py-4 flex-col'>
      <Skeleton className='rounded-xl w-full h-48 relative bg-primary'>
        <div className='flex absolute left-0 -bottom-1/4'>
          <Skeleton className='w-24 h-24 rounded-full -z-10' />
        </div>
      </Skeleton>
      <div className='flex justify-between flex-row gap-y-1 items-center mt-10'>
        <div className='flex flex-col gap-y-1'>
          <Skeleton className='md:w-48 w-36 h-6' />
          <Skeleton className='w-24 h-4' />
        </div>
        <div>
          <Skeleton className='w-20 h-8 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default ProfileThumbSkeleton