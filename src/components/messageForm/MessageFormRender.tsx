"use client";
import { ChangeEvent, RefObject, useEffect, useRef } from "react";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// Components
import EmojiPickerCmp from "../emojiPicker/EmojiPicker";
import RenderButton from "./RenderButton";
// Utils
import { useMessageForm } from "@/utils/hooks/useMessageForm";
import { getIconButtons } from "./iconsConfig";
import { IUser } from "@/types/types";
// Images
import Arrow from "../../../public/arrow.svg";
// Styles
import s from "./messageform.module.scss";
import Loader from "../loader/Loader";

type Props = {
  socketRef: RefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
  user: IUser | null;
  chatId: string | null;
};

function MessageFormRender({ socketRef, user, chatId }: Props) {
  const {
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
  } = useMessageForm(user, chatId, socketRef);

  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoPreviewRef.current && videoStream) {
      videoPreviewRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const handleMicClick = () =>
    isRecording ? stopRecording() : startRecording();

  const handleVideoClick = () =>
    isVideoRecording ? stopRecordingVideo() : startRecordingVideo();

  const handleEmojiClick = () => setShowEmojiPicker((prev) => !prev);

  const handleFileChooseClick = () => fileInputRef.current?.click();

  const iconButtons = getIconButtons(
    handleVideoClick,
    isVideoRecording,
    handleMicClick,
    isRecording,
    handleEmojiClick,
    handleFileChooseClick
  );

  const handleSetInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setInput(value);
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
          <input
            type="file"
            hidden
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
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
                : sendMessage
            }
            disabled={loading}
          >
            {loading ? <Loader size={20} /> : <Arrow className={s.icon} />}
          </button>
        </div>

        {showEmojiPicker && (
          <EmojiPickerCmp
            setInput={setInput}
            onClickOutside={() => setShowEmojiPicker(false)}
          />
        )}

        {isVideoRecording && videoStream && (
          <div className={s.videoPreviewWrapper}>
            <video
              ref={videoPreviewRef}
              className={s.videoPreview}
              autoPlay
              muted
              playsInline
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageFormRender;
