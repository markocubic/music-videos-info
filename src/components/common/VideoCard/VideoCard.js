import React, { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

import styles from "./VideoCard.module.css";
import RateModal from "../RateModal/RateModal";
import Moment from "moment";

export default function VideoCard(props) {
  const { item, index, fromList } = props;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(item.rating);

  const musicVideoData = fromList ? item : item.musicVideo;

  return (
    <div
      className={`${styles.cardWrapper} ${
        index % 2 && styles.everySecondBackground
      }`}
    >
      <div className={styles.image}>
        <img alt="..." src={musicVideoData.image} height="200" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.titleWrapper}>
          {fromList && <div className={styles.titleNumber}>{index + 1}.</div>}
          <div
            className={styles.title}
            onClick={() => {
              navigate(`../music-video/${musicVideoData.slug}`);
            }}
          >{`${musicVideoData.title} (${Moment(
            musicVideoData.release_year
          ).format("YYYY")})`}</div>
        </div>
        <div
          className={styles.artistName}
          onClick={() => {
            navigate(`../artist/${musicVideoData.artist.slug}`);
          }}
        >
          {musicVideoData.artist.name}
        </div>
        <div className={styles.headerInfo}>
          <div>{musicVideoData.duration}</div>
        </div>
        {!fromList && (
          <div
            className={styles.rating}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <StarIcon className={styles.starIcon} />
            <div>{musicVideoData.rate_score}</div>
            {userRating && (
              <>
                <StarIcon className={styles.starIconBlue} />
                <div>{userRating}</div>
              </>
            )}
          </div>
        )}
        <div className={styles.ratingDate}>
          {Moment(item.date).format("YYYY-MM-DD")}
        </div>
        <div className={styles.credit}></div>
        <div className={styles.numberOfVotes}>
          Votes: {musicVideoData.votes_number}
        </div>
      </div>
      {!fromList && (
        <RateModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userRating={userRating}
          setUserRating={setUserRating}
          ratingData={item}
          videoData={item.musicVideo}
        />
      )}
    </div>
  );
}
