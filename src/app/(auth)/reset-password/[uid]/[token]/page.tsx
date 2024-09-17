import ResetPasswordConfirm from '@/components/auth/reset-password-confirm'
import { validateToken } from '@/services/auth'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: "Verify token | Culinara"
}

const Page = async ({ params }: { params: { uid: string, token: string }}) => {

  const res = await validateToken(params.uid, params.token)

  if (!res) return null

  if (!(res.status === 200)) {
    return (
      <div className='flex flex-col gap-y-3 py-3'>
        <h2 className='text-xl font-semibold'>Invalid or Expired Token</h2>

        <p className='text-muted-foreground'>{res.data.error}</p>
        <Link href={`/reset-password`} className='text-primary'>Please try again.</Link>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <ResetPasswordConfirm />
    </div>
  )
}

export default Page