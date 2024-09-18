import { getProfile, getUser } from '@/services/auth'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import FollowButton from '../follow-button'
import { Button } from '../ui/button'

interface Props {
  username: string
}

const ProfileThumb = async ({ username }: Props) => {
  const profile = await getProfile(username)
  const user = await getUser()

  return (
    <div className='flex gap-y-4 py-4 flex-col'>
      <div 
        className=' bg-primary/70 rounded-xl w-full h-48 max-sm:h-36 relative'
      >
        <div className='flex absolute left-0 -bottom-1/4'>
          <Avatar className='w-24 h-24'>
            <AvatarImage className='object-cover' src={profile?.avatar ?? ''} alt={profile?.username} />
            <AvatarFallback>{profile?.username?.at?.(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className='flex justify-between gap-y-1 items-center mt-8'>
        <div className='flex flex-col gap-y-1'>
          <h1 className='md:text-2xl text-lg font-bold'>{profile?.first_name} {profile?.last_name}</h1>
          <p className='text-sm text-muted-foreground'>@{profile?.username}</p>
        </div>
        <div>
          {
            profile?.id !== user?.id ? (
              <FollowButton author={profile} user={user} />
            ): (
              <Button variant='outline' className={`rounded-full`}>Edit Profile</Button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileThumb