import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='flex w-full flex-col gap-y-2 items-center justify-center min-h-screen'>
      <h1 className='text-xl font-semibold'>404</h1>
      <p className='text-muted-foreground'>Page not found - This page you are on does not exist.</p>
      <Link href={'/'} className='text-primary underline'>Go back home {"(Culinara)"}.</Link>
    </div>
  )
}

export default Page