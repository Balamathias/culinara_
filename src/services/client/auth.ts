import { useMutation } from "@tanstack/react-query";
import { login, logout, register, updateUser } from "../auth";
import { PartialUserUpdate } from "@/types/db";
import { QUERY_KEYS } from "./query-keys";

export const useRegister = () => useMutation({
  mutationKey: ['register'],
  mutationFn: async ({...data}: { email: string, username: string, password: string}) => register({...data}),
})

export const useLogin = () => useMutation({
  mutationKey: ['login'],
  mutationFn: async ({email, password}: { email: string, password: string }) => login(email, password),
})

export const useLogout = () => useMutation({
  mutationKey: ['logout'],
  mutationFn: logout
})

export const useUpdateUser = () => useMutation({
  mutationFn: (data: PartialUserUpdate) => updateUser(data),
  mutationKey: [QUERY_KEYS.update_user]
})
