import { User } from '@/types/db'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

interface PostAuthorProps {
  author: User | null
}

const PostAuthor = ({ author }: PostAuthorProps) => {
  return (
    <div className='flex-col gap-y-4 md:flex'>
      <div className='flex items-center gap-x-2.5'>
        <Avatar className='border-health'>
          <AvatarImage src={author?.avatar ?? ''} className='object-cover' />
          <AvatarFallback className={'bg-wealth/10 text-wealth'} content={author?.username ?? 'A'} />
        </Avatar>
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold'>{author?.username}</h2>
          <p className='text-muted-foreground text-sm'>{author?.first_name} {author?.last_name}</p>
        </div>
      </div>
    </div>
  )
}

export default PostAuthor