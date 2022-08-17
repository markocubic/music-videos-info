import LinkRowArtist from "components/common/LinkRowArtist/LinkRowArtist";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "utils/axiosApi";
import { artist, band, musicVideos } from "utils/data";

import styles from "./Artist.module.css";

export default function Artist(props) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isBand, setIsBand] = useState(false);
  const [videographyList, setVideographyList] = useState([]);

  const findVidegraphy = (item) => {
    let list = [];
    musicVideos.forEach((video) => {
      if (video.artist === item) {
        list.push(video);
      } else if (video.credits.director === item) {
        list.push(video);
      } else {
        video.credits.cast.forEach((member) => {
          if (member === item) {
            list.push(video);
          }
        });
      }
    });
    setVideographyList(list);
  };

  const geArtistData = useCallback(async () => {
    setIsLoading(true);
    await axiosInstance
      .get(`/api/artist/${slug}/`) //stavit slug
      .then((response) => {
        console.log("geArtistData resp: ", response);
        setArtistData(response.data);
        findVidegraphy(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong geArtistData!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    geArtistData();
  }, [geArtistData]);

  const renderVideographyList = () => {
    return videographyList.map((video, index) => {
      return (
        <div
          className={`
            ${styles.videographyCardWrapper}
            ${index % 2 && styles.everySecondBackground}
          `}
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
            <div>{video.releaseYear}</div>
            {/* <div>as something</div> */}
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
              title={isBand ? "Formed:" : "Born:"}
              item={artistData.birth}
              noLink
            />
            {isBand && (
              <LinkRowArtist title="Members:" item={artistData.members} />
            )}
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
