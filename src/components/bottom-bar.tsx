'use client'

import { cn, mobileLinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import DynamicModal from './dynamic-modal'
import Processes from './create/processes'
import SearchModal from './search/search-modal'

const BottomBar = () => {
  const mobilelinks = useMemo(() => mobileLinks, [])
  const pathname = usePathname()

  const [openCreate, setOpenCreate] = useState(false)
  const [openSearchModal, setOpenSearchModal] = useState(false)

  return (
    <nav className='md:hidden flex fixed w-full bottom-0 h-20 border-t p-4 bg-card backdrop-blur-md z-20'>
      <div className='flex gap-x-4 items-center justify-between w-full'>
        {
          mobilelinks.map(link => (
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
              {<link.Icon className={cn('peer', pathname === (link?.temp_href || link?.href) && 'text-wealth')} size={28}/>}
              <span className='absolute hidden text-sm font-semibold py-1 px-2 rounded xl:peer-hover:hidden peer-hover:block bg-secondary -right-16'>{link.label}</span>
              <span className='font-semibold text-base hidden sm:block'>
                {link.label}
              </span> 
            </Link>
          ))
        }
      </div>

      {openCreate && <DynamicModal 
        open={openCreate}
        setOpen={setOpenCreate}
        dismissible={false}
        className='dark:bg-stone-900 min-w-max bg-card'
        dialogClassName='border'
      >
        <Processes setOpen={setOpenCreate} />
      </DynamicModal>}

      {openSearchModal && <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />}
    </nav>
  )
}

export default BottomBar