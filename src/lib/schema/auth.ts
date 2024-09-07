import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
})