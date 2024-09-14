'use client'

import React, { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { lora } from './sidebar'
import Link from 'next/link'
import { LucideChefHat } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@/types/db'

interface NavbarProps {
  user: User
}

const Navbar = ({ user }: NavbarProps) => {

  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    const prevValue = scrollY.getPrevious()

    if (latest > prevValue! && latest > 150) {
        setHidden(true)
    } else {
        setHidden(false)
    }
  })

  return (
    <motion.nav
        initial={{ background: 'inherit' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        animate={hidden ? "hidden" : "visible"}
        variants={{
            visible: { y: 0 },
            hidden: { y: '-100%' }
        }}
        className="flex flex-row p-4 h-14 w-full fixed top-0 z-30 border-b bg-background md:hidden backdrop-blur-md"
    >
        <div className="flex flex-row justify-between items-center w-full mx-auto gap-4 bg-background">
          <Link href={'/'} className={cn('text-xl font-lora font-bold flex items-center gap-x-1.5', lora.className)}>
            <LucideChefHat size={32} className='hidden' />
            <span className=''>Culinara</span>
          </Link>

          <Avatar>
            <AvatarImage src={user?.avatar ?? ''} className="object-cover" alt={user?.username} />
            <AvatarFallback content={user?.username} />
          </Avatar>
        </div>
    </motion.nav>
  )
}

export default Navbar
