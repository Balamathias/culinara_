'use client'

import { cn, links } from '@/lib/utils'
import { LucideChefHat } from 'lucide-react'
import { Lora } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import DynamicModal from './dynamic-modal'
import Processes from './create/processes'
import SearchModal from './search/search-modal'
import SignOutModal from './sign-out-modal'

export const lora = Lora({
  variable: "--font-lora",
  weight: ['400'],
  subsets: ['latin'],
})

const Sidebar = () => {
  const sidelinks = useMemo(() => links, [])
  const pathname = usePathname()

  const [openCreate, setOpenCreate] = useState(false)
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const [openSignOutModal, setOpenSignOutModal] = useState(false)

  return (
    <div
      className={cn('xl:w-64 md:w-20 hidden min-h-screen h-full bg-background md:flex flex-col gap-y-2 p-4 border-r fixed left-0 py-8')}
    >
      <Link href={'/'} className={cn('text-2xl font-lora font-bold flex items-center gap-x-2.5 pb-2', lora.className)}>
        <LucideChefHat size={40} />
        <span className='hidden xl:block'>Culinara</span>
      </Link>

      <div className={'flex flex-col gap-y-8 py-12'}>
        {
          sidelinks.map(link => (
            <Link 
              key={link.label} className='flex gap-x-2 items-center relative' href={link.href}
              onClick={() => {
                switch(link.label) {
                  case 'Create':
                    setOpenCreate(true)
                    break
                  
                  case 'Search':
                    setOpenSearchModal(true)
                    break
                }
              }}
            >
              {<link.Icon className={cn('peer', pathname === (link?.temp_href || link?.href) && 'text-wealth')} size={32}/>}
              <span className='absolute hidden text-sm font-semibold py-1 px-2 rounded xl:peer-hover:hidden peer-hover:block bg-secondary -right-16'>{link.label}</span>
              <span className='font-semibold text-lg md:hidden xl:block'>
                {link.label}
              </span> 
            </Link>
          ))
        }

      </div>
      <SignOutModal open={openSignOutModal} setOpen={setOpenSignOutModal} />
      <DynamicModal 
        open={openCreate}
        setOpen={setOpenCreate}
        dismissible={false}
        className='dark:bg-stone-900 min-w-max bg-card overflow-auto'
        dialogClassName='border'
      >
        <Processes setOpen={setOpenCreate} />
      </DynamicModal>
      <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />
    </div>
  )
}

export default Sidebar