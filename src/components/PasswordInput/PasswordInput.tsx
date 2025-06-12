"use client";
import { useState, ChangeEvent } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import styles from "./passwordInput.module.scss";

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder = "Enter password",
  autoComplete = "off",
  className = "",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (): void => setShowPassword((prev) => !prev);

  return (
    <div className={styles.group}>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${styles.input} ${className}`}
      />
      <div className={styles.eye} onClick={togglePassword}>
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </div>
    </div>
  );
}
