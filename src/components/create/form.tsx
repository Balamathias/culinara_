'use client'

import React from 'react'
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
import { toast } from 'sonner'
import { InsertPostSchema } from '@/lib/schema/post'
import { Textarea } from '../ui/textarea'
import { useCreatePost } from '@/services/client/posts'

import { useRouter } from 'next/navigation'

interface FormProps {
  imageURL: string,
  closeModal?: () => void
}

const CreateForm = ({imageURL, closeModal}: FormProps) => {
  const { mutate: createPost, isPending } = useCreatePost()
  const router = useRouter()

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
    const data = {
      ...values, 
      tags: values?.tags?.split(',').map(every => every.trim().toLowerCase()), 
      thumbnail: { image: imageURL }
    }
    createPost(data, {
      onSuccess: () => {
        form.reset()
        toast.success('Your post has been created successfully.')
        closeModal?.()
        router.refresh()
      },
      onError: err => {
        toast.error(err?.message)
      }
    })
    
  }

  return (
    <div className='flex flex-col gap-y-3'>
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

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="african, dish, strawberry (Separate tags with commas...)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={'lg'} className='w-full' type="submit">{isPending ? 'Processing...': 'Finish up'}</Button>
          </form>
        </Form>
        </div>
    </div>
  )
}

export default CreateForm