import { useState, useRef } from "react";

type UseVideoRecorderOptions = {
  onStop: (videoBlob: Blob) => void;
};

export const useVideoRecorder = ({ onStop }: UseVideoRecorderOptions) => {
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecordingVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        onStop(videoBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
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
  };
};
