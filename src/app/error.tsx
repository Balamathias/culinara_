'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

const ErrorPage = ({ reset }: { reset: () => void }) => {
  return (
    <div className='flex w-full items-center justify-center flex-col gap-y-3 min-h-screen'>
      <h1 className='text-3xl font-semibold'>Something went wrong</h1>
      <Button className='rounded-full' variant={'outline'} onClick={reset}>Refresh</Button>
    </div>
  )
}

export default ErrorPage