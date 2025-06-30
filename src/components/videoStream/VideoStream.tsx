"use client";
import { useEffect, useRef } from "react";

export default function VideoStream({ stream }: { stream: MediaStream }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={ref} autoPlay muted={false} className="w-64 border" />;
}
