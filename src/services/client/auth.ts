import { useMutation } from "@tanstack/react-query";
import { login, register } from "../auth";

export const useRegister = () => useMutation({
  mutationKey: ['register'],
  mutationFn: async ({...data}: { email: string, username: string, password: string}) => register({...data}),
})

export const useLogin = () => useMutation({
  mutationKey: ['login'],
  mutationFn: async ({email, password}: { email: string, password: string }) => login(email, password),
})
