import React from 'react'

const Page = ({ params }: { params: { postId: string }}) => {
  return (
    <div className='flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between'>{params?.postId}</div>
  )
}

export default Page