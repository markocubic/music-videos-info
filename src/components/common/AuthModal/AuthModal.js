import React, { useContext, useState, useEffect } from "react";

import styles from "./AuthModal.module.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AuthContext } from "context/AuthProvider";
import jwt_decode from "jwt-decode";
import { setUserToken } from "services/userService";
import axiosInstance, { axiosInstancePrivate } from "utils/axiosApi";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const ValidationSchemaSignIn = Yup.object().shape({
  username: Yup.string("Enter your username").required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegEx,
      "8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case"
    ),
});

const ValidationSchemaSignUp = Yup.object().shape({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  username: Yup.string("Enter your username").required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegEx,
      "8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case"
    ),
});

export default function AuthModal(props) {
  const { isModalOpen, isSignIn, setIsSignIn } = props;
  const { setAuthTokens, setUser, setIsSignInOpen } = useContext(AuthContext);
  const [validationSchema, setValidationSchema] = useState();
  const [loginError, setLoginError] = useState();
  const [signupError, setSignupError] = useState({ email: "", username: "" });

  useEffect(() => {
    if (isSignIn) {
      setValidationSchema(ValidationSchemaSignIn);
    } else {
      setValidationSchema(ValidationSchemaSignUp);
    }
  }, [isSignIn]);

  const login = async (username, password) => {
    await axiosInstancePrivate
      .post("/api/token/", { username: username, password: password })
      .then((response) => {
        setAuthTokens(response.data);
        setUserToken(JSON.stringify(response.data));
        setUser(jwt_decode(response.data.access));
        setIsSignInOpen(false);
        setLoginError("");
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
        setLoginError(error.response.data.detail);
      });
  };

  const signup = async (email, username, password) => {
    await axiosInstance
      .post("/api/register/", {
        email: email,
        username: username,
        password: password,
      })
      .then(() => {
        setIsSignIn(true);
        setSignupError({ email: "", username: "" });
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        setSignupError(err.response.data);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isSignIn) {
        login(values.username, values.password);
      } else {
        signup(values.email, values.username, values.password);
      }
    },
  });

  const renderFields = () => {
    return (
      <>
        {!isSignIn && (
          <div className={styles.textField}>
            <TextFieldWrapper
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        )}
        <div className={styles.textField}>
          <TextFieldWrapper
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
        <div className={styles.textField}>
          <TextFieldWrapper
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
      </>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        formik.resetForm();
        setIsSignInOpen(false);
        setSignupError({ email: "", username: "" });
        setLoginError("");
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.modalWrapper}>
        <div
          className={styles.closeIcon}
          onClick={() => {
            formik.resetForm();
            setIsSignInOpen(false);
          }}
        >
          <CloseIcon />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalIcon}>
            <MusicNoteIcon className={styles.logoIcon} />
          </div>

          <div className={styles.modalTitle}>Welcome to MusicVideos.com</div>
          <div className={styles.modalForm}>
            <div className={styles.error}>{loginError}</div>
            <div className={styles.error}>{signupError?.email}</div>
            <div className={styles.error}>{signupError?.username}</div>
            <form onSubmit={formik.handleSubmit}>{renderFields()}</form>
          </div>
          <ButtonCustom
            className={styles.modalButton}
            onClick={formik.handleSubmit}
          >
            {isSignIn ? "Log In" : "Sign Up"}
          </ButtonCustom>
          {!isSignIn && (
            <div className={styles.termsText}>
              By continuing, you agree to{" "}
              <b className={styles.boldText}>MusicVideo.com</b>'s <br />
              Terms of Service and acknowledge that you've <br />
              read our <b className={styles.boldText}>Privacy Policy</b>
            </div>
          )}
          <div className={styles.separatorLine} />
          <div
            className={styles.dontHaveAccount}
            onClick={() => {
              setLoginError("");
              setSignupError({ email: "", username: "" });
              isSignIn ? setIsSignIn(false) : setIsSignIn(true);
            }}
          >
            {isSignIn
              ? "Don't have an account yet? Sign up"
              : "Already a member? Log In"}
          </div>
        </div>
      </div>
    </Modal>
  );
}
