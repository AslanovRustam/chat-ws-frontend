"use client";
import { useState } from "react";
// Images
import Arrow from "../../../public/arrowSmall.svg";
import Blank from "../../../public/blank.svg";
import Dots from "../../../public/dots.svg";
// Utils
import { IMessage } from "@/store/message/types";
import { BASE_URL } from "@/constants/constants";
// Styles
import s from "./recentFiles.module.scss";

type Props = { messages: IMessage[] };

function RecentFiles({ messages }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = (): void => setIsOpen((prev) => !prev);

  return (
    <section className={`${s.section} ${isOpen && s.sectionOpen}`}>
      <div className={s.title} onClick={toggleList}>
        <p className={s.titleText}>
          Recent Files <span className={s.count}>({messages.length})</span>
        </p>
        <Arrow className={`${s.arrowIcon} ${isOpen ? s.arrowOpen : ""}`} />
      </div>
      <ul className={`${s.list} ${isOpen ? s.expanded : ""}`}>
        {messages.map((message, index) => (
          <li className={s.item} key={`${index}-${message.fileName}`}>
            <a
              href={`${BASE_URL}/public${message.fileUrl}`}
              download={message.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className={s.file}
            >
              <Blank className={s.fileType} />
              <p className={s.fileName}>{message.fileName}</p>
            </a>
            <Dots className={s.settings} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentFiles;
