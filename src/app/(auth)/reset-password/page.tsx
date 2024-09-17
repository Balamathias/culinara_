import ResetPassword from '@/components/auth/reset-password'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Reset Password | Culinara"
}

const Page = async () => {

  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <ResetPassword />
    </div>
  )
}

export default Page