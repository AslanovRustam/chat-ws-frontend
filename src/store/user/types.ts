import { IUser } from "@/types/types";
import { BaseState } from "../types";

export interface AuthState extends BaseState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}
