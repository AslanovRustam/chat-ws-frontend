import Image from "next/image";
import Link from "next/link";
// Utils
import { ROUTES } from "@/constants/constants";
// Images
import defaultAvatar from "../../../public/images/avatarDefault.png";
import Dashboard from "../../../public/dashboard.svg";
import People from "../../../public/people.svg";
import Chat from "../../../public/chat.svg";
import Phone from "../../../public/phone.svg";
import Settings from "../../../public/settings.svg";
import Question from "../../../public/question.svg";
import Leave from "../../../public/leave.svg";
// Styles
import s from "./sidebar.module.scss";

function Sidebar() {
  return (
    <aside className={s.aside}>
      <div className={s.container}>
        <Link href={ROUTES.user}>
          <Image src={defaultAvatar} alt="avatar" className={s.avatar} />
        </Link>
        <div className={s.scrollable}>
          <ul className={s.list}>
            <li className={s.item}>
              <Link href={ROUTES.dashboard}>
                <Dashboard className={s.icon} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href={ROUTES.contacts}>
                <People className={s.icon} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href={ROUTES.chat}>
                <Chat className={s.icon} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href={ROUTES.phone}>
                <Phone className={s.icon} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href={ROUTES.settings}>
                <Settings className={s.icon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.container}>
        <ul className={s.list}>
          <li className={s.item}>
            <Link href={ROUTES.faq}>
              <Question className={s.icon} />
            </Link>
          </li>
          <li className={s.item}>
            <Leave className={s.icon} />
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
