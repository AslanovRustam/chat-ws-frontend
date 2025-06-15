export const BASE_URL = "http://localhost:3000";

export const ROUTES = {
  dashboard: "/dashboard",
  contacts: "/contacts",
  chat: "/chat",
  phone: "/phone",
  settings: "/settings",
  faq: "/faq",
  user: "/user",
};

export const API_ENDPOINTS = {
  login: "/auth/login",
  user: "/user",
  messages: "/message/chat",
  chat: "/chats/user",
  allChats: "/chats",
  createMessage: "/message",
  voiceMessage: "/message/voice",
  videoMessage: "/message/video",
  fileMessage: "/message/file",
};

export const STATUS = {
  active: "green",
  inActive: "red",
};
