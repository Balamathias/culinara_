// import { getProfile } from '@/services/auth'
import React from 'react'

const Page = async ({ params }: { params: { username: string }}) => {
  // const profile = await getProfile(params.username)
  return (
    <div className='flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between'>
      { params.username }
    </div>
  )
}

export default Page