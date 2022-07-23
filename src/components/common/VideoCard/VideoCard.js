import React from "react";
import StarIcon from "@mui/icons-material/Star";
import styles from "./VideoCard.module.css";

export default function VideoCard(props) {
  const { item, index } = props;
  return (
    <div
      className={`${styles.cardWrapper} ${
        index % 2 && styles.everySecondBackground
      }`}
    >
      <div className={styles.image}>
        <img alt="..." src={item.musicVideo.image} height="200" />
      </div>
      <div className={styles.cardContent}>
        <div
          className={styles.title}
        >{`${item.musicVideo.title} (${item.musicVideo.releaseYear})`}</div>
        <div className={styles.artistName}>{item.musicVideo.artist}</div>
        <div className={styles.headerInfo}>
          <div>{item.musicVideo.duration}</div>
          <div className={styles.separator} />
          {item.musicVideo.genres.map((genre, index) => {
            return (
              <div key={index} className={styles.genre}>{`${genre}${
                item.musicVideo.genres.length - 1 !== index ? "," : " "
              }`}</div>
            );
          })}
        </div>
        <div className={styles.rating}>
          <StarIcon className={styles.starIcon} />
          <div>{item.userRating}</div>
        </div>
        <div className={styles.ratingDate}>Rated on 12. 10. 2022.</div>
        <div className={styles.credit}>
          Director:
          <div className={styles.creditLink}>
            {item.musicVideo.credits.director}
          </div>
        </div>
        <div className={styles.credit}>
          Stars:
          {item.musicVideo.credits.cast.map((cast, index) => {
            return (
              <div key={index} className={styles.creditLink}>
                {`${cast.name}${
                  item.musicVideo.credits.cast.length - 1 !== index ? "," : " "
                }`}
              </div>
            );
          })}
        </div>
        <div className={styles.numberOfVotes}>
          Votes: {item.musicVideo.votesNumber}
        </div>
      </div>
    </div>
  );
}
