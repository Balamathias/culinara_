import { useMutation, QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import { createPost, explorePosts, filterPostsByTag, getFavoriteRecipes, getPosts, getUserPosts, likePost, searchPosts } from "../posts";
import { InsertPost } from "@/types/db";

const queryClient = new QueryClient()

export const useCreatePost = () => useMutation({
  mutationKey: [QUERY_KEYS.create_post],
  mutationFn: async (post: InsertPost) => await createPost(post)
})

export const useLikePost = () => useMutation({
  mutationKey: [QUERY_KEYS.like_post],
  mutationFn: ({ postId }: { postId: string }) => likePost(postId),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: [QUERY_KEYS.get_posts]})
    queryClient.invalidateQueries({queryKey: [QUERY_KEYS.get_infinite_posts]})
  }
})

// @ts-expect-error: Ignore
export const useInfinitePosts = () => useInfiniteQuery({
  queryKey: [QUERY_KEYS.get_infinite_posts],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const posts = await getPosts(pageParam)
    return posts!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.next) {
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get("page");
      return nextPage ? parseInt(nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})

// @ts-expect-error: Ignore
export const useInfinitePostsByTags = (tag: string) => useInfiniteQuery({
  queryKey: [QUERY_KEYS.get_infinite_posts_by_tag, tag],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const posts = await filterPostsByTag(tag, pageParam)
    return posts!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.next) {
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get("page");
      return nextPage ? parseInt(nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})

// @ts-expect-error: Ignore
export const useInfiniteFavoritePosts = () => useInfiniteQuery({
  queryKey: [QUERY_KEYS.get_infinite_favorite_posts],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const posts = await getFavoriteRecipes(pageParam)
    return posts!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.next) {
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get("page");
      return nextPage ? parseInt(nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})

export const useSearch = (q: string) => useQuery({
  queryFn: () => { 
    if (q)
      return searchPosts(q)
  },
  queryKey: [QUERY_KEYS.get_search, q]
})

// @ts-expect-error: TS just being a bad guy...
export const useInfiniteSearch = (q: string) => useInfiniteQuery({
  queryKey: [QUERY_KEYS.get_infinite_search, q],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const posts = await searchPosts(q, pageParam)
    return posts!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.next) {
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get("page");
      return nextPage ? parseInt(nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})

// @ts-expect-error: TS just being a bad guy...
export const useInfiniteExplore = (tab: string) => useInfiniteQuery({
  queryKey: [QUERY_KEYS.explore_posts, tab],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const posts = await explorePosts(tab, pageParam)
    return posts!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.next) {
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get("page");
      return nextPage ? parseInt(nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})

// @ts-expect-error: TS just being a bad guy...
export const useInfiniteProfileUserPosts = (username: string) => useInfiniteQuery({
  queryKey: [QUERY_KEYS.profile_user_posts, username],
  queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
    const posts = await getUserPosts(username, pageParam)
    return posts!
  },
  getNextPageParam: (lastPage) => {
    if (lastPage?.next) {
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get("page");
      return nextPage ? parseInt(nextPage) : undefined;
    }
    return undefined
  },
  initialData: {
    pages: [],
    pageParams: [],
  },
})
