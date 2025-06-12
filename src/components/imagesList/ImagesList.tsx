"use client";
import { useState } from "react";
import Arrow from "../../../public/arrowSmall.svg";
import imageDefault from "../../../public/images/imageDefault.png";
import s from "./imagelist.module.scss";
import { IFile } from "@/types/types";
import Image from "next/image";

type Props = {};

function ImagesList({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const files: IFile[] = [
    { id: "1", name: "Content.pdf", icon: "" },
    { id: "2", name: "Branding.pdf", icon: "" },
    { id: "3", name: "Design changes.pdf", icon: "" },
    { id: "4", name: "Development.pdf", icon: "" },
    { id: "5", name: "Architecture.pdf", icon: "" },
    { id: "6", name: "Design.pdf", icon: "" },
    { id: "7", name: "Design.pdf", icon: "" },
    { id: "8", name: "Design.pdf", icon: "" },
    { id: "9", name: "Design.pdf", icon: "" },
  ];

  const toggleList = (): void => setIsOpen((prev) => !prev);
  return (
    <section className={`${s.section} ${isOpen && s.sectionOpen}`}>
      <div className={s.title} onClick={toggleList}>
        <p className={s.titleText}>
          Recent Files <span className={s.count}>({files.length})</span>
        </p>
        <Arrow className={`${s.arrowIcon} ${isOpen ? s.arrowOpen : ""}`} />
      </div>
      <ul className={`${s.list} ${isOpen ? s.expanded : ""}`}>
        {files.map((singleFile, index) => (
          <li className={s.item} key={`${index}-${singleFile.name}`}>
            <Image
              src={imageDefault}
              alt={singleFile.name}
              className={s.image}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ImagesList;
