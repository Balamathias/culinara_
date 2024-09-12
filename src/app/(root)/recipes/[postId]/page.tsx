import Post from '@/components/post'
import { getUser } from '@/services/auth'
import { getPost } from '@/services/posts'
import React, { Suspense } from 'react'

const Page = async ({ params }: { params: { postId: string }}) => {
  const post = await getPost(params.postId)
  const user = await getUser()

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="flex md:p-8 py-6 mx-auto gap-y-3 max-w-7xl w-full gap-x-10">
      <div className="flex flex-col gap-y-4 md:basis-[60%]">
        <Suspense>
          <Post post={post} user={user!} />
        </Suspense>
      </div>

      <div className="flex-col gap-y-5 md:basis-[40%] hidden md:flex py-6">
        
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-semibold text-muted-foreground">Short description</h2>
          <p className="text-lg text-muted-foreground">{post.short_description}</p>
        </div>

        <div className='flex flex-col gap-y-4'>
          <h2 className='text-2xl font-semibold text-muted-foreground'>Procedure</h2>
          <div className='flex flex-col gap-y-1 text-muted-foreground'>
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className='text-base md:text-base py-1'>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page