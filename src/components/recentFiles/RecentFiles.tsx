"use client";
import { useState } from "react";
import Arrow from "../../../public/arrowSmall.svg";
import Blank from "../../../public/blank.svg";
import Dots from "../../../public/dots.svg";
import { IFile } from "@/types/types";
import s from "./recentFiles.module.scss";

type Props = {};

function RecentFiles({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const files: IFile[] = [
    { id: "1", name: "Content.pdf", icon: "" },
    { id: "2", name: "Branding.pdf", icon: "" },
    { id: "3", name: "Design changes.pdf", icon: "" },
    { id: "4", name: "Development.pdf", icon: "" },
    { id: "5", name: "Architecture.pdf", icon: "" },
    { id: "6", name: "Design.pdf", icon: "" },
    { id: "6", name: "Design.pdf", icon: "" },
    { id: "6", name: "Design.pdf", icon: "" },
    { id: "6", name: "Design.pdf", icon: "" },
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
            <div className={s.file}>
              <Blank className={s.fileType} />
              <p className={s.fileName}>{singleFile.name}</p>
            </div>
            <Dots className={s.settings} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentFiles;
