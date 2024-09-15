/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import serverClient from "@/lib/server"
import { LoginResponse, OTPResponse, RefreshResponse, RegisterResponse, ResendOTPResponse } from "@/types/auth"
import { PartialUserUpdate, User } from "@/types/db"
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
      return {data: response}
    }
      
    else if (status === STATUS.HTTP_401_UNAUTHORIZED) {
      throw new Error("Invalid email or password.")
    }

    else if (status === STATUS.HTTP_500_INTERNAL_SERVER_ERROR) {
      throw new Error("An internal server error has occurred.")
    }

    else {
      throw new Error("An unknown error has occurred, please try again.")
    }

  } catch (error: any) {
    console.error(error?.status)
    console.error(error?.response?.data)
    return { status: error?.status, errors: error?.response?.data, data: null }
  }
}

export async function logout() {
  try {
    const { data, status } = await serverClient.post("/auth/logout/", { refresh: cookies().get("refreshToken")?.value })

    if (status === STATUS.HTTP_205_RESET_CONTENT) {
      cookies().delete("token")
      cookies().delete("refreshToken")
      return data as { message: string }
    }

  } catch (error: any) {
    console.error(error)
    throw new Error('Sorry, an unknown error has occured, Please try again.')
  }
}

export async function refreshToken() {

  try {
    const { data } = await serverClient.post("/auth/refresh/", { refresh: cookies().get("refreshToken")?.value })
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

    if (status === STATUS.HTTP_201_CREATED || status === STATUS.HTTP_200_SUCCESSFUL) {
      cookies().set("token", res.data?.access_token as string)
      cookies().set("refreshToken", res.data?.refresh_token as string)

      return res
    }

    else if (status === STATUS.HTTP_500_INTERNAL_SERVER_ERROR) {
      throw new Error("An internal server error has occurred.")
    }

    else {
      throw new Error("An unknown error has occurred.")
    }

  } catch (error: any) {
    console.error(error)
    if (error?.status === STATUS.HTTP_500_INTERNAL_SERVER_ERROR) {
      throw new Error("An internal server error has occurred.")
    }
    else if (error?.status === STATUS.HTTP_400_BAD_REQUEST) {
      console.log(JSON.stringify(error?.response?.data, null, 2))
      return error?.response?.data as RegisterResponse 
    }

    else throw new Error("An unknown error has occurred. Please try again.")
  }
}

export async function updateUser(input: PartialUserUpdate) {
  const { data, status } = await serverClient.put(`/auth/update-user/`, input)

  if (data) {
    return data as User
  }

  else return { status, data: null }
}

export async function followUnfollowUser(userId: string) {
  try {
    const { data, status } = await serverClient.post(`/users/${userId}/follow/`)
    if (status === STATUS.HTTP_201_CREATED || status === STATUS.HTTP_200_SUCCESSFUL) {
      return data as { detail: string }
    } else {
      return data as { detail: string }
    }
  } catch (error) {
    console.error(error)
  }
}

export async function verifyOTP(email: string, otp: string) {
  try {
    const { data, status } = await serverClient.post(`/auth/verify-otp/`, {email, otp})

    if (status === STATUS.HTTP_200_SUCCESSFUL) {
      cookies().set("token", data?.access_token)
      cookies().set("refreshToken", data?.refresh_token)

      return { data: data as OTPResponse, status }
    }

  } catch (err: any) {
    console.error(err)

    if (err?.status === STATUS.HTTP_400_BAD_REQUEST) {
      return { data: err?.response?.data as OTPResponse, status: err?.status }
    }

    if (err?.status === STATUS.HTTP_404_NOT_FOUND) {
      return { data: err?.response?.data as OTPResponse, status: err?.status }
    }
  }
}

export async function resendOTP(email: string) {
  try {
    const { data, status } = await serverClient.post(`/auth/resend-otp/`, {email})

    console.log(data)

    if (status === STATUS.HTTP_200_SUCCESSFUL) {

      return { data: data as ResendOTPResponse, status }
    }

  } catch (err: any) {
    console.error(err)

    if (err?.status === STATUS.HTTP_400_BAD_REQUEST) {
      return { data: err?.response?.data as ResendOTPResponse, status: err?.status }
    }

    if (err?.status === STATUS.HTTP_404_NOT_FOUND) {
      return { data: err?.response?.data as ResendOTPResponse, status: err?.status }
    }
  }
}

