import { CSSProperties } from "react";
// Utils
import { STATUS } from "@/constants/constants";
import { useAppSelector } from "@/store/hooks";
import { selectParticipants } from "@/store/selectors";
import { ISocketUser } from "@/types/types";
// Styles
import s from "./userListTitle.module.scss";

type Props = {
  status?: string;
  onlineUsers: ISocketUser[] | null;
  handleCall: (user: ISocketUser) => void;
};

function UserListTitle({
  status = STATUS.active,
  onlineUsers,
  handleCall,
}: Props) {
  const participants = useAppSelector(selectParticipants);

  const participantsNames = participants?.map(
    (participant) => participant.username
  );
  console.log(onlineUsers);

  return (
    <>
      <ul className={s.name}>
        {onlineUsers?.map((user) => (
          <li key={user.userId}>
            <button type="button" onClick={() => handleCall(user)}>
              {user.userName}
            </button>
          </li>
        ))}
      </ul>
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
