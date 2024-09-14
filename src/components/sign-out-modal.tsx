'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { LucideArrowRight } from 'lucide-react'
import { useLogout } from '@/services/client/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
  open?: boolean
  setOpen?: (open: boolean) => void
}

const SignOutModal = ({}: Props) => {
  const [open, setOpen] = React.useState(false)
  const { mutate: logout, isPending } = useLogout()
  const router = useRouter()


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='flex flex-col gap-y-3 justify-end mt-auto'>
        <span>
          <Button variant={'secondary'} className='w-full xl:block hidden rounded-full'>
            Sign out
          </Button>
          <Button variant={'destructive'} size={'icon'} className='xl:hidden block'>
            <LucideArrowRight size={20} />
          </Button>
        </span>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-y-4 p-6 max-sm:max-w-[320px] bg-card dark:bg-stone-900 rounded-lg border-none shadow-none drop-shadow-none'>
        <h1 className='text-2xl font-semibold'>Sign out</h1>
        <p className='text-lg'>Are you sure you want to sign out?</p>
        <div className='flex gap-x-4 justify-between'>
          <Button variant='secondary' className='rounded-lg' onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='destructive' className='rounded-lg float-right' onClick={() => {
            logout(undefined, {
              onSuccess: () => {
                setOpen(false)
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                toast.success('Signed out successfully')
                router.replace('/login')
              },
              onError: (error) => {
                toast.error(error.message)
              }
            })
          }}>{isPending ? 'Processing...' : 'Sign out'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignOutModal