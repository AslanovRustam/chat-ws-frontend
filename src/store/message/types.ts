// import { StaticImageData } from "next/image";

export interface IMessage {
  chatId: string;
  createdAt: string;
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  updatedAt: string;
  avatar?: string;
  audioUrl?: string;
  videoUrl?: string;
}
