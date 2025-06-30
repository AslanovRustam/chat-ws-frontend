import React from "react";
import Messages from "@/components/messages/Messages";
import Session from "@/components/session/Session";
// import VideoCall from "@/components/videoCall/VideoCall";

function Chat() {
  return (
    <div className="flex">
      <Messages />
      <Session />
      {/* <VideoCall /> */}
    </div>
  );
}

export default Chat;
