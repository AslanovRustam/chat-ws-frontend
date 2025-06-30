import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
// Components
import MessageItem from "../messageItem/MessageItem";
// Images
import defaultAvatar from "../../../public/images/avatarDefault.png";
import Delete from "../../../public/deny.svg";
// Utils
import { formatDate } from "@/utils/date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectedMessages, selectUserId } from "@/store/selectors";
import { deleteMessage } from "@/store/message/asyncOperations";
// Style
import s from "./messagelist.module.scss";

interface MessageListProps {
  toggleUserInfo: () => void;
  handleSelectUser: (id: string) => void;
}

function MessageList({ toggleUserInfo, handleSelectUser }: MessageListProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const messages = useAppSelector(selectedMessages);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleDeleteMessage = async (messageId: string) => {
    dispatch(deleteMessage(messageId));
    setSelectedMessageId(null);
  };

  const toggleDeleteButton = (messageId: string) => {
    setSelectedMessageId((prev) => (prev === messageId ? null : messageId));
  };

  const handleUserClick = (id: string) => {
    handleSelectUser(id);
    toggleUserInfo();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.${s.message}`)) {
        setSelectedMessageId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
              onClick={() => handleUserClick(message.senderId)}
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
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  toggleDeleteButton(message.id);
                }
              }}
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

              {selectedMessageId === message.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(message.id);
                  }}
                  className={clsx(
                    s.deleteButton,
                    userId === message.senderId
                      ? s.deleteButtonCurrentUser
                      : s.deleteButtoncompanion
                  )}
                  title="Delete message"
                >
                  <Delete className={s.deleteIcon} />
                </button>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
}

export default MessageList;
