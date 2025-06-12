import clsx from "clsx";
import Image from "next/image";
// Components
import MessageItem from "../messageItem/MessageItem";
// Images
import defaultAvatar from "../../../public/images/avatarDefault.png";
// Utils
import { formatDate } from "@/utils/date";
import { useAppSelector } from "@/store/hooks";
import { selectedMessages, selectUserId } from "@/store/selectors";
// Style
import s from "./messagelist.module.scss";

function MessageList() {
  const messages = useAppSelector(selectedMessages);
  const userId = useAppSelector(selectUserId);

  return (
    <ul className={s.messageList}>
      {messages.length > 0 &&
        messages.map((message, index) => (
          <li
            className={clsx(
              s.messageItem,
              userId === message.senderId && "ml-auto"
            )}
            key={`${message.id}-${message.createdAt}-${index}`}
          >
            <div
              className={clsx(
                s.userInfo,
                userId === message.senderId && "order-1"
              )}
            >
              <Image
                src={message?.avatar || defaultAvatar}
                alt={message?.senderName || ""}
                className={clsx(s.userAvatar)}
              />

              <span>{message.senderName}</span>
            </div>

            <div
              className={clsx(
                s.message,
                userId === message.senderId ? s.currentUser : s.companionUser
              )}
            >
              <MessageItem message={message} />

              <span
                className={clsx(
                  s.time,
                  userId === message.senderId && s.timeCurrentUser
                )}
              >
                {formatDate(message?.createdAt || "")}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default MessageList;
