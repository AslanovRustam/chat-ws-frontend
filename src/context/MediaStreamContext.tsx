"use client";
import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
} from "react";

export type MediaStreamContextType = {
  localStream: MediaStream | null;
  getLocalStream: (faceMode?: string) => Promise<MediaStream | null>;
};

const MediaStreamContext = createContext<MediaStreamContextType | undefined>(
  undefined
);

export const MediaStreamProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const getLocalStream = useCallback(
    async (faceMode?: string) => {
      if (localStream) return localStream;
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 360, ideal: 720, max: 1080 },
            frameRate: { min: 16, ideal: 30, max: 30 },
            facingMode: videoDevices.length > 0 ? faceMode : undefined,
          },
          audio: true,
        });

        setLocalStream(stream);
        return stream;
      } catch (error) {
        console.error("Failed to get local stream", error);
        setLocalStream(null);
        return null;
      }
    },
    [localStream]
  );

  return (
    <MediaStreamContext.Provider value={{ localStream, getLocalStream }}>
      {children}
    </MediaStreamContext.Provider>
  );
};

export const useMediaStream = (): MediaStreamContextType => {
  const ctx = useContext(MediaStreamContext);
  if (!ctx) {
    throw new Error("useMediaStream must be used within MediaStreamProvider");
  }
  return ctx;
};
