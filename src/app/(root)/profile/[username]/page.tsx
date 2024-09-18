import Empty from '@/components/empty'
import ProfileThumb from '@/components/profile/profile-thumb'
import ProfileUserPosts from '@/components/profile/profile-user-posts'
import ProfileThumbSkeleton from '@/components/skeletons/profile-thumb'
import { getProfile } from '@/services/auth'
import React, { Suspense } from 'react'

const Page = async ({ params }: { params: { username: string }}) => {
  const profile = await getProfile(params.username)

  if (!profile) {
    return <Empty 
      title='User not found'
      description={`The user with the username ${params.username} does not exist.`}
    />
  }

  return (
    <div className='flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between flex-col gap-y-10'>
      <Suspense fallback={<ProfileThumbSkeleton />}>
        <ProfileThumb username={params.username} />
      </Suspense>
      <div className='flex flex-col gap-y-6 max-sm:mb-20'>
        <ProfileUserPosts user={profile} />
      </div>
    </div>
  )
}

export default Page