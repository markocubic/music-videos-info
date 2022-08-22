import React, { useContext, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Modal from "@mui/material/Modal";

import styles from "./RateModal.module.css";
import axiosInstance from "utils/axiosApi";
import { AuthContext } from "context/AuthProvider";

export default function RateModal(props) {
  const {
    isModalOpen,
    setIsModalOpen,
    userRating,
    setUserRating,
    ratingData,
    videoData,
  } = props;

  const { user } = useContext(AuthContext);
  const starsArr = 10;
  const [newRating, setNewRating] = useState(userRating);

  const submitRating = async () => {
    if (userRating) {
      await axiosInstance
        .put(`/api/rating-update/${ratingData.id}/`, {
          user: user.user_id,
          musicVideo: 3,
          rating: newRating,
          date: "2013-06-23T00:00:00Z", //popravi date
        })
        .then((response) => {
          console.log("updateRating resp: ", response);
          setUserRating(newRating);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log("Something went wrong updateRating!", error);
        });
    } else {
      await axiosInstance
        .post(`/api/rating/`, {
          user: user.user_id,
          musicVideo: videoData.id,
          rating: newRating,
          date: "2013-06-23", //popravi date
        })
        .then((response) => {
          console.log("addRating resp: ", response);
          setUserRating(newRating);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log("Something went wrong addRating!", error);
        });
    }
  };

  const deleteRating = async () => {
    if (userRating) {
      await axiosInstance
        .delete(`/api/rating-update/${ratingData.id}/`)
        .then((response) => {
          console.log("deleteRating resp: ", response);
          setUserRating(undefined);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log("Something went wrong deleteRating!", error);
        });
    } else {
      setNewRating(undefined);
      setIsModalOpen(false);
    }
  };

  const renderStarsList = () => {
    return (
      <div className={styles.starsList}>
        {[...Array(starsArr)].map((star, index) => {
          return index + 1 <= newRating ? (
            <StarIcon
              key={index}
              className={styles.starIcon}
              onClick={() => {
                setNewRating(index + 1);
              }}
            />
          ) : (
            <StarOutlineIcon
              key={index}
              className={styles.starIcon}
              onClick={() => {
                setNewRating(index + 1);
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
          {newRating ? (
            <div className={styles.userRating}>{newRating}</div>
          ) : (
            <div className={styles.userRating}>?</div>
          )}
        </div>
        <div className={styles.videoName}>{videoData.title}</div>
        {renderStarsList()}
        <div
          className={styles.confirmRatingButton}
          onClick={() => submitRating()}
        >
          Rate
        </div>
        {newRating && (
          <div className={styles.removeRating} onClick={() => deleteRating()}>
            Remove rating
          </div>
        )}
      </div>
    </Modal>
  );
}
