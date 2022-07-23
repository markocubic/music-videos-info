import { TextField } from "@mui/material";
import React from "react";
import styles from "./TextFieldWrapper.module.css";
import "./overridenStylesTextField.css";

export default function TextFieldWrapper(props) {
  const {id, name, label, value, onChange, error, helperText, type, stylesClassName} = props;
  return (
    <div className={`textFieldOverride ${stylesClassName} ${styles.textField}`}>
      <TextField
        fullWidth
        id={id}
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
      />
    </div>
  );
}
