import React, { PropsWithChildren } from 'react'
import Image from 'next/image'


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-background min-h-screen flex h-full w-full justify-center bg-cover bg-no-repeat'>
      <div className='md:basis-1/2 flex items-center justify-center'>
        {children}
      </div>
      <div className="md:basis-1/2 hidden md:flex">
        <Image
          src={'/images/bg.jpg'}
          quality={50}
          width={1000}
          height={1000}
          className='!h-full object-cover !w-full'
          alt='Culinara Background'
        />
      </div>
    </div>
  )
}

export default Layout