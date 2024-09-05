import { User } from "./db";

export interface RegisterResponse {
  status: string;
  message: string;
  code: number;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
}