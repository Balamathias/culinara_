import Register from '@/components/auth/register'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Verify Your Email | Culinara"
}

const Page = () => {
  
  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <Register />
    </div>
  )
}

export default Page