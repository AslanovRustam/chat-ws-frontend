import { CSSProperties } from "react";
import styles from "./devider.module.scss";

type Props = { style?: CSSProperties };

export default function Devider({ style }: Props) {
  return <div className={styles.container} style={style}></div>;
}
