import React from 'react'
import DynamicModal from '../dynamic-modal'
import { Input } from '../ui/input'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchModal = ({open, setOpen}: Props) => {
  if (!open) return null

  return (
    <DynamicModal 
      open={open}
      setOpen={setOpen}
      className='dark:bg-stone-900 bg-card min-h-[500px] max-md:min-h-[500px]'
    >
      <div className='flex flex-col gap-y-4'>
        <h2 className='font-semibold text-lg'>Search for recipes</h2>
        <Input type='search' placeholder='Search for recipes by name, tag, title, etc...' className='border rounded-lg p-2' />
      </div>
    </DynamicModal>
  )
}

export default SearchModal