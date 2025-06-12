import Image from "next/image";
import Link from "next/link";
// Components
import LoginFormik from "../form/LoginFormik";
// Images
import Github from "../../../public/github.svg";
import start from "../../../public/images/startScreen.png";
// Styles
import styles from "./signin.module.scss";

export default function SignIn() {
  return (
    <section className={styles.container}>
      <Image src={start} alt="the boat" className={styles.image} />
      <div className={styles.loginContainer}>
        <LoginFormik />
        <div className={styles.info}>
          <Link
            href="https://github.com/AslanovRustam"
            target="_blank"
            className={styles.link}
          >
            <Github className={styles.icon} />
            GitHub
          </Link>
          <p>©Created 2025</p>
        </div>
      </div>
    </section>
  );
}
