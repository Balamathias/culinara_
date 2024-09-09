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
// import { useLogin } from '@/services/client/auth'
// import { toast } from 'sonner'
// import { useRouter } from 'next/navigation'
import Dropzone from './dropzone';
import { InsertPostSchema } from '@/lib/schema/post'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'

const Create = () => {
  // const { mutate: login, isPending } = useLogin()
  // const router = useRouter()

  const [files, setFiles] = useState<File[]>([])

  const form = useForm<z.infer<typeof InsertPostSchema>>({
    resolver: zodResolver(InsertPostSchema),
    defaultValues: {
      title: "",
      short_description: "",
      content: "",
      tags: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof InsertPostSchema>) {
    console.log(values)
    
  }

  return (
    <div className='flex flex-col gap-y-3'>
        <div className=''>
          <Label htmlFor='file'>Upload Image/Video (max 16MB)</Label>
          <Input type='file' onChange={(e) => setFiles(e.target.files)} />
        </div>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full min-w-max md:w-[440px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipe Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input type="Short description" placeholder="Short description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Content..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={'lg'} className='w-full' type="submit">{isPending ? 'Processing...': 'Create'}</Button>
          </form>
        </Form>
        </div>
    </div>
  )
}

export default Create