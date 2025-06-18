import { CSSProperties } from "react";
// Utils
import { STATUS } from "@/constants/constants";
import { useAppSelector } from "@/store/hooks";
import { selectParticipants } from "@/store/selectors";
// Styles
import s from "./userListTitle.module.scss";

type Props = { status?: string };

function UserListTitle({ status = STATUS.active }: Props) {
  const participants = useAppSelector(selectParticipants);

  const participantsNames = participants?.map(
    (participant) => participant.username
  );

  return (
    <>
      <div className={s.name}>
        <span>{participantsNames?.join(", ")}</span>
      </div>
      <p
        className={s.status}
        style={{ "--statusColor": status } as CSSProperties}
      >
        {status === STATUS.active ? "Active Now" : "Inactive"}
      </p>
    </>
  );
}

export default UserListTitle;
