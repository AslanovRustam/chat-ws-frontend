import { IChat } from "@/store/chat/types";
import { format, formatDistanceToNow } from "date-fns";

export function getTimeSinceLastMessage(messages: IChat[]): string {
  if (!messages.length) return "no messages";

  const lastMessage = messages[messages.length - 1];
  const updatedAt = new Date(lastMessage.updatedAt);
  const now = new Date();

  const diffMs = now.getTime() - updatedAt.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} d. ago`;
  if (diffHours > 0) return `${diffHours} h. ago`;
  if (diffMin > 0) return `${diffMin} m. ago`;
  return `just now`;
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export const currentDateAndTime = () => {
  return format(new Date().toISOString(), "PPpp");
};

export const dateDistance = (date: string) => {
  return formatDistanceToNow(new Date(date));
};
