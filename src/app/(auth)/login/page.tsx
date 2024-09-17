import Login from '@/components/auth/login'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Verify Your Email | Culinara"
}

const Page = () => {
  
  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <Login />
    </div>
  )
}

export default Page