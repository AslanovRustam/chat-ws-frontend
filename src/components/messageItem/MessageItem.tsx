import { IMessage } from "@/store/message/types";
import { BASE_URL } from "@/constants/constants";
import { isImage } from "@/utils/isImage";
// Styles
import s from "./messageitem.module.scss";

type Props = { message: IMessage };

function MessageItem({ message }: Props) {
  return (
    <>
      {message?.text && <span>{message.text}</span>}
      {message?.audioUrl && (
        <p className={s.audioWrapper}>
          <audio controls src={`${BASE_URL}/public${message.audioUrl}`} />
        </p>
      )}
      {message?.videoUrl && (
        <div className={s.videoWrapper}>
          <video
            controls
            src={`${BASE_URL}/public${message.videoUrl}`}
            className={s.videoPlayer}
          />
        </div>
      )}
      {message?.fileUrl && (
        <div className={s.fileWrapper}>
          {isImage(message.fileUrl) ? (
            <a
              href={`${BASE_URL}/public${message.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${BASE_URL}/public${message.fileUrl}`}
                alt={message.fileName || "image preview"}
                className={s.imagePreview}
              />
            </a>
          ) : (
            <a
              href={`${BASE_URL}/public${message.fileUrl}`}
              download={message.fileName}
              target="_blank"
              rel="noopener noreferrer"
            >
              📎 {message.fileName}
            </a>
          )}
        </div>
      )}
    </>
  );
}

export default MessageItem;
