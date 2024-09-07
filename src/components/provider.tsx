'use client'

import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './theme-provider'
const Provider = ({ children }: PropsWithChildren) => {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Provider