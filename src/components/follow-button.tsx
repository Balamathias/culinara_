'use client'

import React, { useState } from 'react'
import { User } from '@/types/db'
import { cn } from '@/lib/utils'
import { useFollowUnfollowUser } from '@/services/client/auth'
import { Button } from './ui/button'

interface PostActionsProps {
  author: User | null,
  user: User | null
}

const FollowButton = ({author, user}: PostActionsProps) => {
  const [followers, setFollowers] = useState(author?.followers ?? [])
  const hasFollowed = followers?.includes(user?.id ?? '')
  const { mutate: followUnfollow } = useFollowUnfollowUser()

  if (author?.id === user?.id) return

  return (
    <Button 
      variant={hasFollowed ? 'ghost' : 'default'} 
      className={cn(
        'py-2 flex items-center justify-between z-20 rounded-full', 
        hasFollowed && 'text-primary',
      )}
      onClick={() => {
        if (hasFollowed) {
          setFollowers(prev => prev.filter(id => id !== user?.id))
          followUnfollow({ userId: author?.id ?? '' })
        } else {
          setFollowers(prev => [...prev, user?.id ?? ''])
          followUnfollow({ userId: author?.id ?? '' })
        }
      }}
    >
      {hasFollowed ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default FollowButton