import { useState, ChangeEvent, RefObject, useRef } from "react";
import { IUser } from "@/types/types";
import { useAudioRecorder } from "@/utils/hooks/useAudioRecorder";
import { useVideoRecorder } from "@/utils/hooks/useVideoRecorder";
import {
  sendFileMessage,
  sendTextMessage,
  sendVideoMessage,
  sendVoiceMessage,
} from "../sendMessageActions";

export const useMessageForm = (
  user: IUser | null,
  chatId: string | null,
  socket: RefObject<any>
) => {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (user && chatId && input.trim()) {
      await sendTextMessage({ input, chatId, user, socket: socket.current });
      setInput("");
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user || !chatId || !e.target.files?.[0]) return;
    await sendFileMessage(e.target.files[0], chatId, user, socket.current);
    e.target.value = "";
  };

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    async (blob) => {
      if (chatId && user)
        await sendVoiceMessage(blob, chatId, user, socket.current);
    }
  );

  const {
    isVideoRecording,
    startRecordingVideo,
    stopRecordingVideo,
    stream: videoStream,
  } = useVideoRecorder({
    onStop: async (blob) => {
      if (chatId && user)
        await sendVideoMessage(blob, chatId, user, socket.current);
    },
  });

  return {
    input,
    setInput,
    showEmojiPicker,
    setShowEmojiPicker,
    isRecording,
    startRecording,
    stopRecording,
    isVideoRecording,
    startRecordingVideo,
    stopRecordingVideo,
    videoStream,
    fileInputRef,
    handleFileUpload,
    sendMessage,
  };
};
