'use client'

import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'

const tabs = [
  { name: 'all' },
  { name: 'popular' },
  { name: 'recents' },
  { name: 'trending' },
  { name: 'for-me' },
]

const StickyTabs = () => {
  const activeTab = useSearchParams().get('tab')  || 'all'
  const memoizedTabs = useMemo(() => tabs, [])
  const router = useRouter()

  return (
    <div className='flex flex-row gap-2 z-20 md:hidden flex-wrap sticky w-full top-16 pb-4'>
      {
        memoizedTabs.map(tab => (
          <span 
            key={tab.name} 
            className={cn('py-2 px-3 rounded-2xl bg-secondary/20 text-muted-foreground hover:opacity-80 hover:transition-all flex items-center justify-center capitalize cursor-pointer', tab.name===(activeTab) && 'bg-primary/15 text-primary font-semibold')}
            onClick={() => {
              router.replace('?tab=' + tab.name)
            }}
          >
            {tab.name.replace(/-/g, ' ')}
          </span>
        ))
      }
    </div>
  )
}

export default StickyTabs