'use server'

import serverClient from "@/lib/server"
import { InsertPost, PaginatedPosts, Post, TrendingPosts } from "@/types/db"
import { status as STATUS } from '@/lib/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getPosts(page = 1) {
  try {
    const { data } = await serverClient.get("/posts/", { params: { page } })
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
    const { data, status, statusText } = await serverClient.post("/posts/", {...post, thumbnail: JSON.stringify(post?.thumbnail)})
    if (status === STATUS.HTTP_201_CREATED) {
      return data as Post
    } else {
      throw new Error(statusText)
    }
  } catch (error: any) {
    console.error(error)
    throw new Error('An unknown error occurred, please try again.')
  }
}

export async function likePost(postId: string) {
  try {
    const { data, status } = await serverClient.post(`/posts/${postId}/like/`)
    if (status === STATUS.HTTP_201_CREATED || status === STATUS.HTTP_200_SUCCESSFUL) {
      return { message: 'Post liked successfully', data: data as Post }
    } else {
      throw new Error('Something went wrong, Post could not be liked.')
    }
  } catch (error) {
    console.error(error)
  }
}

export const getFavoriteRecipes = async (page = 1) => {
  try {
    const { data } = await serverClient.get("/recipes/favorites/", { params: { page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}

export const filterPostsByTag = async (tag: string, page=1) => {
  try {
    const { data } = await serverClient.get(`/posts/tags/`, { params: { tag, page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}

export const searchPosts = async (query: string, page=1) => {
  try {
    const { data } = await serverClient.get(`/posts/search/`, { params: { q: query, page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}