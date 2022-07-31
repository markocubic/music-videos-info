import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Modal from "@mui/material/Modal";

import styles from "./RateModal.module.css";

export default function RateModal(props) {
  const { item, isModalOpen, setIsModalOpen, userRating, setUserRating } =
    props;
  const starsArr = 10;
  const renderStarsList = () => {
    return (
      <div className={styles.starsList}>
        {[...Array(starsArr)].map((star, index) => {
          return index + 1 <= userRating ? (
            <StarIcon
              key={index}
              className={styles.starIcon}
              onClick={() => {
                setUserRating(index + 1);
              }}
            />
          ) : (
            <StarOutlineIcon
              key={index}
              className={styles.starIcon}
              onClick={() => {
                setUserRating(index + 1);
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.starIconWrapper}>
          <StarIcon className={styles.starIconHeader} />
          {userRating ? (
            <div className={styles.userRating}>{userRating}</div>
          ) : (
            <div className={styles.userRating}>?</div>
          )}
        </div>
        <div className={styles.videoName}>{item.title}</div>
        {renderStarsList()}
        {userRating && <div className={styles.removeRating}>Remove rating</div>}
      </div>
    </Modal>
  );
}
