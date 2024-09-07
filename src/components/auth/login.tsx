'use client'

import { LoginSchema } from '@/lib/schema/auth'
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
import { Card } from '../ui/card'
import { useLogin } from '@/services/client/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Login = () => {

  const { mutate: login, isPending } = useLogin()
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values)
    login({...values}, {
      onSuccess: (data) => {
        if (data) {
          localStorage.setItem('token', data?.access as string)
          localStorage.setItem('refreshToken', data?.refresh as string)
          form.reset()
          toast.success('Logged In created successfully, You will be redirected in a bit.')
          router.replace('/')
        }
      },
      onError: (err) => {
        toast.error(err?.message)
      }
    })
  }

  return (
    <Card className='flex flex-col gap-y-4 rounded-xl p-4 py-5 w-full bg-secondary'>
      <h2 className='text-2xl font-bold'>Log In</h2>
      <p className='text-muted-foreground'>Welcome back, please log in.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full min-w-max md:w-[440px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={'lg'} className='w-full' type="submit">{isPending ? 'Processing...': 'Login'}</Button>
        </form>
      </Form>
    </Card>
  )
}

export default Login