import { User } from '@/types/db'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import Trending from './trending'

interface HomeActionsProps {
  user: User | null
}

const HomeActions = async ({ user }: HomeActionsProps) => {
  return (
    <div className='md:flex flex-col gap-y-4 hidden basis-1/3'>
      <div className='flex items-center gap-x-2.5'>
        <Avatar className='border-health'>
          <AvatarImage src={user?.avatar ?? ''} className='object-cover' />
          <AvatarFallback className={'bg-wealth/10 text-wealth'} content={user?.username ?? 'A'} />
        </Avatar>
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold'>{user?.username}</h2>
          <p className='text-muted-foreground text-sm'>{user?.first_name} {user?.last_name}</p>
        </div>
      </div>
      <Trending />
    </div>
  )
}

export default HomeActions