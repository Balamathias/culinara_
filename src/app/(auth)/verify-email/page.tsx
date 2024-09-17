import InputOTPFormComponent from '@/components/auth/input-otp'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Verify Your Email | Culinara"
}

const Page = ({searchParams}: { searchParams: { [key: string]: string }}) => {
  const params = new URLSearchParams(searchParams)
  const email = params.get('email') ?? ''
  
  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <div>
        <InputOTPFormComponent email={email} />
      </div>
    </div>
  )
}

export default Page