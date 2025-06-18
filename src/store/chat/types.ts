import { IMessage } from "../message/types";

export interface IChat {
  id: string;
  content: string;
  participants: string[];
  senderId: string;
  createdAt: string;
  updatedAt: string;
  chatId: string;
  type: "chat" | "info";
}

export type ChatWithLastMessage = { chat: IChat; lastMessage: IMessage };

export interface IParticipant {
  id: string;
  username: string;
  email: string;
}
