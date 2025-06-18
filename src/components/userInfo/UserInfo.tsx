import Image from "next/image";
// Components
import RecentFiles from "../recentFiles/RecentFiles";
import ImagesList from "../imagesList/ImagesList";
import Button from "../button/Button";
// Images
import avatar from "../../../public/images/avatarDefault.png";
import Cross from "../../../public/cross.svg";
// Utils
import { useAppSelector } from "@/store/hooks";
import { selectedMessages, selectParticipants } from "@/store/selectors";
import { groupMessages } from "@/utils/groupMessages";
// Styles
import s from "./userinfo.module.scss";

type Props = {
  close: () => void;
  selectedUserId: string;
};

function UserInfo({ close, selectedUserId }: Props) {
  const participants = useAppSelector(selectParticipants);
  const messages = useAppSelector(selectedMessages);

  const { files, images } = groupMessages(messages);

  const userInfo = participants?.find(
    (participant) => participant.id === selectedUserId
  );

  return (
    <section className={s.section}>
      <div className={s.crossContainer} onClick={close}>
        <Cross className={s.icon} />
      </div>
      <div className={s.userContainer}>
        <Image src={avatar} alt="avatar" className={s.avatar} />
        <p className={s.name}>{userInfo?.username}</p>
        <p className={s.id}>{userInfo?.email}</p>
      </div>
      <label className={s.labelCheckbox}>
        <span className={s.text}>Notifications</span>
        <input type="checkbox" className={s.checkbox} />
        <span className={s.customCheckbox}></span>
      </label>
      <RecentFiles messages={files} />
      <ImagesList messages={images} />
      <Button text={`Block ${userInfo?.username}`} />
    </section>
  );
}

export default UserInfo;
