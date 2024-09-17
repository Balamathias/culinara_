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
import { Card } from '../ui/card'
import { useResetPasswordConfirm } from '@/services/client/auth'
import { toast } from 'sonner'
import { setToken, status } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'

const FormSchema = z.object({
  password: z.string(),
  confirm_password: z.string()
})

const ResetPasswordConfirm = () => {

  const params = useParams()
  const uid = params['uid'] as string
  const token = params['token'] as string

  const router = useRouter()

  const { mutate: resetPasswordConfirm, isPending } = useResetPasswordConfirm()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm_password: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values.password !== values.confirm_password) {
      form.setError("confirm_password", { message: "Passwords do not match." })
      return
    }

    resetPasswordConfirm({uid, token, password: values.password}, {
      onSuccess: (data) => {
        if (data?.status === status.HTTP_200_SUCCESSFUL) {
          toast.success(data?.data?.message)
          form.reset()
          setToken(data?.data?.access_token, data?.data?.refresh_token)
          router.replace('/')
        } else {
          toast?.error(data?.data?.error)
        }
      },
      onError: (err) => {
        toast.error(err?.message)
      }
    })
  }

  return (
    <Card className='flex flex-col gap-y-4 rounded-xl p-4 py-5 w-full bg-secondary/95 md:bg-inherit md:w-[440px] border-none shadow-none drop-shadow-none'>
      <h2 className='text-3xl font-bold'>Reset Password</h2>
      <p className='text-muted-foreground'>Please provide your email address below.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full ">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type={'password'} placeholder="confirm your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={'lg'} className='w-full' type="submit">{isPending ? 'Processing...': 'Change Password'}</Button>
        </form>
      </Form>

    </Card>
  )
}

export default ResetPasswordConfirm