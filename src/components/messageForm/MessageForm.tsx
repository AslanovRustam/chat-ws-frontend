"use client";
import { ChangeEvent, RefObject, useState } from "react";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// Utils
import { useAudioRecorder } from "@/utils/hooks/useAudioRecorder";
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

function MessageForm({ socketRef, user, chatId }: Props) {
  const [input, setInput] = useState<string>("");
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

  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(sendVoiceMessage);

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
            <li className={s.item}>
              <button type="button" className={s.button}>
                <Camera className={s.icon} />
              </button>
            </li>
            <li className={s.item}>
              <button
                type="button"
                onClick={handleMicClick}
                className={clsx(s.button, {
                  [s.recording]: isRecording,
                })}
              >
                <Microphone className={s.icon} />
              </button>
            </li>
            <li className={s.verticalLine}></li>
            <li className={s.item}>
              <button type="button" className={s.button}>
                <Emoji className={s.icon} />
              </button>
            </li>
            <li className={s.item}>
              <button type="button" className={s.button}>
                <Attach className={s.icon} />
              </button>
            </li>
            <li className={s.item}>
              <button type="button" className={s.button}>
                <Blank className={s.icon} />
              </button>
            </li>
            <li className={s.verticalLine}></li>
            <li className={s.item}>
              <button type="button" className={s.button}>
                <Dots className={clsx(s.icon, "rotate-90")} />
              </button>
            </li>
          </ul>
          <button
            type="button"
            className={clsx(s.button, {
              [s.recording]: isRecording,
            })}
            onClick={isRecording ? handleMicClick : handleSubmit}
          >
            <Arrow className={s.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageForm;

{
  /* <ul className={s.list}>
  <li className={s.item}>
    <button type="button" className={s.button}>
      <Camera className={s.icon} />
    </button>
  </li>
  <li className={s.item}>
    <button
      type="button"
      onClick={handleMicClick}
      className={clsx(s.button, {
        [s.recording]: isRecording,
      })}
    >
      <Microphone className={s.icon} />
    </button>
  </li>
  <li className={s.verticalLine}></li>
  <li className={s.item}>
    <button type="button" className={s.button}>
      <Emoji className={s.icon} />
    </button>
  </li>
  <li className={s.item}>
    <button type="button" className={s.button}>
      <Attach className={s.icon} />
    </button>
  </li>
  <li className={s.item}>
    <button type="button" className={s.button}>
      <Blank className={s.icon} />
    </button>
  </li>
  <li className={s.verticalLine}></li>
  <li className={s.item}>
    <button type="button" className={s.button}>
      <Dots className={clsx(s.icon, "rotate-90")} />
    </button>
  </li>
</ul>; */
}
