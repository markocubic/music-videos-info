import UserListCard from "components/common/UserListCard/UserListCard";
import React from "react";
import { userLists } from "utils/data";
import styles from "./UserLists.module.css";

export default function UserLists() {
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>Your Lists</div>
        {userLists.map((item, index) => {
          return <UserListCard key={index} item={item} index={index}/>;
        })}
      </div>
    </div>
  );
}
