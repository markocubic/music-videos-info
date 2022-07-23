import React from "react";

import styles from "./AuthModal.module.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import ButtonRed from "../ButtonCustom/ButtonRed";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const ValidationSchema = Yup.object().shape({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegEx,
      "8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case"
    ),
});

export default function AuthModal(props) {
  const { isModalOpen, setIsModalOpen, isSignIn, setIsSignIn } = props;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        formik.resetForm();
        setIsModalOpen(false);
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
            setIsModalOpen(false);
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
            <form onSubmit={formik.handleSubmit}>
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
              <div className={styles.textField}>
                <TextFieldWrapper
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
            </form>
            {isSignIn && (
              <div
                className={styles.forgotPasswordText}
                onClick={() => {
                  setIsModalOpen(false);
                  navigate("../forgotten-password");
                }}
              >
                Forgotten your password?
              </div>
            )}
          </div>
          <ButtonRed className={styles.modalButton} onClick={formik.handleSubmit}>
            {isSignIn ? "Log In" : "Sign Up"}
          </ButtonRed>
          <div className={styles.termsText}>
            By continuing, you agree to{" "}
            <b className={styles.boldText}>MusicVideo.com</b>'s <br />
            Terms of Service and acknowledge that you've <br />
            read our <b className={styles.boldText}>Privacy Policy</b>
          </div>
          <div className={styles.separatorLine} />
          <div
            className={styles.dontHaveAccount}
            onClick={() => {
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
