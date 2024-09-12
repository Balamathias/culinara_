import { User } from "./db";

export interface RegisterResponse {
  status: string;
  message: string;
  code: number;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
  } | null;
  errors?: Record<string, string[]>
}

export interface BadRegisterResponse {
  status: string;
  message: string;
  code: number;
  data: null,
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshResponse {
  access: string;
}