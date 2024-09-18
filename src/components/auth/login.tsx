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
import Link from 'next/link'

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
        if (data?.data) {
          localStorage.setItem('token', data?.data?.access as string)
          localStorage.setItem('refreshToken', data?.data?.refresh as string)
          form.reset()
          toast.success('Logged In successfully, You will be redirected in a bit.')
          router.replace('/')
        } else {
          if (data?.status === 401) {
            form.setError('email', { message: 'Invalid credentials'})
            form.setError('password', { message: 'Invalid Credemtials'})
          }
        }
      },
      onError: (err) => {
        toast.error(err?.message)
      }
    })
  }

  return (
    <Card className='flex flex-col gap-y-4 rounded-xl p-4 py-5 w-full max-md:border dark:bg-inherit md:w-[440px] border-none shadow-none drop-shadow-none'>
      <h2 className='text-3xl font-bold'>Culinara Login</h2>
      <p className='text-muted-foreground'>Welcome back to Culinara, please log in.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full ">
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

      <div className='flex flex-col gap-y-2 mt-3'>
        <p className='text-muted-foreground'>{"Don't"} have an account? <Link href={'/register'} className='text-primary'>Register.</Link></p>
        <p className='text-muted-foreground'>Forgotten password? <Link href={('/reset-password')} className='text-primary'>Reset password.</Link></p>
      </div>
    </Card>
  )
}

export default Login