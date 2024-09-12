'use client'

import { Post, User } from '@/types/db'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import Link from 'next/link'
import { timeAgo } from '@/lib/utils'

interface PostAuthorProps {
  author: User | null,
  post: Post
}

const PostAuthor = ({ author, post }: PostAuthorProps) => {
  return (
    <div className='flex-row gap-y-4 flex z-10 gap-x-1.5'>
      <Link href={`/profile/${author?.username}`} className='flex items-center gap-x-2.5'>
        <Avatar className='border-health'>
          <AvatarImage src={author?.avatar ?? ''} className='object-cover' />
          <AvatarFallback className={'bg-wealth/10 text-wealth'} content={author?.username ?? 'A'} />
        </Avatar>
        <div className='flex flex-col'>
          <div className='flex items-center gap-x-2'>
            <h2 className='text-lg font-semibold'>{author?.username}</h2>
            <p className='text-muted-foreground text-sm mt-0.5'>{ timeAgo(post.created_at) } </p>
          </div>
          <p className='text-muted-foreground text-sm'>{author?.first_name} {author?.last_name}</p>
        </div>
      </Link>
    </div>
  )
}

export default PostAuthor