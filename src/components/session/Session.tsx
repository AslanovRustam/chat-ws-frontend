"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
// Components
import MessageList from "../messageList/MessageList";
import MessageFormRender from "../messageForm/MessageFormRender";
import UserInfo from "../userInfo/UserInfo";
import UserListTitle from "../userListTitle/UserListTitle";
// Images
import avatar from "../../../public/images/Ellipse 1.png";
import Phone from "../../../public/phone.svg";
import Camera from "../../../public/camera.svg";
import Dots from "../../../public/dots.svg";
// Utils
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectedChatId, selectUser } from "@/store/selectors";
import { IMessage } from "@/store/message/types";
import { useSocket } from "@/utils/hooks/useSocket";
import { addMessage } from "@/store/message/messageSlice";
// Styles
import s from "./session.module.scss";

function Session() {
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
  const socketRef = useSocket();
  const currentChatId = useAppSelector(selectedChatId);
  const user = useAppSelector(selectUser);

  const userId = user?.id;

  const dispatch = useAppDispatch();
  const toggleUserInfo = (): void => {
    setShowUserInfo(!showUserInfo);
  };

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.emit("joinChat", { chatId: currentChatId, userId });

    const handleNewMessage = (message: IMessage) => {
      dispatch(addMessage(message));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [currentChatId, socketRef.current, userId]);

  if (!currentChatId) return;

  return (
    <section className="ml-[25rem] flex w-[67.5vw] ">
      <section
        className={clsx(
          s.section,
          "transition-all duration-300 ease-in-out w-full"
        )}
      >
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.userContainer} onClick={toggleUserInfo}>
              <Image src={avatar} alt="avatar" className={s.avatar} />
              <div className={s.user}>
                <UserListTitle />
              </div>
            </div>
            <ul className={s.list}>
              <li className={s.item}>
                <Phone className={s.icon} />
              </li>
              <li className={s.item}>
                <Camera className={s.icon} />
              </li>
              <li className={s.item}>
                <Dots className={s.icon} />
              </li>
            </ul>
          </div>

          <MessageList />

          <MessageFormRender
            socketRef={socketRef}
            user={user}
            chatId={currentChatId}
          />
        </div>
        <div
          className={clsx(
            "transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
            showUserInfo ? "translate-x-0 w-[66%]" : "translate-x-full w-0"
          )}
        >
          <UserInfo close={toggleUserInfo} />
        </div>
      </section>
    </section>
  );
}

export default Session;
