import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserListCard.module.css";
import "./overridenStylesListCard.css";
import OptionsButton from "../OptionsButton/OptionsButton";
import { AuthContext } from "context/AuthProvider";

export default function UserListCard(props) {
  const navigate = useNavigate();
  const { item, index } = props;
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`${styles.cardWrapper} ${
        index % 2 && styles.everySecondBackground
      }`}
    >
      <div
        className={styles.title}
        onClick={() => navigate(`../list/${item.id}/`)}
      >
        {user.username}'s {item.title}
      </div>
      <div>{item.musicVideos.length} items</div>
      <div className={styles.dates}>
        Modified: {item.lastModified} | Created: {item.dateCreated}
      </div>
      <div className={styles.optionsIcon}>
        <OptionsButton
          onEdit={() => {
            navigate(`../list/${item.slug}`, { state: true });
          }}
        />
      </div>
    </div>
  );
}
