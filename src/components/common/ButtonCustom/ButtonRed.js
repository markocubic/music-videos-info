import React from "react";
import styles from "./ButtonRed.module.css";

export default function ButtonRed(props) {
  const { className, children, onClick } = props;

  return (
    <div className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
