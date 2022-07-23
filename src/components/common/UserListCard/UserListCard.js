import React from "react";
import styles from "./UserListCard.module.css";

export default function UserListCard(props) {
  const { item, index } = props;
  const accName = "AccountName";
  console.log('index: ', index)
  return (
    <div
      className={`${styles.cardWrapper} ${
        index % 2 && styles.everySecondBackground
      }`}
    >
      <div className={styles.title}>{accName}'s {item.name}</div>
      <div>{item.list.length} items</div>
      <div className={styles.dates}>Modified: {item.lastModified} | Created: {item.dateCreated}</div>
    </div>
  );
}
