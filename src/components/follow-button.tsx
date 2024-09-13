'use client'

import React, { useState } from 'react'
import { Post, User } from '@/types/db'
import { cn } from '@/lib/utils'
import { useFollowUnfollowUser } from '@/services/client/auth'
import { Button } from './ui/button'

interface PostActionsProps {
  post: Post | null,
  user: User | null
}

const PostActions = ({post, user}: PostActionsProps) => {
  const [following, setFollowing] = useState(post?.likes ?? [])
  const hasFollowed = following?.includes(user?.id ?? '')
  const { mutate: followUnfollow } = useFollowUnfollowUser()

  if (post?.author?.id === user?.id) return

  return (
    <Button 
      variant={hasFollowed ? 'ghost' : 'default'} 
      className={cn(
        'py-2 flex items-center justify-between z-20 rounded-full', 
        hasFollowed && 'text-primary',
      )}
      onClick={() => {
        if (hasFollowed) {
          setFollowing(prev => prev.filter(id => id !== user?.id))
          followUnfollow({ userId: post?.author?.id ?? '' })
        } else {
          setFollowing(prev => [...prev, user?.id ?? ''])
          followUnfollow({ userId: post?.author?.id ?? '' })
        }
      }}
    >
      {hasFollowed ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default PostActions