import { useState, useRef } from "react";

type UseVideoRecorderOptions = {
  onStop: (videoBlob: Blob) => void;
};

export const useVideoRecorder = ({ onStop }: UseVideoRecorderOptions) => {
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecordingVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(mediaStream);

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        onStop(videoBlob);
        mediaStream.getTracks().forEach((track) => track.stop());
        setStream(null); // Clear after stop
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setStream(mediaStream); // Save for preview
      setIsVideoRecording(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const stopRecordingVideo = () => {
    mediaRecorderRef.current?.stop();
    setIsVideoRecording(false);
  };

  return {
    isVideoRecording,
    startRecordingVideo,
    stopRecordingVideo,
    stream,
  };
};
