"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { useVerifyOTP, useResendOTP } from "@/services/client/auth"
import { useEffect, useState } from "react"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function InputOTPForm() {

  const email = useSearchParams().get('email') ?? ''
  const { mutate: verifyOTP, isPending } = useVerifyOTP()
  const { mutate: resendOTP, isPending: resending } = useResendOTP()
  const [timer, setTimer] = useState(60)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  useEffect(() => {
    const timeout = setTimeout(() => {setTimer(prev => prev > 0 ? prev - 1 : 0)}, 1000)
    return () => { clearInterval(timeout) }
  }, [timer])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
    verifyOTP({
      email,
      otp: data.pin
    }, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          toast.success('Email verified successfully. You will be redirected shortly.')
          localStorage.setItem('token', data?.data?.access_token ?? '')
          localStorage.setItem('refreshToken', data?.data?.refresh_token ?? '')
          router.replace('/profile-complete')
        } else if (data?.status === 400) {
          form.setError('pin', { message: data?.data?.error ?? '' })
        }
      }
    })
  }

  return (
    <Form {...form}>
      <h2 className={`text-lg py-3 text-muted-foreground hidden`}>
        A verification OTP has been sent to <span className="text-primary">{email}</span>
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please verify your email with the 6-digit OTP sent to your email.</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Button disabled={isPending} type="submit" className="rounded-full">{isPending ? 'Verifying...' :'Verify'}</Button>
          <Button type="button" className="rounded-full" variant={'ghost'} disabled={resending} onClick={() => {
            resendOTP({ email }, {
              onSuccess: (data) => {
                if (data?.status === 200) {
                  toast.success('Verification code resent to ' + email + ' successfully.')
                  setTimer(60)
                } 

                else if (data?.status === 500) {
                  toast.error('An internal server error occured, please try again later.')
                }
                
                else {
                  toast?.error(data?.data?.error)
                }
              }
            })
          }}>{resending ? 'Resending...' :'Resend OTP'}</Button>
        </div>
      </form>
    </Form>
  )
}
