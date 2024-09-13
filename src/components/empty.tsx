import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className?: string,
  title?: string,
  description?: string
}

const Empty = ({ className, title, description}: Props) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5 py-5', className)}>
      <h2 className='text-xl font-semibold text-muted-foreground'>{title ?? 'Nothing is here'}</h2>
      <p className='text-sm font-normal text-muted-foreground'>{description ?? 'There is nothing here, Please take an action.'}</p>
    </div>
  )
}

export default Empty