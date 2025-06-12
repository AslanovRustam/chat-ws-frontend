import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
// Styles
import s from "./emojiPicker.module.scss";

type Props = {
  setInput: Dispatch<SetStateAction<string>>;
  onClickOutside: () => void;
};

function EmojiPickerCmp({ setInput, onClickOutside }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelect = (emoji: any) => {
    setInput((prev) => prev + emoji.native);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className={s.emojiWrapper} ref={ref}>
      <Picker data={data} onEmojiSelect={handleSelect} theme="light" />
    </div>
  );
}

export default EmojiPickerCmp;
