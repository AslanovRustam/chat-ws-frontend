"use client";
import { useState } from "react";
// Images
import Arrow from "../../../public/arrowSmall.svg";
// Utils
import { IMessage } from "@/store/message/types";
import { BASE_URL } from "@/constants/constants";
// Styles
import s from "./imagelist.module.scss";

type Props = { messages: IMessage[] };

function ImagesList({ messages }: Props) {
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
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${BASE_URL}/public${message.fileUrl}`}
                alt={message.fileName || "image preview"}
                className={s.image}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ImagesList;
