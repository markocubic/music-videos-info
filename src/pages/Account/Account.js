import React from "react";
import ButtonRed from "components/common/ButtonCustom/ButtonRed";
import styles from "./Account.module.css";

export default function Account() {

  return (
    <div className={styles.root}>
      <div className={styles.accountInfo}>
        <div className={styles.username}>Username123</div>
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
          <ButtonRed className={styles.button}>Create a list</ButtonRed>
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
