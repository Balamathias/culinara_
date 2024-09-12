'use client'

import React, { useState } from 'react'
import { LucideHeart, LucideShare2 } from 'lucide-react'
import { Post, User } from '@/types/db'
import { cn } from '@/lib/utils'
import { useLikePost } from '@/services/client/posts'

interface PostActionsProps {
  post: Post | null,
  user: User | null
}

const PostActions = ({post, user}: PostActionsProps) => {
  const [likes, setLikes] = useState(post?.likes ?? [])
  const hasLiked = likes?.includes(user?.id ?? '')
  const { mutate: likePost } = useLikePost()

  return (
    <div className='py-2 flex items-center justify-between z-10'>
      <div className='flex flex-row gap-x-1 items-center'>
        <LucideHeart 
          size={28} 
          fill={hasLiked ? 'currentColor' : undefined} 
          className={cn('hover:cursor-pointer hover:scale-[0.9] hover:duration-100 hover:transition-all', hasLiked && 'text-primary')} 
          onClick={() => {
            if (hasLiked) {
              setLikes(prev => prev.filter(id => id !== user?.id))
              likePost({ postId: post?.id ?? '' })
            } else {
              setLikes(prev => [...prev, user?.id ?? ''])
              likePost({ postId: post?.id ?? ''})
            }
          }}
        />
        <span className='text-lg'>{likes?.length ?? post?.likes_count ?? 0}</span>
      </div>
      <LucideShare2 size={28} className='hover:cursor-pointer' />
    </div>
  )
}

export default PostActions