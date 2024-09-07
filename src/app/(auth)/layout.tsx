import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-background min-h-screen flex flex-col py-6 justify-center items-center'>{children}</div>
  )
}

export default Layout