import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserListCard.module.css";
import "./overridenStylesListCard.css";
import OptionsButton from "../OptionsButton/OptionsButton";
import axiosInstance from "utils/axiosApi";
import Moment from "moment";

export default function UserListCard(props) {
  const navigate = useNavigate();
  const { item, index, getLists } = props;

  const deleteList = async () => {
    await axiosInstance
      .delete(`/api/video-lists/${item.slug}/`)
      .then((response) => {
        console.log("deleteList resp: ", response);
        getLists();
      })
      .catch((error) => {
        console.log("Something went wrong deleteList!", error);
      })
  };

  return (
    <div
      className={`${styles.cardWrapper} ${
        index % 2 && styles.everySecondBackground
      }`}
    >
      <div
        className={styles.title}
        onClick={() => navigate(`../list/${item.slug}/`)}
      >
        {item.title}
      </div>
      <div>{item.musicVideos.length} videos</div>
      <div className={styles.dates}>
        Modified: {Moment(item.date_updated).format("YYYY-MM-DD")} | Created: {Moment(item.date_created).format("YYYY-MM-DD")}
      </div>
      <div className={styles.optionsIcon}>
        <OptionsButton
          onEdit={() => {
            navigate(`../list/${item.slug}`, { state: true });
          }}
          onDelete={() => {
            deleteList();
          }}
        />
      </div>
    </div>
  );
}
