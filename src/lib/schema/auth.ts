import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
})

export const CompleteProfileSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  avatar: z.string()
})
