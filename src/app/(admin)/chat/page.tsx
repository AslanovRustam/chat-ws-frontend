import React from "react";
import Messages from "@/components/messages/Messages";
import Session from "@/components/session/Session";

function Chat() {
  return (
    <div className="flex">
      <Messages />
      <Session />
    </div>
  );
}

export default Chat;
