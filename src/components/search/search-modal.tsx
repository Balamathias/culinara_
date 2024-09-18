import React, { useState } from 'react'
import DynamicModal from '../dynamic-modal'
import { Input } from '../ui/input'
import { useSearch } from '@/services/client/posts'
import { Loader2, LucidePlay } from 'lucide-react'
import Link from 'next/link'
import { clipString } from '@/lib/utils'
import Image from 'next/image'
import { useDebounce } from '../hooks/use-debounce'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchModal = ({open, setOpen}: Props) => {
  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce(search, 900)
  
  const { data: posts, isPending } = useSearch(debouncedValue)
  
  if (!open) return null

  return (
    <DynamicModal 
      open={open}
      setOpen={setOpen}
      className='dark:bg-stone-900 bg-card min-h-[300px] max-md:min-h-[200px]'
      dialogClassName='md:w-[672px]'
    >
      <div className='flex flex-col gap-y-4'>
        <h2 className='font-semibold text-lg'>Search for recipes</h2>
        <Input 
          type='search' 
          placeholder='Search for recipes by name, tag, title, etc...' 
          className='border rounded-lg p-2' 
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {
        isPending ? (
          <div className='flex items-center justify-center w-full py-2.5'>
            <Loader2 className='animate-spin' />
          </div>
        ): (
          <div className='flex flex-col gap-y-3 overflow-y-auto'>
            {
              posts?.results?.length ? (
                posts?.results?.map(post => (
                  <Link onClick={() => setOpen(false)} key={post.id} href={`/recipes/${post.id}`} className="border-b py-1 flex flex-row gap-x-1.5  justify-between">
                    <div className="py-2 flex flex-col gap-y-1.5">
                      <h2 className="text-lg font-semibold">{ post.title }</h2>
                      <p className="text-sm">{ clipString(post.short_description ?? '', 30) }</p>
                    </div>
                    {post?.video ? (
                      <div className='flex flex-col w-[100px] relative h-[70px] rounded-xl items-center justify-center'>
                        <LucidePlay />
                      </div>
                    ) : (
                      <Image 
                        src={post.thumbnail?.image ?? ''}
                        alt={post.title}
                        width={200}
                        height={200}
                        className='aspect-square rounded-xl border object-cover w-[100px] h-[70px]'
                      />
                  )}
                  </Link>
                ))
              ): (
                search && <p className='text-muted-foreground'>Search results for <span className={'text-primary font-semibold'}>{search}</span> could not be found.</p>
              )
            }
          </div>
        )
      }
    </DynamicModal>
  )
}

export default SearchModal