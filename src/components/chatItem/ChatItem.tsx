import Image from "next/image";
// Images
import defaultAvatar from "../../../public/images/avatarDefault.png";
import Status from "../../../public/status.svg";
// Utils
import { dateDistance } from "@/utils/date";
import { IChat } from "@/store/chat/types";
import { IMessage } from "@/store/message/types";
// Styles
import s from "./chatItem.module.scss";

type Props = { item: { chat: IChat; lastMessage: IMessage } };

export default function ChatItem({ item }: Props) {
  return (
    <>
      <Image src={defaultAvatar} alt="User Avatar" className={s.avatar} />
      <div className={s.container}>
        <div className={s.main}>
          <p className={s.name}>{item?.lastMessage?.senderName}</p>
          <p className={s.text}>{item?.lastMessage?.text}</p>
        </div>
        <div className={s.additional}>
          {item?.lastMessage?.updatedAt && (
            <p className={s.time}>{dateDistance(item.lastMessage.updatedAt)}</p>
          )}
          <p className={s.read}>
            <Status className={s.icon} />
          </p>
        </div>
      </div>
    </>
  );
}
