import { getPosts } from '@/services/posts';
import React from 'react'
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import PostActions from './post-actions';
import PostAuthor from './post-author';
import { getUser } from '@/services/auth';

const Posts = async () => {
  const posts = await getPosts();
  const user = await getUser();
  const results = posts?.results || [];
  return (
    <div className='flex flex-col gap-y-6'>
      {
        results?.length && results.map((post) => (
          <Card key={post?.id} className="rounded-xl w-full md:max-w-[500px] md:basis-2/3 flex flex-col gap-y-3 bg-background border-none shadow-none">
            <PostAuthor author={post.author} />
            <Image
              src={post?.thumbnail?.image ?? ''}
              alt={post.title}
              width={1000}
              height={1000}
              quality={100}
              className="w-full object-cover aspect-square h-auto rounded-t border"
            />
            <PostActions post={post} user={user} />
            <CardContent className="flex flex-col gap-y-2 p-0 pb-3 border-b">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.short_description}</p>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
}

export default Posts