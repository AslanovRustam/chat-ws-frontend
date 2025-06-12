import { StaticImageData } from "next/image";

export interface IUser {
  username?: string;
  password: string;
  email: string;
  avatarUrl?: string;
  id?: string;
}

export interface IUserForChat {
  sender: string;
  message: string;
  avatar: string | StaticImageData;
  type?: "chat" | "info";
}

export interface IFile {
  id: string;
  name: string;
  icon: string;
}
