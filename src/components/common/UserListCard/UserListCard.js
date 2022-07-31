import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserListCard.module.css";
import "./overridenStylesListCard.css";
import OptionsButton from "../OptionsButton/OptionsButton";

export default function UserListCard(props) {
  const navigate = useNavigate();
  const { item, index } = props;
  const accName = "AccountName";
  return (
    <div
      className={`${styles.cardWrapper} ${
        index % 2 && styles.everySecondBackground
      }`}
    >
      <div
        className={styles.title}
        onClick={() => navigate(`../list/${item.slug}`)}
      >
        {accName}'s {item.name}
      </div>
      <div>{item.list.length} items</div>
      <div className={styles.dates}>
        Modified: {item.lastModified} | Created: {item.dateCreated}
      </div>
      <div className={styles.optionsIcon}>
        <OptionsButton onEdit={() => {navigate(`../list/${item.slug}`)}}/>
      </div>
    </div>
  );
}
