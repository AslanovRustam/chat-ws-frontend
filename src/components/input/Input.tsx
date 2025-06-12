import React, { ChangeEvent, MouseEvent } from "react";
import styles from "./input.module.scss";

interface Props {
  type: string;
  name: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onClick?: (
    e: MouseEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
  ) => void;
}

function Input({
  type,
  name,
  value = "",
  onChange,
  placeholder,
  className = "",
  onClick,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
      onBlur={onClick}
    />
  );
}

export default Input;
