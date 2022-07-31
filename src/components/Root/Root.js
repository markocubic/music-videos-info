import React from "react";
import styles from "./Root.module.css";

export default function Root(props) {
  const { children } = props;
  return <div className={styles.root}>{children}</div>;
}
