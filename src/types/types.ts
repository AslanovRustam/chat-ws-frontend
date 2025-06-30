import { StaticImageData } from "next/image";
import Peer from "simple-peer";

export interface IUser {
  username?: string;
  password: string;
  email: string;
  avatarUrl?: string;
  id?: string;
}

export interface IUserForChat {
  sender: string;
  message: string;
  avatar: string | StaticImageData;
  type?: "chat" | "info";
}

export interface ISocketUser {
  socketId: string;
  userId: string;
  userName: string;
}

export interface IOngoingCall {
  participants: IParticipants;
  isRinging: boolean;
}

export interface IParticipants {
  caller: ISocketUser;
  reciever: ISocketUser;
}

export interface IPeerData {
  peerConnection: Peer.Instance;
  stream: MediaStream | undefined;
  participantUser: ISocketUser;
}
