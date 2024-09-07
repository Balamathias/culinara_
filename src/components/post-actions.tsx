import React from 'react'
import { LucideHeart, LucideShare2 } from 'lucide-react'
import { Post, User } from '@/types/db'
import { cn } from '@/lib/utils'

interface PostActionsProps {
  post: Post | null,
  user: User | null
}

const PostActions = ({post, user}: PostActionsProps) => {
  const hasLiked = post?.likes?.includes(user?.id ?? '')
  return (
    <div className='py-2 flex items-center justify-between'>
      <div className='flex flex-row gap-x-1 items-center'>
        <LucideHeart size={28} fill={hasLiked ? 'currentColor' : undefined} className={cn('hover:cursor-pointer', hasLiked && 'text-health')} />
        <span className='text-lg'>{post?.likes_count ?? 0}</span>
      </div>
      <LucideShare2 size={28} className='hover:cursor-pointer' />
    </div>
  )
}

export default PostActions