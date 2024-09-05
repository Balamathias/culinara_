export interface User {
  id: string,
  username: string,
  email: string,
  first_name: string | null,
  last_name: string | null,
  is_active?: boolean,
  is_staff?: boolean,
  is_superuser?: boolean,
  avatar: string | null,
}

export interface Tag {
  id: string | number,
  name: string,
  created_at?: string,
  updated_at?: string | null,
}

export interface Post {
  id: string,
  title: string,
  content: string,
  created_at: string,
  updated_at: string | null,
  author: User,
  thumbnail: string | null,
  tags: Tag[],
  video: string | null,
  short_description: string | null,
  likes_count: number,
}

export interface PaginatedPosts {
  count: number,
  next: string | null,
  previous: string | null,
  results: Post[],
}