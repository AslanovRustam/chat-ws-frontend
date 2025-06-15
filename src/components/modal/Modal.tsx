import type { FC, ReactNode } from "react";
import s from "./modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    return;
  };
  return (
    <div className={s.backdrop} onClick={handleModalClose}>
      {children}
    </div>
  );
};

export default Modal;
