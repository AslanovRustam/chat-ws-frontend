import clsx from "clsx";
import s from "./messageform.module.scss";

type Props = {
  IconComponent: React.FC<{ className?: string }>;
  onClick?: () => void;
  extraClass?: string;
  isRecording: boolean | undefined;
};

export default function RenderButton({
  IconComponent,
  onClick,
  extraClass,
  isRecording,
}: Props) {
  return (
    <li className={s.item}>
      <button
        type="button"
        onClick={onClick}
        className={clsx(s.button, {
          [s.recording]: isRecording,
        })}
      >
        <IconComponent className={clsx(s.icon, extraClass)} />
      </button>
    </li>
  );
}
