"use client";
import { useEffect } from "react";
// Components
import Searchbar from "../searchbar/Searchbar";
import Chats from "../chats/Chats";
// Images
import Dots from "../../../public/dots.svg";
// Utils
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectedChatId, selectUserChats } from "@/store/selectors";
import { setSelectedChatId } from "@/store/chat/chatSlice";
import { getAllChats, getUserChats } from "@/store/chat/asyncOperations";
import { getAllChatMessages } from "@/store/message/asyncOperations";
// Styles
import s from "./messages.module.scss";

function Messages() {
  const dispatch = useAppDispatch();
  const usersChat = useAppSelector(selectUserChats);
  const chatId = useAppSelector(selectedChatId);

  const handleChatSelect = (chatId: string): void => {
    dispatch(setSelectedChatId(chatId));
    dispatch(getAllChats());
    dispatch(getAllChatMessages(chatId));
  };

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <p className={s.title}>Messages</p>
        <Dots className={s.dots} />
      </div>
      <div className={s.searchbar}>
        <Searchbar />
      </div>
      {usersChat?.length !== 0 && (
        <Chats
          handleChatSelect={handleChatSelect}
          usersChat={usersChat}
          chatId={chatId}
        />
      )}
    </div>
  );
}

export default Messages;
