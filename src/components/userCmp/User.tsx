"use client";
import { ChangeEvent, useState } from "react";
// Components
import Button from "../button/Button";
import PasswordInput from "../PasswordInput/PasswordInput";
import Input from "../input/Input";
// Utils
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store";
import { logout } from "@/store/user/userSlice";
import { updateUser } from "@/store/user/asyncOperations";
import { selectUser } from "@/store/selectors";
import { IUser } from "@/types/types";
// Styles
import s from "./user.module.scss";

function UserCmp() {
  const dispatch = useAppDispatch<AppDispatch>();
  const user = useAppSelector(selectUser);
  const [credentials, setCredentials] = useState<IUser>({
    email: user?.email || "",
    password: user?.password || "",
    username: user?.username || "",
  });
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleLogout = async () => {
    dispatch(logout());
  };

  const handleUserUpdate = async () => {
    dispatch(
      updateUser({
        email: credentials.email,
        password: credentials.password,
        username: credentials.username!,
      })
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={s.section}>
      <div className={s.userInfo}>
        {isEditing.username ? (
          <Input
            name="username"
            onChange={handleInputChange}
            type="text"
            value={credentials.username}
            placeholder="Username"
            onClick={() =>
              setIsEditing((prev) => ({ ...prev, username: false }))
            }
          />
        ) : (
          <div className={s.container}>
            <p className={s.text}>{credentials.username || "Username"}</p>
            <Button
              onClick={() =>
                setIsEditing((prev) => ({ ...prev, username: true }))
              }
              text="Edit"
              noIcon
              className="edit"
            />
          </div>
        )}
        {isEditing.email ? (
          <Input
            name="email"
            onChange={handleInputChange}
            type="email"
            value={user?.email}
            placeholder={user?.email}
            onClick={() => setIsEditing((prev) => ({ ...prev, email: false }))}
          />
        ) : (
          <div className={s.container}>
            <p className={s.text}>{credentials.email || "email"}</p>
            <Button
              onClick={() => setIsEditing((prev) => ({ ...prev, email: true }))}
              text="Edit"
              noIcon
              className="edit"
            />
          </div>
        )}
        <PasswordInput
          name="password"
          onChange={handleInputChange}
          value={credentials.password}
        />

        <Button
          onClick={handleUserUpdate}
          noIcon
          text="Update profile"
          className="update"
        />
      </div>
      <Button onClick={handleLogout} text="Log Out" />
    </div>
  );
}

export default UserCmp;
