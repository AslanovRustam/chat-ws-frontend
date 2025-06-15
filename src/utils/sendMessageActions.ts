import { instance } from "@/utils/api";
import { API_ENDPOINTS } from "@/constants/constants";
import { IUser } from "@/types/types";

export const sendTextMessage = async ({
  input,
  chatId,
  user,
  socket,
}: {
  input: string;
  chatId: string;
  user: IUser;
  socket: any;
}) => {
  const payload = {
    chatId,
    senderId: user.id,
    senderName: user.username,
    text: input,
  };

  await instance.post(API_ENDPOINTS.createMessage, payload);
  socket?.emit("sendMessage", payload);
};

export const sendVoiceMessage = async (
  blob: Blob,
  chatId: string,
  user: IUser,
  socket: any
) => {
  const formData = new FormData();
  formData.append("file", blob, "voice.webm");
  formData.append("chatId", chatId);
  formData.append("senderId", String(user.id));
  formData.append("senderName", String(user.username));

  const response = await instance.post(API_ENDPOINTS.voiceMessage, formData);
  socket?.emit("sendMessage", response.data);
};

export const sendVideoMessage = async (
  blob: Blob,
  chatId: string,
  user: IUser,
  socket: any
) => {
  const formData = new FormData();
  formData.append("file", blob, "video.webm");
  formData.append("chatId", chatId);
  formData.append("senderId", String(user.id));
  formData.append("senderName", String(user.username));

  const response = await instance.post(API_ENDPOINTS.videoMessage, formData);
  socket?.emit("sendMessage", response.data);
};

export const sendFileMessage = async (
  file: File,
  chatId: string,
  user: IUser,
  socket: any
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("chatId", chatId);
  formData.append("senderId", String(user.id));
  formData.append("senderName", String(user.username));

  const response = await instance.post(API_ENDPOINTS.fileMessage, formData);
  socket?.emit("sendMessage", response.data);
};
