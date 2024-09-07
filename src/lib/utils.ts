import { clsx, type ClassValue } from "clsx"
import { Compass, Heart, Home, PlusCircle, Search, UserCircle } from "lucide-react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum status {
  HTTP_200_SUCCESSFUL = 200,
  HTTP_201_CREATED = 201,
  HTTP_204_NO_CONTENT = 204,

  HTTP_400_BAD_REQUEST = 400,
  HTTP_401_UNAUTHORIZED = 401,
  HTTP_403_FORBIDDEN = 403,
  HTTP_404_NOT_FOUND = 404,
  HTTP_405_METHOD_NOT_ALLOWED = 405,
  HTTP_409_CONFLICT = 409,
  HTTP_422_UNPROCESSABLE_ENTITY = 422,

  HTTP_500_INTERNAL_SERVER_ERROR = 500,

  HTTP_205_RESET_CONTENT = 205,

  HTTP_429_TOO_MANY_REQUESTS = 429,

  HTTP_502_BAD_GATEWAY = 502,

  HTTP_503_SERVICE_UNAVAILABLE = 503,

  HTTP_504_GATEWAY_TIMEOUT = 504,

  HTTP_507_INSUFFICIENT_STORAGE = 507,

  HTTP_511_NETWORK_AUTHENTICATION_REQUIRED = 511,

  HTTP_520_UNKNOWN_ERROR = 520,
  HTTP_521_WEB_SERVER_IS_DOWN = 521,
  HTTP_522_CONNECTION_TIMED_OUT = 522,
  HTTP_523_ORIGIN_IS_UNREACHABLE = 523,
  HTTP_524_A_TIMEOUT_OCCURRED = 524,
  HTTP_525_SSL_HANDSHAKE_FAILED = 525,
  HTTP_526_INVALID_SSL_CERTIFICATE = 526,
  HTTP_527_RAILGUN_ERROR = 527,
  HTTP_530_ORIGIN_DNS_ERROR = 530,
  HTTP_598_NETWORK_READ_TIMEOUT_ERROR = 598,
  HTTP_599_NETWORK_CONNECT_TIMEOUT_ERROR = 599,

  HTTP_100_CONTINUE = 100,
  HTTP_101_SWITCHING_PROTOCOLS = 101,
  HTTP_102_PROCESSING = 102,
  HTTP_103_EARLY_HINTS = 103,
  HTTP_104_CHECKPOINT = 104,
}

export const links = [
  {
    label: 'Home',
    Icon: Home,
    href: '/',
  },
  {
    label: 'Create',
    Icon: PlusCircle,
    href: '/create',
  },
  {
    label: 'Favorites',
    Icon: Heart,
    href: '/favorites'
  },
  {
    label: 'Search',
    Icon: Search,
    href: '/search'
  },
  {
    label: 'Explore',
    Icon: Compass,
    href: '/explore'
  },
  {
    label: 'Profile',
    Icon: UserCircle,
    href: '/profile'
  },
]

export const clipString = (text: string, by=50) => {
  if (text.length <= by) return text
  else return text.slice(0, by) + '...'
}