"use client";
import { useMediaStream } from "@/context/MediaStreamContext";
import VideoContainer from "../videoContainer/VideoContainer";
import { useCallback, useEffect, useState } from "react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { IOngoingCall, IPeerData } from "@/types/types";

type Props = { peer: IPeerData | null; ongoingCall: IOngoingCall | null };

function VideoCall({ peer, ongoingCall }: Props) {
  const { localStream } = useMediaStream();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];
      setIsVidOn(videoTrack.enabled);
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);
    }
  }, [localStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  const isOnCall = localStream && peer && ongoingCall ? true : false;

  return (
    <div className="absolute">
      <div>
        {localStream && (
          <VideoContainer
            stream={localStream}
            isLocalStream={true}
            isOnCall={isOnCall}
          />
        )}
        {peer && peer.stream && (
          <VideoContainer
            stream={peer.stream}
            isLocalStream={false}
            isOnCall={isOnCall}
          />
        )}
      </div>
      <div className="mt-8 flex items-center  justify-center">
        <button onClick={toggleMic}>
          {isMicOn ? <MdMicOff size={28} /> : <MdMic size={28} />}
        </button>
        <button
          onClick={() => console.log("end")}
          className="px-4 py-2 bg-rose-500 text-white rounded mx-4"
        >
          End Call
        </button>
        <button onClick={toggleCamera}>
          {isVidOn ? <MdVideocamOff size={28} /> : <MdVideocam size={28} />}
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
