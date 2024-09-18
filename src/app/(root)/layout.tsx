import BottomBar from '@/components/bottom-bar'
import Navbar from '@/components/navbar'
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
      <main className='overflow-y-auto min-h-screen md:ml-20 xl:ml-64 flex w-full flex-col items-center p-4 py-6 pb-10 relative'>
        <Navbar user={user} />
        <div className='max-md:mt-14 flex flex-col items-center w-full'>
          {children}
        </div>
      </main>
      <BottomBar />
    </div>
  )
}

export default Layout