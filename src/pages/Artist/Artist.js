import LinkRowArtist from "components/common/LinkRowArtist/LinkRowArtist";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "utils/axiosApi";
import { ARTIST_CHOICES } from "utils/constants";

import styles from "./Artist.module.css";

export default function Artist() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isBand, setIsBand] = useState(false);
  const [videographyList, setVideographyList] = useState([]);

  const findVidegraphy = useCallback(async () => {
    await axiosInstance
      .get(`/api/videography/${slug}/`)
      .then((response) => {
        console.log("findVidegraphy resp: ", response);
        setVideographyList(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong findVidegraphy!", error);
      });
  }, [slug]);

  const getArtistData = useCallback(async () => {
    setIsLoading(true);
    await axiosInstance
      .get(`/api/artist/${slug}/`)
      .then((response) => {
        console.log("getArtistData resp: ", response);
        setArtistData(response.data);
        findVidegraphy();
      })
      .catch((error) => {
        console.log("Something went wrong getArtistData!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug, findVidegraphy]);

  useEffect(() => {
    getArtistData();
  }, [getArtistData]);

  const renderVideographyList = () => {
    return videographyList.map((video, index) => {
      return (
        <div
          className={`
            ${styles.videographyCardWrapper}
            ${index % 2 && styles.everySecondBackground}
          `}
          key={index}
        >
          <div
            className={styles.videographyImageWrapper}
            onClick={() => {
              navigate(`../music-video/${video.slug}`);
            }}
          >
            <img
              alt="..."
              src={video.image}
              className={styles.videographyImage}
            />
          </div>
          <div>
            <div
              className={styles.cardTitle}
              onClick={() => {
                navigate(`../music-video/${video.slug}`);
              }}
            >
              {video.title}
            </div>
            <div className={styles.cardInfo}>{video.release_year}</div>
            <div className={styles.cardInfo}>Album: {video.album}</div>
          </div>
        </div>
      );
    });
  };

  if (isLoading || !artistData) {
    return;
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{artistData.name}</div>
          <div className={styles.topContentWrapper}>
            <div className={styles.imageWrapper}>
              <img alt="..." src={artistData.image} className={styles.image} />
            </div>
            <div className={styles.description}>{artistData.description}</div>
          </div>

          <div className={styles.midContentWrapper}>
            <LinkRowArtist
              title={
                artistData.type === ARTIST_CHOICES.band ? "Formed:" : "Born:"
              }
              item={artistData.birth}
              noLink
            />
            <div className={styles.videographyWrapper}>
              <div className={styles.smallTitle}>Videography: </div>
              {renderVideographyList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
