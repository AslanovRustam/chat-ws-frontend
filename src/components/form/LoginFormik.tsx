"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// Components
import Loader from "../loader/Loader";
import Devider from "../devider/Devider";
import PasswordInput from "../PasswordInput/PasswordInput";
// Utils
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store";
import { createUser, loginUser } from "@/store/user/asyncOperations";
import { selectUserLoading } from "@/store/selectors";
// Images
import Logo from "../../../public/unicorn-logo.svg";
import Google from "../../../public/google.svg";
// Styles
import styles from "./login.module.scss";

const LoginFormik = () => {
  const router = useRouter();
  const dispatch = useAppDispatch<AppDispatch>();
  const loading = useAppSelector(selectUserLoading);

  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  let initialValues = {
    email: "",
    password: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
    username: isSignUp
      ? Yup.string().required("Username is required")
      : Yup.string(),
  });

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      if (rememberMe) {
        localStorage.setItem("savedCredentials", JSON.stringify(values));
      } else {
        localStorage.removeItem("savedCredentials");
      }

      if (isSignUp) {
        const isUserCreated = await dispatch(createUser(values)).unwrap();
        if (!isUserCreated) {
          toast.error("Something went wrong");
          return;
        }
        setIsSignUp(false);
      } else {
        const resultAction = await dispatch(
          loginUser({ email: values.email, password: values.password })
        ).unwrap();
        resultAction && router.push("/chat");
      }
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("savedCredentials");
    if (saved) {
      const parsed = JSON.parse(saved);
      initialValues = { ...parsed };
      setRememberMe(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <h2 className={styles.title}>Nice to see you again</h2>

      <Formik
        enableReinitialize
        initialValues={
          rememberMe && typeof window !== "undefined"
            ? JSON.parse(
                localStorage.getItem("savedCredentials") ||
                  JSON.stringify(initialValues)
              )
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className={styles.form}>
            <label className={styles.label}>
              <span className={styles.inputTitle}>Email</span>
              <Field
                type="email"
                name="email"
                placeholder="Email or phone number"
                autoComplete={rememberMe ? "email" : "off"}
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </label>

            <label className={styles.label}>
              <span className={styles.inputTitle}>Password</span>
              <PasswordInput
                name="password"
                value={values.password}
                onChange={handleChange}
                autoComplete={rememberMe ? "current-password" : "off"}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </label>

            {isSignUp && (
              <label className={styles.label}>
                <span className={styles.inputTitle}>Name</span>
                <Field
                  type="text"
                  name="username"
                  placeholder="Type your name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />
              </label>
            )}

            {!isSignUp && (
              <div className={styles.wrapper}>
                <label className={styles.labelCheckbox}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
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
          </Form>
        )}
      </Formik>

      <Devider style={{ margin: "32px 0 32px" }} />

      <button type="button" onClick={() => {}} className={styles.buttonGoogle}>
        <Google />
        Or sign in with Google
      </button>

      <p className={styles.switcher}>
        {isSignUp ? "Have an account?" : "Don't have an account?"}
        <span onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Sign in now" : "Sign up now"}
        </span>
      </p>
    </div>
  );
};

export default LoginFormik;
