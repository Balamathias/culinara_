import { clipString } from '@/lib/utils'
import { getTrendingPosts } from '@/services/posts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Trending = async () => {
  const posts = await getTrendingPosts()
  return (
    <div className='flex flex-col gap-y-3 py-6'>
      <h2 className='font-semibold py-1.5 text-lg md:text-xl'>Trending Recipes</h2>

      <div className='flex flex-col gap-y-3 py-2'>
        {
          posts?.data && posts?.data?.map(post => (
            <Link href={`/recipes/${post?.id}`} key={post.id} className='flex flex-row items-center gap-x-2 cursor-pointer h-32'>
              <Image 
                src={post?.thumbnail?.image ?? ''}
                width={400}
                height={400}
                alt={post?.title}
                className='rounded-md object-cover h-auto w-28 border'
              />
              <div className='flex flex-col p-2 py-2.5'>
                <h2 className='font-semibold'>{clipString(post.title, 18)}</h2>
                <p className='text-muted-foreground text-sm text-ellipsis'>{clipString(post?.short_description ?? '', 70)}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Trending