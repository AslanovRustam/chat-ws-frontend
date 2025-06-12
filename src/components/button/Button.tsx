import Deny from "../../../public/deny.svg";
import s from "./button.module.scss";

type Props = {
  onClick?: () => Promise<void> | void;
  text: string;
  type?: "button" | "submit";
  noIcon?: boolean;
  className?: string;
};

export default function Button({
  onClick,
  text,
  type = "button",
  noIcon,
  className,
}: Props) {
  return (
    <button
      type={type}
      className={`${s.button} ${className && s[className]}`}
      onClick={onClick}
    >
      {!noIcon && <Deny className={s.blok} />}
      <span className={s.blokText}>{text}</span>
    </button>
  );
}
