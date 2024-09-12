import Link from 'next/link'
import React from 'react'

interface Props {
  tags: string[]
}

const PostTags = ({ tags }: Props) => {

  if (!tags ?? !tags.length) return null

  return (
    <div className='flex flex-row gap-3 items-center flex-wrap'>
      {
        tags.map(tag => (
          <Link href={`/tags?tag=${tag}`} className='text-primary text-sm bg-primary/15 px-2.5 py-1.5 rounded-xl' key={tag}>
            { tag }
          </Link>
        ))
      }
    </div>
  )
}

export default PostTags