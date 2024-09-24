'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { useUpdateUser } from '@/services/client/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Dropzone from '../create/dropzone'
import { User } from '@/types/db'
import { useState } from 'react'

const updateProfileSchema = z.object({
  username: z.string().min(3).max(20),
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  avatar: z.string().url().optional(),
})

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

interface Props {
  user: User
}

const EditProfile = ({ user }: Props) => {
  const { mutate: updateUser, isPending } = useUpdateUser()
  const router = useRouter()
  const [imageURL, setImageURL] = useState(user.avatar || '')

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.username || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      avatar: user.avatar || ""
    },
  })

  function onSubmit(values: UpdateProfileFormValues) {
    if (!imageURL) {
      form.setError('avatar', { message: 'Profile Picture cannot be empty!'})
      return
    }

    updateUser({...values, avatar: imageURL}, {
      onSuccess: () => {
        form.reset()
        toast.success('Profile updated successfully.')
        router.refresh()
      },
      onError: (err) => {
        toast.error(err?.message)
      }
    })
  }

  return (
    <Card className='flex flex-col gap-y-4 rounded-xl p-4 py-5 w-full max-md:border dark:bg-inherit md:w-[440px] border-none shadow-none drop-shadow-none'>
      <h2 className='text-3xl font-bold'>Edit Profile</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full ">
          <FormField
            control={form.control}
            name="avatar"
            render={({}) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div className='flex items-center justify-center flex-col gap-y-3'>
                    {
                      imageURL ? (
                        <div>
                          <Avatar className="w-32 h-32">
                            <AvatarImage src={imageURL} alt="profile-image" className="object-cover" />
                            <AvatarFallback>{user.username?.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                      ) :
                      <Dropzone 
                        onUploadFinish={(data) => setImageURL(data?.url ?? '')}
                        endpoint='profile'
                      />
                    }
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
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
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} size={'lg'} className='w-full' type="submit">
            {isPending ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default EditProfile