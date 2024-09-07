/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import serverClient from "@/lib/server"
import { LoginResponse, RefreshResponse, RegisterResponse } from "@/types/auth"
import { User } from "@/types/db"
import { cookies } from "next/headers"
import { status as STATUS } from "@/lib/utils"

export async function getUser() {
  try {
    const { data } = await serverClient.get("/auth/user/")
    return data as User
  } catch (error: any) {
    console.error(error)
    return null
  }
}

export async function login(email: string, password: string) {
  try {
    const { data, status } = await serverClient.post("/auth/login/", { email, password })
    const response = data as LoginResponse

    if (status === STATUS.HTTP_200_SUCCESSFUL) {
      cookies().set("token", response.access)
      cookies().set("refreshToken", response.refresh)
      return response
    }
      
    else if (status === STATUS.HTTP_401_UNAUTHORIZED) {
      throw new Error("Invalid email or password.")
    }

    else if (status === STATUS.HTTP_500_INTERNAL_SERVER_ERROR) {
      throw new Error("An internal server error has occurred.")
    }

    else {
      throw new Error("An unknown error has occurred.")
    }

  } catch (error: any) {
    console.error(error)
    return null
  }
}

export async function logout() {
  try {
    const { data, status } = await serverClient.post("/auth/logout/", { refresh: cookies().get("refreshToken") })

    if (status === STATUS.HTTP_205_RESET_CONTENT) {
      cookies().delete("token")
      cookies().delete("refreshToken")
      return data as { message: string }
    }

  } catch (error: any) {
    console.error(error)
    return null
  }
}

export async function refreshToken() {

  try {
    const { data } = await serverClient.post("/auth/refresh/", { refresh: cookies().get("refreshToken") })
    cookies().set("token", data?.access)

    return data as RefreshResponse

  } catch (error: any) {
    console.error(error)
    return null
  }
}

export async function register({email, password, username}: { email: string; password: string, username: string }) {
  try {
    const { data, status } = await serverClient.post("/auth/register/", { email, password, username })
    
    const res = data as RegisterResponse

    if (status === STATUS.HTTP_201_CREATED) {
      cookies().set("token", res.data?.access_token as string)
      cookies().set("refreshToken", res.data?.refresh_token as string)

      return res
    }

    else if (status === STATUS.HTTP_400_BAD_REQUEST && res?.errors) {
      if (res?.errors?.email) {
        throw new Error(res?.errors?.email as string)
      }
      if (res?.errors?.username) {
        throw new Error(res?.errors?.username as string)
      }
      if (res?.errors?.password) {
        throw new Error(res?.errors?.password as string)
      }
    }

    else if (status === STATUS.HTTP_500_INTERNAL_SERVER_ERROR) {
      throw new Error("An internal server error has occurred.")
    }

    else {
      throw new Error("An unknown error has occurred.")
    }

  } catch (error: any) {
    console.error(error)
    return null
  }
}