"use client";
import { ChangeEvent, useEffect, useState } from "react";
// Images
import Search from "../../../public/search.svg";
import Plus from "../../../public/plus.svg";
// Utils
import { useSocket } from "@/utils/hooks/useSocket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserId } from "@/store/selectors";
import { setSelectedChatId } from "@/store/chat/chatSlice";
import { getAllChats } from "@/store/chat/asyncOperations";
import { setinitalMessage } from "@/store/message/messageSlice";
// Styles
import s from "./searchbar.module.scss";

function Searchbar() {
  const [search, setSearch] = useState<string>("");
  const userId = useAppSelector(selectUserId);
  const socketRef = useSocket();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleStartNewChat = (): void => {
    if (!socketRef.current || !userId) return;
    socketRef.current.emit("createChat", { ownerId: userId });
  };

  useEffect(() => {
    if (!socketRef.current) return;
    const socket = socketRef.current;

    const handleChatCreated = (chat: { id: string }): void => {
      dispatch(getAllChats());
      dispatch(setSelectedChatId(chat.id));
      dispatch(setinitalMessage([]));
    };

    socket.on("chatCreated", handleChatCreated);

    return () => {
      socket.off("chatCreated", handleChatCreated);
    };
  }, [socketRef.current]);

  return (
    <>
      <div className={s.container}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search for chats..."
          className={s.input}
        />
        <Search className={s.icon} />
      </div>
      <button type="button" className={s.button} onClick={handleStartNewChat}>
        <Plus className={s.iconBtn} />
        <span className={s.text}>Start New Chat</span>
      </button>
    </>
  );
}

export default Searchbar;
