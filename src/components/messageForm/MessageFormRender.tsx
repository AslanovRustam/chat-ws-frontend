"use client";
import { ChangeEvent, RefObject, useState } from "react";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// Components
import EmojiPickerCmp from "../emojiPicker/EmojiPicker";
import RenderButton from "./RenderButton";
// Utils
import { useAudioRecorder } from "@/utils/hooks/useAudioRecorder";
import { useVideoRecorder } from "@/utils/hooks/useVideoRecorder";
import { instance } from "@/utils/api";
import { API_ENDPOINTS } from "@/constants/constants";
import { IUser } from "@/types/types";
// Images
import Camera from "../../../public/camera.svg";
import Dots from "../../../public/dots.svg";
import Microphone from "../../../public/microphone.svg";
import Emoji from "../../../public/emoji.svg";
import Attach from "../../../public/attach.svg";
import Blank from "../../../public/blank.svg";
import Arrow from "../../../public/arrow.svg";
// Styles
import s from "./messageform.module.scss";

type Props = {
  socketRef: RefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
  user: IUser | null;
  chatId: string | null;
};

function MessageFormRender({ socketRef, user, chatId }: Props) {
  const [input, setInput] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socket = socketRef.current;

  const sendVoiceMessage = async (blob: Blob): Promise<void> => {
    if (!user || !chatId) return;

    const formData = new FormData();
    formData.append("file", blob, "voice.webm");
    formData.append("chatId", chatId);
    formData.append("senderId", String(user.id));
    formData.append("senderName", String(user.username));

    try {
      const response = await instance.post(
        API_ENDPOINTS.voiceMessage,
        formData
      );

      socket?.emit("sendMessage", response.data);
    } catch (error) {
      console.error("Failed to send voice message:", error);
    }
  };

  const sendVideoMessage = async (blob: Blob): Promise<void> => {
    if (!user || !chatId) return;

    const formData = new FormData();
    formData.append("file", blob, "video.webm");
    formData.append("chatId", chatId);
    formData.append("senderId", String(user.id));
    formData.append("senderName", String(user.username));

    try {
      const response = await instance.post(
        API_ENDPOINTS.videoMessage,
        formData
      );

      socket?.emit("sendMessage", response.data);
    } catch (error) {
      console.error("Failed to send video message:", error);
    }
  };

  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(sendVoiceMessage);

  const { isVideoRecording, startRecordingVideo, stopRecordingVideo } =
    useVideoRecorder({
      onStop: (blob) => {
        sendVideoMessage(blob);
      },
    });

  const sendMessage = async (): Promise<void> => {
    if (!user || !chatId || !input.trim()) return;

    try {
      await instance.post(API_ENDPOINTS.createMessage, {
        chatId,
        senderId: user.id,
        senderName: user.username,
        text: input,
      });

      socket?.emit("sendMessage", {
        chatId,
        senderId: user.id,
        senderName: user.username,
        text: input,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setInput("");
  };

  const handleSetInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (): void => {
    sendMessage();
  };

  const handleMicClick = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleVideoClick = () => {
    isVideoRecording ? stopRecordingVideo() : startRecordingVideo();
  };

  const iconButtons = [
    { Icon: Camera, onClick: handleVideoClick, isRecording: isVideoRecording },
    { Icon: Microphone, onClick: handleMicClick, isRecording: isRecording },
    "divider",
    { Icon: Emoji, onClick: handleEmojiClick },
    { Icon: Attach, onClick: undefined },
    { Icon: Blank, onClick: undefined },
    "divider",
    { Icon: Dots, onClick: undefined, extraClass: "rotate-90" },
  ];

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <textarea
          className={s.textarea}
          placeholder="Type here..."
          value={input}
          onChange={handleSetInput}
        />
        <div className={s.bottomSection}>
          <ul className={s.list}>
            {iconButtons.map((item, index) =>
              item === "divider" ? (
                <li key={`divider-${index}`} className={s.verticalLine}></li>
              ) : (
                typeof item !== "string" && (
                  <RenderButton
                    IconComponent={item.Icon}
                    isRecording={item.isRecording}
                    extraClass={item.extraClass}
                    onClick={item.onClick}
                    key={index}
                  />
                )
              )
            )}
          </ul>
          <button
            type="button"
            className={clsx(s.button, {
              [s.recording]: isRecording || isVideoRecording,
            })}
            onClick={
              isRecording
                ? handleMicClick
                : isVideoRecording
                ? handleVideoClick
                : handleSubmit
            }
          >
            <Arrow className={s.icon} />
          </button>
        </div>
        {showEmojiPicker && (
          <EmojiPickerCmp
            setInput={setInput}
            onClickOutside={() => setShowEmojiPicker(false)}
          />
        )}
      </div>
    </div>
  );
}

export default MessageFormRender;
