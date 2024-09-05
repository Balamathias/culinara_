'use server'

import serverClient from "@/lib/server"
import { RegisterResponse } from "@/types/auth"

export async function getUser() {
  try {
    const { data } = await serverClient.get("/auth/user/")
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function login(email: string, password: string) {
  try {
    const { data } = await serverClient.post("/auth/login/", { email, password })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function logout() {
  try {
    await serverClient.post("/auth/logout/")
  } catch (error) {
    console.error(error)
  }
}

export async function refreshToken() {
  try {
    const { data } = await serverClient.post("/auth/refresh/")
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function register({email, password, username}: { email: string; password: string, username: string }) {
  try {
    const { data } = await serverClient.post("/auth/register/", { email, password, username })
    const res = data as RegisterResponse
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}