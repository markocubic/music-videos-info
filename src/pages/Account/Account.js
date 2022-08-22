import React, { useContext, useEffect } from "react";
import ButtonRed from "components/common/ButtonCustom/ButtonRed";
import styles from "./Account.module.css";
import axiosInstance from "utils/axiosApi";
import { AuthContext } from "context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getArtists = async () => {
    await axiosInstance
      .get("/api/artist")
      .then((response) => {
        console.log("artist resp: ", response);
      })
      .catch((error) => {
        console.log("Something went wrong artist!", error);
      });
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.accountInfo}>
        <div className={styles.username}>{user.username}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>You are a staff member</div>
        Add a video to MusicVideos.com
        <ButtonRed
          className={styles.button}
          onClick={() => {
            navigate("../music-video-create");
          }}
        >
          Add a video
        </ButtonRed>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Your Ratings</div>
        <div>Most recently rated</div>
        <div className={styles.ratingsListWrapper}></div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Your Lists</div>
        <div>
          Share your video or celebrity picks with everyone at MusicVideos.com,
          or make it private just for you.
          <ButtonRed
            className={styles.button}
            onClick={() => {
              navigate("../list-create");
            }}
          >
            Create a list
          </ButtonRed>
        </div>
        <div className={styles.ratingsListWrapper}></div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Your Reviews</div>
        <div>
          Loved or hated a movie or TV show? Write a review and share it with
          others!
        </div>
      </div>
    </div>
  );
}
