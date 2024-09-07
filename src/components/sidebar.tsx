'use client'

import { cn, links } from '@/lib/utils'
import { LucideChefHat } from 'lucide-react'
import { Lora } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

const lora = Lora({
  variable: "--font-lora",
  weight: ['400'],
  subsets: ['latin'],
})

const Sidebar = () => {
  const sidelinks = useMemo(() => links, [])
  const pathname = usePathname()

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
            <Link key={link.label} className='flex gap-x-2 items-center relative' href={link.href}>
              {<link.Icon className={cn('peer', pathname === link?.href && 'text-wealth')} size={32}/>}
              <span className='absolute hidden text-sm font-semibold py-1 px-2 rounded xl:peer-hover:hidden peer-hover:block bg-secondary -right-16'>{link.label}</span>
              <span className='font-semibold text-lg md:hidden xl:block'>
                {link.label}
              </span> 
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar