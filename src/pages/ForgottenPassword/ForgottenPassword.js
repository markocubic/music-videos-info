import { useFormik } from "formik";
import React from "react";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import styles from "./ForgottenPassword.module.css";
import ButtonRed from "components/common/ButtonCustom/ButtonRed";

const ValidationSchema = Yup.object().shape({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function ForgottenPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.title}>
        Let's find your MusicVideos.com account
      </div>
      <div className={styles.subtitle}>What's your email address?</div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
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
        <ButtonRed className={styles.button}>Send code</ButtonRed>
      </form>
    </div>
  );
}
