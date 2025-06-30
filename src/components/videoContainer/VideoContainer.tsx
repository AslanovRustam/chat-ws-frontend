import React, { useEffect, useRef } from "react";

type Props = {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
};

function VideoContainer({ stream, isLocalStream, isOnCall }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      ref={videoRef}
      className="rounded border w-[800px]"
      autoPlay
      playsInline
      muted={isLocalStream}
    />
  );
}

export default VideoContainer;
