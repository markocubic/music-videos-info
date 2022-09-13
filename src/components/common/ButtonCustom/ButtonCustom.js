import React from "react";
import styles from "./ButtonCustom.module.css";

export default function ButtonCustom(props) {
  const { className, children, onClick } = props;

  return (
    <div className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
