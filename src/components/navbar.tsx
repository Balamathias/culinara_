import { User } from '@/types/db'
import React from 'react'

interface NavbarProps {
  user: User | null
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className='w-full h-20 fixed top-0 flex items-center justify-center bg-background z-20'>
      <div className='flex items-center justify-between w-full max-w7xl px-4'>
        <h2 className='text-2xl font-semibold'>Culinara</h2>

        <div className='flex items-center gap-x-4'>
          {
            user && (<h3 className='text-lg'>Hi, <span className="text-sky-500">{user.username}</span>.</h3>)
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar