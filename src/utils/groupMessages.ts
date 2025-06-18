import { IMessage } from "@/store/message/types";
import { isImage } from "./isImage";

export const groupMessages = (messages: IMessage[]) => {
  const files: IMessage[] = [];
  const videos: IMessage[] = [];
  const audios: IMessage[] = [];
  const images: IMessage[] = [];

  messages.forEach((message) => {
    if (message.fileUrl) {
      if (isImage(message.fileUrl)) {
        images.push(message);
      } else {
        files.push(message);
      }
    }

    if (message.videoUrl) {
      videos.push(message);
    }

    if (message.audioUrl) {
      audios.push(message);
    }
  });

  return { files, images, videos, audios };
};
