'use server'

import serverClient from "@/lib/server"
import { InsertPost, PaginatedPosts, Post, TrendingPosts } from "@/types/db"

export async function getPosts() {
  try {
    const { data } = await serverClient.get("/posts/")
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getTrendingPosts(count=3) {
  try {
    const { data } = await serverClient.get("/posts/trending/?count=" + count)
    return data as TrendingPosts
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

export async function createPost(post: InsertPost) {
  try {
    const { data } = await serverClient.post("/posts/", post)
    return data as Post
  } catch (error) {
    console.error(error)
  }
}
