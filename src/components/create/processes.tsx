import React, { useState } from 'react'
import Dropzone from './dropzone'
import Image from 'next/image'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import CreateForm from './form'

interface Props {
  setOpen?: (open: boolean) => void
}

const Processes = ({ setOpen }: Props) => {
  const [imageURL, setImageURL] = useState('')
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='flex flex-col gap-y-3.5 my-2'>
      <h2 className='font-semibold text-lg text-center'>Create Recipe</h2>
      {
        imageURL ? (
          <div className={'flex flex-col gap-y-4'}>
            <div className={cn('flex flex-col gap-y-4 md:flex-row w-full gap-x-4', showForm && '')}>
              <Image
                src={imageURL}
                alt={imageURL}
                width={1000}
                height={1000}
                className='w-full h-[300px] md:h-[450px] object-cover rounded-lg md:basis-[40%] md:max-w-[500px]'
              />
              {
                showForm && (
                  <div className="flex flex-col gap-y-2 md:basis-1/2">
                    <CreateForm imageURL={imageURL} closeModal={() => setOpen?.(false)} />
                  </div>
                )
              }
            </div>
            {
              !showForm ? (
                <Button 
                  className='float-right'
                  onClick={() => setShowForm(true)}
                >
                  Next
                </Button>
              ): (
                <></>
              )
            }
          </div>
        ) : <Dropzone onUploadFinish={e => setImageURL(e ?? '')} />
      }
    </div>
  )
}

export default Processes