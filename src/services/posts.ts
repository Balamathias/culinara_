'use server'

import serverClient from "@/lib/server"
import { PaginatedPosts, Post } from "@/types/db"

export async function getPosts() {
  try {
    const { data } = await serverClient.get("/posts/")
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getPost(id: string) {
  try {
    const { data } = await serverClient.get(`/posts/${id}/`)
    return data as Post
  } catch (error) {
    console.error(error)
  }
}
