import { IMessage } from "@/store/message/types";
import { BASE_URL } from "@/constants/constants";
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
    </>
  );
}

export default MessageItem;
