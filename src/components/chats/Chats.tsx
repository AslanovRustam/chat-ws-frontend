// Components
import ChatItem from "../chatItem/ChatItem";
// Utils
import { IChat } from "@/store/chat/types";
import { IMessage } from "@/store/message/types";
// Styles
import s from "./chats.module.scss";

type Props = {
  handleChatSelect: (chatId: string) => void;
  usersChat: { chat: IChat; lastMessage: IMessage }[];
  chatId: string | null;
};

function Chats({ handleChatSelect, usersChat, chatId }: Props) {
  return (
    <ul className={s.list}>
      {usersChat.map((item) => (
        <li
          className={`${s.item} ${chatId === item.chat.id && s.activeChat}`}
          key={item.chat.id}
          onClick={() => handleChatSelect(item.chat.id)}
        >
          <ChatItem key={item.chat.id} item={item} />
        </li>
      ))}
    </ul>
  );
}

export default Chats;
