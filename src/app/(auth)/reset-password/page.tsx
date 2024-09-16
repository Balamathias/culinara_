import ResetPassword from '@/components/auth/reset-password'
import React from 'react'

const Page = async () => {

  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <ResetPassword />
    </div>
  )
}

export default Page