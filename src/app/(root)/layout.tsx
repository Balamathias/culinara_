import BottomBar from '@/components/bottom-bar'
import Sidebar from '@/components/sidebar'
import { getUser } from '@/services/auth'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

const Layout = async ({ children }: PropsWithChildren) => {
  
  const user = await getUser()
  if (!user || !user.id) {
    return redirect('/login')
  }

  if (!user?.first_name || !user?.last_name) {
    return redirect('/profile-complete')
  }

  return (
    <div className='flex overflow-hidden'>
      <Sidebar />
      <main className='overflow-y-auto min-h-screen md:ml-20 xl:ml-64 flex w-full flex-col items-center p-4 py-6'>
        {children}
      </main>
      <BottomBar />
    </div>
  )
}

export default Layout