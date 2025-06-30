"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import Peer, { SignalData } from "simple-peer";
// Context
import { useMediaStream } from "@/context/MediaStreamContext";
// Components
import MessageList from "../messageList/MessageList";
import MessageFormRender from "../messageForm/MessageFormRender";
import UserInfo from "../userInfo/UserInfo";
import VideoStream from "../videoStream/VideoStream";
import CallNotification from "../callNotification/CallNotification";
import UserListTitle from "../userListTitle/UserListTitle";
import VideoCall from "../videoCall/VideoCall";
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
import {
  IOngoingCall,
  IParticipants,
  IPeerData,
  ISocketUser,
} from "@/types/types";
// Styles
import s from "./session.module.scss";

function Session() {
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
  const [selectedUserId, setSelecteduserId] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<ISocketUser[] | null>(null);
  const [ongoingCall, setOngoingcall] = useState<IOngoingCall | null>(null);
  const [peer, setPeer] = useState<IPeerData | null>(null);

  const currentChatId = useAppSelector(selectedChatId);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { socketRef, isSocketConnected } = useSocket();
  const { localStream, getLocalStream } = useMediaStream();

  const userId = user?.id;

  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === userId
  );

  const toggleUserInfo = (): void => {
    setShowUserInfo(!showUserInfo);
  };

  const openUserInfo = (): void => {
    setShowUserInfo(true);
  };

  const handleSelectUser = (id: string) => {
    setSelecteduserId(id);
  };

  const handleCall = useCallback(
    async (user: ISocketUser) => {
      if (!currentSocketUser || !socketRef.current) return;

      const socket = socketRef.current;

      // const stream = await getMediaStream();
      const stream = await getLocalStream();

      if (!stream) {
        console.log("No stream in handleCall");
        return;
      }

      const participants = { caller: currentSocketUser, reciever: user };
      setOngoingcall({ participants, isRinging: false });
      console.log("user", user);
      console.log("participants", participants);
      socket?.emit("call", participants);
    },
    [socketRef, currentSocketUser, ongoingCall]
  );

  const onIncommingCall = useCallback(
    (participants: IParticipants) => {
      setOngoingcall({ participants, isRinging: true });
    },
    [socketRef.current, userId, ongoingCall]
  );

  const handleHangup = useCallback(({}) => {}, []);

  const createPeer = useCallback(
    (stream: MediaStream, initiator: boolean) => {
      const iceServers: RTCIceServer[] = [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
          ],
        },
      ];

      const peer = new Peer({
        stream,
        initiator,
        trickle: true,
        config: { iceServers },
      });

      peer.on("stream", (stream) => {
        setPeer((prev) => {
          if (prev) {
            return { ...prev, stream };
          }
          return prev;
        });
      });

      peer.on("error", console.error);
      peer.on("close", () => handleHangup({}));

      const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc;

      rtcPeerConnection.oniceconnectionstatechange = async () => {
        if (
          rtcPeerConnection.iceConnectionState === "disconnected" ||
          rtcPeerConnection.iceConnectionState === "failed"
        ) {
          console.log("Peer connection disconnected");
          handleHangup({});
        }
      };

      return peer;
    },
    [ongoingCall, setPeer]
  );

  const handleJoinCall = useCallback(
    async (ongoingCall: IOngoingCall) => {
      //join call
      setOngoingcall((prev) => {
        if (prev) {
          return { ...prev, isRinging: false };
        }
        return prev;
      });

      const stream = await getLocalStream();

      if (!stream) {
        console.log("Could not get strem in handleJoinCall");
        return;
      }

      const newPeer = createPeer(stream, true);

      setPeer({
        peerConnection: newPeer,
        participantUser: ongoingCall.participants.caller,
        stream: undefined,
      });

      newPeer.on("signal", async (data: SignalData) => {
        if (!socketRef.current) return;
        // emit offer to the caller

        socketRef.current.emit("webrtcSignal", {
          sdp: data,
          ongoingCall,
          isCaller: false,
        });
      });
    },
    [socketRef, currentSocketUser]
  );

  const completePeerConnection = useCallback(
    async (connectionData: {
      sdp: SignalData;
      ongoingCall: IOngoingCall;
      isCaller: boolean;
    }) => {
      if (!localStream) {
        console.log("missing the local stream in completePeerConnection");
        return;
      }

      if (peer) {
        peer.peerConnection?.signal(connectionData.sdp);
        return;
      }

      const newPeer = createPeer(localStream, true);

      setPeer({
        peerConnection: newPeer,
        participantUser: connectionData.ongoingCall.participants.reciever,
        stream: undefined,
      });

      newPeer.on("signal", async (data: SignalData) => {
        if (!socketRef.current) return;
        // emit offer to the caller

        socketRef.current.emit("webrtcSignal", {
          sdp: data,
          ongoingCall,
          isCaller: true,
        });
      });
    },
    [localStream, createPeer, peer, ongoingCall]
  );

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.emit("joinChat", {
      chatId: currentChatId,
      userId,
      userName: user?.username,
    });

    const handleNewMessage = (message: IMessage) => {
      dispatch(addMessage(message));
    };

    socket.on("newMessage", handleNewMessage);

    socket.on("getUsers", (res) => {
      setOnlineUsers(res);
    });
    // Video call handling

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("getUsers", (res) => {
        setOnlineUsers(res);
      });
    };
  }, [currentChatId, socketRef.current, userId, isSocketConnected]);

  // listen to calls event
  useEffect(() => {
    if (!socketRef.current || !isSocketConnected) return;

    const socket = socketRef.current;
    socket.on("incomingCall", onIncommingCall);
    socket.on("webrtcSignal", completePeerConnection);

    return () => {
      socket.off("incomingCall", onIncommingCall);
      socket.off("webrtcSignal", completePeerConnection);
    };
  }, [
    socketRef.current,
    userId,
    isSocketConnected,
    onIncommingCall,
    completePeerConnection,
  ]);

  if (!currentChatId) return;

  return (
    <section className="ml-[20rem] flex w-[72.5vw] relative">
      <section
        className={clsx(
          s.section,
          "transition-all duration-300 ease-in-out w-full"
        )}
      >
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.userContainer}>
              <Image src={avatar} alt="avatar" className={s.avatar} />
              <div className={s.user}>
                <UserListTitle
                  onlineUsers={onlineUsers}
                  handleCall={handleCall}
                />
              </div>
            </div>
            <ul className={s.list}>
              <li className={s.item}>
                <Phone className={s.icon} />
              </li>
              <li
                className={s.item}
                onClick={() => handleCall(currentSocketUser!)}
              >
                <Camera className={s.icon} />
              </li>
              <li className={s.item}>
                <Dots className={s.icon} />
              </li>
            </ul>
          </div>

          <MessageList
            toggleUserInfo={openUserInfo}
            handleSelectUser={handleSelectUser}
          />

          <MessageFormRender
            socketRef={socketRef}
            user={user}
            chatId={currentChatId}
          />
        </div>
        <div
          className={clsx(
            "transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
            showUserInfo ? "translate-x-0 w-[50%]" : "translate-x-full w-0"
          )}
        >
          <UserInfo close={toggleUserInfo} selectedUserId={selectedUserId} />
        </div>
      </section>
      <CallNotification
        ongoingCall={ongoingCall}
        handleJoinCall={handleJoinCall}
      />
      <VideoCall peer={peer} ongoingCall={ongoingCall} />
    </section>
  );
}

export default Session;
