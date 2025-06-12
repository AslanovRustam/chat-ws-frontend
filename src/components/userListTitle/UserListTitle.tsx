import { CSSProperties } from "react";
import { STATUS } from "@/constants/constants";
import { useAppSelector } from "@/store/hooks";
import { selectedChatId, selectUserChats } from "@/store/selectors";
import s from "./userListTitle.module.scss";

type Props = { status?: string };

function UserListTitle({ status = STATUS.active }: Props) {
  const selectedChat = useAppSelector(selectedChatId);
  const chats = useAppSelector(selectUserChats);

  const participantsLength =
    chats?.find((chat) => chat.chat.id === selectedChat)?.chat.participants
      .length ?? 0;

  return (
    <>
      <div className={s.name}>
        <span>
          {`${participantsLength} users in chat` || "No users in chat"}
        </span>
      </div>
      <p
        className={s.status}
        style={{ "--statusColor": status } as CSSProperties}
      >
        {status === STATUS.active ? "Active Now" : "Inactive"}
      </p>
    </>
  );
}

export default UserListTitle;
