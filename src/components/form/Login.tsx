"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// Components
import Loader from "../loader/Loader";
import Devider from "../devider/Devider";
import PasswordInput from "../PasswordInput/PasswordInput";
import Input from "../input/Input";
// Utils
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IUser } from "@/types/types";
import { AppDispatch } from "@/store";
import { createUser, loginUser } from "@/store/user/asyncOperations";
import { selectUserLoading } from "@/store/selectors";
// Images
import Logo from "../../../public/unicorn-logo.svg";
import Google from "../../../public/google.svg";
// Styles
import styles from "./login.module.scss";

type Props = {};

export default function Login({}: Props) {
  const router = useRouter();
  const [credentials, setCredentials] = useState<IUser>({
    email: "",
    password: "",
    username: "",
  });
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [_, setError] = useState<string | null>(null);
  const loading = useAppSelector(selectUserLoading);

  const dispatch = useAppDispatch<AppDispatch>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const toggleSignup = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleAutocomplete = () => {
    setRememberMe(!rememberMe);
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("savedCredentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("savedCredentials");
    }

    const isLoginEmpty =
      credentials.email.trim() === "" || credentials.password.trim() === "";

    if (isLoginEmpty) {
      setError("Please fill in all fields before submitting.");
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    try {
      const resultAction = await dispatch(
        loginUser({ email: credentials.email, password: credentials.password })
      ).unwrap();
      resultAction && router.push("/chat");
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = Object.values(credentials).some(
      (value) => value.trim() === ""
    );
    if (isEmpty) {
      setError("Please fill in all fields before submitting.");
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    try {
      const isUserCreated = await dispatch(
        createUser(
          credentials as { email: string; password: string; username: string }
        )
      ).unwrap();
      if (!isUserCreated) return toast.error("Something went wrong");

      setIsSignUp(false);
      return;
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleSubmitGoogle = () => {};

  useEffect(() => {
    const savedCredentials = localStorage.getItem("savedCredentials");
    if (savedCredentials) {
      const parsed = JSON.parse(savedCredentials);
      setCredentials(parsed);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <h2 className={styles.title}>Nice to see you again</h2>
      <form
        className={styles.form}
        onSubmit={isSignUp ? handleRegisterSubmit : handleLoginSubmit}
      >
        <label className={styles.label}>
          <span className={styles.inputTitle}>Email</span>
          <Input
            name="email"
            onChange={handleInputChange}
            type="email"
            value={credentials.email}
            placeholder="Email or phone number"
          />
        </label>
        <label className={styles.label}>
          <span className={styles.inputTitle}>Password</span>
          <PasswordInput
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            autoComplete={rememberMe ? "current-password" : "off"}
          />
        </label>
        {isSignUp ? (
          <label className={styles.label}>
            <span className={styles.inputTitle}>Name</span>
            <Input
              name="username"
              onChange={handleInputChange}
              type="username"
              value={credentials.username}
              placeholder="Type your name"
            />
          </label>
        ) : (
          <div className={styles.wrapper}>
            <label className={styles.labelCheckbox}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={rememberMe}
                onChange={toggleAutocomplete}
              />
              <span className={styles.customCheckbox}></span>
              <span className={styles.text}>Remember me</span>
            </label>
            <p className={styles.forgot}>Forgot password?</p>
          </div>
        )}

        <button type="submit" className={styles.button} disabled={loading}>
          <span className={styles.buttonText}>
            {isSignUp ? "Sign up" : "Sign in"}
          </span>
          {loading && <Loader color="white" size={20} />}
        </button>
      </form>
      <Devider style={{ margin: "32px 0 32px" }} />
      <button
        type="button"
        onClick={handleSubmitGoogle}
        className={styles.buttonGoogle}
      >
        <Google />
        Or sign in with Google
      </button>
      <p className={styles.switcher}>
        {isSignUp ? "Have an account?" : "Dont have an account?"}
        <span onClick={toggleSignup}>
          {isSignUp ? "Sign in now" : "Sign up now"}
        </span>
      </p>
    </div>
  );
}
