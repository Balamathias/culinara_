'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '../ui/card'
import { useUpdateUser } from '@/services/client/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CompleteProfileSchema } from '@/lib/schema/auth'
import Dropzone from '../create/dropzone'
import { Label } from '../ui/label'
import Image from 'next/image'

const CompleteProfile = () => {

  const { mutate: updateUser, isPending } = useUpdateUser()
  const router = useRouter()
  const [imageURL, setImageURL] = useState('')

  const form = useForm<z.infer<typeof CompleteProfileSchema>>({
    resolver: zodResolver(CompleteProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      avatar: imageURL
    },
  })
 
  function onSubmit(values: z.infer<typeof CompleteProfileSchema>) {
    updateUser({...values, avatar: imageURL}, {
      onSuccess: () => {
        form.reset()
        toast.success('Profile completed successfully, You will be redirected in a bit.')
        router.replace('/')
      },
      onError: (err) => {
        toast.error(err?.message)
      }
    })
  }

  return (
    <Card className='flex flex-col gap-y-4 rounded-xl p-4 py-5 w-full bg-secondary/95 md:bg-inherit md:w-[440px] border-none shadow-none drop-shadow-none'>
      <h2 className='text-3xl font-bold'>Culinara</h2>
      <p className='text-muted-foreground'>Welcome to Culinara, please complete your profile to continue, this is the final step.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full ">
          <div className='flex items-center justify-center flex-col gap-y-3'>
            <Label>Choose Profile Image</Label>
            {
              imageURL ? (
                <div>
                  <Image src={imageURL} width={150} height={150} alt='profile-image' className='object-cover w-32 h-32 rounded-full border' />
                </div>
              ) :
              <Dropzone 
                onUploadFinish={(url) => setImageURL(url ?? '')}
                endpoint='profile'
              />
            }
          </div>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your last name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending ?? !imageURL} size={'lg'} className='w-full' type="submit">{isPending ? 'Processing...': 'Finish up'}</Button>
        </form>
      </Form>
    </Card>
  )
}

export default CompleteProfile