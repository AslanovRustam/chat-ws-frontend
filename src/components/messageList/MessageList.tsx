import clsx from "clsx";
import Image from "next/image";
// Components
import MessageItem from "../messageItem/MessageItem";
// Images
import defaultAvatar from "../../../public/images/avatarDefault.png";
// Utils
import { formatDate } from "@/utils/date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectedMessages, selectUserId } from "@/store/selectors";
import { deleteMessage } from "@/store/message/asyncOperations";
// Style
import s from "./messagelist.module.scss";

function MessageList() {
  const messages = useAppSelector(selectedMessages);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleDeleteMessage = async (messageId: string) => {
    dispatch(deleteMessage(messageId));
  };

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
              {userId === message.senderId && (
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className={s.deleteButton}
                  title="Удалить сообщение"
                >
                  Delete
                </button>
              )}
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
