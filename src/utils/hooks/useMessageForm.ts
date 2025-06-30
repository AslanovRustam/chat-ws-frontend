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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (user && chatId && input.trim()) {
      setLoading(true);
      setError(null);
      try {
        await sendTextMessage({ input, chatId, user, socket: socket.current });
        setInput("");
      } catch (error: any) {
        setError(error?.message || "Error sending message");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user || !chatId || !e.target.files?.[0]) return;
    setLoading(true);
    setError(null);
    try {
      await sendFileMessage(e.target.files[0], chatId, user, socket.current);
    } catch (error: any) {
      setError(error?.message || "Error sending message");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    async (blob) => {
      if (!chatId && !user) return;
      setLoading(true);
      setError(null);
      try {
        await sendVoiceMessage(blob, chatId!, user!, socket.current);
      } catch (error: any) {
        setError(error?.message || "Error sending message");
      } finally {
        setLoading(false);
      }
    }
  );

  const {
    isVideoRecording,
    startRecordingVideo,
    stopRecordingVideo,
    stream: videoStream,
  } = useVideoRecorder({
    onStop: async (blob) => {
      if (!chatId || !user) return;
      setLoading(true);
      setError(null);
      try {
        await sendVideoMessage(blob, chatId, user, socket.current);
      } catch (err: any) {
        setError(err?.message || "Error sending message");
      } finally {
        setLoading(false);
      }
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
    loading,
    error,
  };
};
