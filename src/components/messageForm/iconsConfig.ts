import Camera from "../../../public/camera.svg";
import Dots from "../../../public/dots.svg";
import Microphone from "../../../public/microphone.svg";
import Emoji from "../../../public/emoji.svg";
import Attach from "../../../public/attach.svg";
import Blank from "../../../public/blank.svg";

export const getIconButtons = (
  handleVideoClick: () => void,
  isVideoRecording: boolean,
  handleMicClick: () => void,
  isRecording: boolean,
  handleEmojiClick: () => void,
  handleFileChooseClick: () => void
) => [
  { Icon: Camera, onClick: handleVideoClick, isRecording: isVideoRecording },
  { Icon: Microphone, onClick: handleMicClick, isRecording },
  "divider",
  { Icon: Emoji, onClick: handleEmojiClick },
  { Icon: Attach, onClick: handleFileChooseClick },
  { Icon: Blank, onClick: undefined },
  "divider",
  { Icon: Dots, onClick: undefined, extraClass: "rotate-90" },
];
