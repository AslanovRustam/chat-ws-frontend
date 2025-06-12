import Image from "next/image";
// Components
import RecentFiles from "../recentFiles/RecentFiles";
import ImagesList from "../imagesList/ImagesList";
import Button from "../button/Button";
// Images
import avatar from "../../../public/images/Ellipse 1.png";
import Cross from "../../../public/cross.svg";
// Styles
import s from "./userinfo.module.scss";

type Props = { close: () => void };

function UserInfo({ close }: Props) {
  const name = "Robert Fox";
  return (
    <section className={s.section}>
      <div className={s.crossContainer} onClick={close}>
        <Cross className={s.icon} />
      </div>
      <div className={s.userContainer}>
        <Image src={avatar} alt="avatar" className={s.avatar} />
        <p className={s.name}>{name}</p>
        <p className={s.id}>@robert.fox12</p>
      </div>
      <label className={s.labelCheckbox}>
        <span className={s.text}>Notifications</span>
        <input type="checkbox" className={s.checkbox} />
        <span className={s.customCheckbox}></span>
      </label>
      <RecentFiles />
      <ImagesList />
      <Button text={`Block ${name}`} />
    </section>
  );
}

export default UserInfo;
