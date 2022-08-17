import React, { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

import styles from "./VideoCard.module.css";
import RateModal from "../RateModal/RateModal";
import Moment from "moment";

export default function VideoCard(props) {
  const { item, index, showNumber } = props;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(item.rating);

  const musicVideoData = item.musicVideo;
 
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
          {showNumber && <div className={styles.titleNumber}>{index + 1}.</div>}
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
          <div className={styles.separator} />
          {/* {item.genres.map((genre, index) => {
            return (
              <div key={index} className={styles.genre}>{`${genre}${
                item.genres.length - 1 !== index ? "," : " "
              }`}</div>
            );
          })} */}
        </div>
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
        <div className={styles.ratingDate}>Rated on 12. 10. 2022.</div>
        <div className={styles.credit}>
          Director:
          <div
            className={styles.creditLink}
            onClick={() => {
              navigate(`../artist/${item.credits.director.slug}`);
            }}
          >
            {/* {item.credits.director.name} */}
          </div>
        </div>
        <div className={styles.credit}>
          Stars:
          {/* {item.credits.cast.map((cast, index) => {
            return (
              <div
                key={index}
                className={styles.creditLink}
                onClick={() => {
                  navigate(`../artist/${cast.slug}`);
                }}
              >
                {`${cast.name}${
                  item.credits.cast.length - 1 !== index ? "," : " "
                }`}
              </div>
            );
          })} */}
        </div>
        <div className={styles.numberOfVotes}>
          Votes: {musicVideoData.votes_number}
        </div>
      </div>
      <RateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userRating={userRating}
        setUserRating={setUserRating}
        ratingData={item}
        videoData={item.musicVideo}
      />
    </div>
  );
}
