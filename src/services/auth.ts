/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import serverClient from "@/lib/server"
import { LoginResponse, OTPResponse, RefreshResponse, RegisterResponse, ResendOTPResponse, ResetPasswordConfirmResponse, ResetPasswordResponse } from "@/types/auth"
import { PartialUserUpdate, User } from "@/types/db"
import { cookies } from "next/headers"
import { setCookies, status as STATUS } from "@/lib/utils"

/**
 * `await getUser()` - Get the currently logged in user based on the cookie session.
 */
export async function getUser() {
  try {
    const { data } = await serverClient.get("/auth/user/")
    return data as User
  } catch (error: any) {
    console.error(error)
    return null
  }
}

/**
 * 
 * @param username - User's username which must be unique to every user.
 * @returns User | null
 */
export async function getProfile(username: string) {
  try {
    const { data } = await serverClient.get(`/profile/${username}/`)
    return data as User
  } catch (error: any) {
    console.error(error)
    return null
  }
}

/**
 * 
 * @param email - user's email
 * @param password - user's password
 * @returns 
 */
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

/**
 * @description Log a user out - blacklists tokens on the backend.
 * @returns status response
 */
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

/**
 * @description get a user's refreshToken
 */
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

/**
 * @description a function that creates a new account for a user.
 * @param `email`, `password`, `username`
 * @returns 
 */
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

/**
 * @param input - Partially update a user's info including:
 * `first_name, last_name and avatar`,
 * @returns 
 */
export async function updateUser(input: PartialUserUpdate) {
  const { data, status } = await serverClient.put(`/auth/update-user/`, input)

  if (data) {
    return data as User
  }

  else return { status, data: null }
}

/**
 * @description This function works by adding a user to a user_followers array where a user is not already in the array.
 * Where a user is in the array, a subsequent request to this same endpoint with the same parameters will unfollow a user
 * @param userId - the user's id to be followed or unfollowed
 * @returns 
 */
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

/**
 * @description Verify a user's OTP
 * @param email - the user's email
 * @param otp - the otp sent to the user's email
 * @returns 
 */
export async function verifyOTP(email: string, otp: string) {
  const cookieStore = cookies()
  try {
    const { data, status } = await serverClient.post(`/auth/verify-otp/`, {email, otp})

    if (status === STATUS.HTTP_200_SUCCESSFUL) {
      setCookies(cookieStore, data?.access_token, data?.refresh_token)

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

/**
 * @description Resend an email otp to a user
 * @param email - a user's valid email, it must be in existence.
 * @returns 
 */
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

/**
 * @description A function that resets a user's password based on his email.
 * @param email - The user's email
 * @returns 
 */
export async function resetPassword(email: string) {
  try {
    const { data, status } = await serverClient.post(`/auth/password-reset/`, {email})

    if (status === STATUS.HTTP_200_SUCCESSFUL) {

      return { data: data as ResetPasswordResponse, status }
    }

  } catch (err: any) {
    console.error(err)

    if (err?.status === STATUS.HTTP_400_BAD_REQUEST) {
      return { data: err?.response?.data as ResetPasswordResponse, status: err?.status }
    }

    if (err?.status === STATUS.HTTP_404_NOT_FOUND) {
      return { data: err?.response?.data as ResetPasswordResponse, status: err?.status }
    } else {
      throw new Error('An unknown error has occured.')
    }
  }
}

/**
 * @description a function that validates a token and returns a response
 * @param uid string (A uid string pickable from the urlParams)
 * @param token string (A valid base-64 encoded token)
 */
export async function validateToken(uid: string, token: string) {
  try {
    const { data, status } = await serverClient.post(`/auth/password-reset/validate-token/${uid}/${token}/`)

    if (status === STATUS.HTTP_200_SUCCESSFUL) {

      return { data: data as ResetPasswordResponse, status }
    }

  } catch (err: any) {
    console.error(err)

    if (err?.status === STATUS.HTTP_400_BAD_REQUEST) {
      return { data: err?.response?.data as ResetPasswordResponse, status: err?.status }
    }

    if (err?.status === STATUS.HTTP_404_NOT_FOUND) {
      return { data: err?.response?.data as ResetPasswordResponse, status: err?.status }
    } else {
      throw new Error('An unknown error has occured.')
    }
  }
}

/**
 * @description A function that simply resets a password after `validateToken()` is successful
 * @param { uid: string, token: string, password: string } - `password` is the new password field.
 */
export async function passwordResetConfirm({ uid, token, password }:{uid: string, token: string, password: string}) {
  const cookieStore = cookies()
  try {
    const { data, status } = await serverClient.post(`/auth/password-reset/confirm/${uid}/${token}/`, { password })

    if (status === STATUS.HTTP_200_SUCCESSFUL) {
      const res = data as ResetPasswordConfirmResponse
      setCookies(cookieStore, res?.access_token, res?.refresh_token)
      return { data: res, status }
    }

  } catch (err: any) {
    console.error(err)

    if (err?.status === STATUS.HTTP_400_BAD_REQUEST) {
      return { data: err?.response?.data as ResetPasswordConfirmResponse, status: err?.status }
    }

    if (err?.status === STATUS.HTTP_404_NOT_FOUND) {
      return { data: err?.response?.data as ResetPasswordConfirmResponse, status: err?.status }
    } else {
      throw new Error('An unknown error has occured.')
    }
  }
}
