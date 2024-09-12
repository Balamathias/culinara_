import React from 'react'
import PostAuthor from './post-author'
import Image from 'next/image'
import PostActions from './post-actions'
import PostTags from './post-tags'
import { Post as DBPost, User } from '@/types/db'
import Link from 'next/link'

interface Props {
  post: DBPost
  user: User | null
}
const Post = ({post, user}: Props) => {
  return (
    <div className="rounded-xl w-full md:max-w-[500px] md:basis-2/3 flex flex-col gap-y-3 bg-background border-none shadow-none hover:opacity-90 hover:transition-all">
      <PostAuthor author={post.author} post={post} />
      <Image
        src={post?.thumbnail?.image ?? ''}
        alt={post.title}
        width={1000}
        height={1000}
        quality={100}
        className="w-full object-cover aspect-square h-auto rounded-t border"
      />
      <PostActions post={post} user={user} />
      <PostTags tags={post?.tags} />
      <Link href={`/recipes/${post?.id}`} className="flex flex-col gap-y-2 p-0 pb-3 border-b">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-sm text-muted-foreground">{post.short_description}</p>
      </Link>
    </div>
  )
}

export default Post