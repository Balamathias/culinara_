'use server'

import serverClient from "@/lib/server"
import { InsertPost, PaginatedPosts, Post, TrendingPosts } from "@/types/db"
import { status as STATUS } from '@/lib/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description get a list of all posts... It can be paged accordingly.
 * @param [page=1] optional page param.
 * @returns a paginated post objects with the structure: 
 * ```js
 * {
 *  prev: string;
 *  next: string;
 *  count: number;
 *  results: []
 * }
 * ```
 */
export async function getPosts(page = 1) {
  try {
    const { data } = await serverClient.get("/posts/", { params: { page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * @description get a list of all trending posts
 * @param count the number of trending posts to get (optional)
 * @returns TrendingPosts but not paginated
 */
export async function getTrendingPosts(count=3) {
  try {
    const { data } = await serverClient.get("/posts/trending/?count=" + count)
    return data as TrendingPosts
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * @description get a user's posts by his username
 * @param username (required) string
 * @param page (optional) number
 * @returns { PaginatedPosts | null }
 */
export async function getUserPosts(username: string, page=1) {
  try {
    const { data } = await serverClient.get(`/profile/${username}/posts/`, { params: { page } })
    return data as PaginatedPosts
  } catch (error: any) {
    console.error(error)
    return null
  }
}

/**
 * @description get a single post by id.
 * @param id string (required)
 * @returns a Post object or undefined.
 */
export async function getPost(id: string) {
  try {
    const { data } = await serverClient.get(`/posts/${id}/`)
    return data as Post
  } catch (error) {
    console.error(error)
  }
}

/**
 * @description an exclusive function for handling creation of Posts.
 * @param post (required)
 * @returns 
 */
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
    throw new Error(error)
  }
}

/**
 * a function that likes or unlikes a post with id { postId } on subsequent requests.
 * @param postId (required)
 * @returns a success or an error (otherwise qualified as undefined.)
 */
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

/**
 * @description a function that gets the currently logged in user's recipe
 * @param page (optional)
 * @returns 
 */
export const getFavoriteRecipes = async (page = 1) => {
  try {
    const { data } = await serverClient.get("/recipes/favorites/", { params: { page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}

/**
 * @description a function that filters posts by a given tag.
 * @param tag (required)
 * @param page (optional)
 * @returns 
 */
export const filterPostsByTag = async (tag: string, page=1) => {
  try {
    const { data } = await serverClient.get(`/posts/tags/`, { params: { tag, page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}

/**
 * @description a function that returns varieties of posts based on a tab
 * @param tab (optional - `all, recents, for-me, trending, popular`)
 * @param page (optional)
 * @returns 
 */
export const explorePosts = async (tab="all", page=1) => {
  try {
    const { data } = await serverClient.get(`/posts/explore/`, { params: { tab, page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}

/**
 * @description a function that returns posts based on a search Query.
 * @param query (required)
 * @param page (optional)
 * @returns 
 */
export const searchPosts = async (query: string, page=1) => {
  try {
    const { data } = await serverClient.get(`/posts/search/`, { params: { q: query, page } })
    return data as PaginatedPosts
  } catch (error) {
    console.error(error)
  }
}