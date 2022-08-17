import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import styles from "./MusicVideo.module.css";
import RateModal from "components/common/RateModal/RateModal";
import LinkRowArtist from "components/common/LinkRowArtist/LinkRowArtist";
import { AuthContext } from "context/AuthProvider";
import axiosInstance from "utils/axiosApi";

export default function MusicVideo() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user, setIsSignInOpen } = useContext(AuthContext);

  const [videoData, setVideoData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState();
  const [userRatingData, setUserRatingData] = useState();

  const getVideoData = useCallback(async () => {
    await axiosInstance
      .get(`/api/music-video/${slug}/`) //stavit slug
      .then((response) => {
        console.log("getVideoData resp: ", response);
        setVideoData(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong getVideoData!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  const getVideoAndRatingData = useCallback(async () => {
    await axiosInstance
      .get(`/api/rating/${user.user_id}/1/`) //stavit slug
      .then((response) => {
        console.log("getVideoAndRatingData resp: ", response);
        if (response.data.rating === null) {
          getVideoData();
        }
        setUserRatingData(response.data);
        setUserRating(response.data.rating);
        setVideoData(response.data.musicVideo);
      })
      .catch((error) => {
        console.log("Something went wrong getVideoAndRatingData!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, getVideoData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      getVideoAndRatingData();
    } else {
      getVideoData();
    }
    setIsLoading(false);
  }, [user, slug, getVideoAndRatingData, getVideoData, userRating]);

  const renderVideoRatings = () => {
    return (
      <div className={styles.videoRatingsWrapper}>
        <div className={styles.ratingWrapper}>
          <div className={styles.ratingTitle}>VIDEO RATING</div>
          <div className={styles.ratingIconWrapper}>
            <StarIcon className={styles.starIcon} />
            <div className={styles.ratingScoreAndNumberWrapper}>
              <div className={styles.rating}>
                <div className={styles.rateScore}>{videoData.rate_score}</div>/
                <div className={styles.fromTen}>10</div>
              </div>
              <div className={styles.videoVotesNumber}>
                {videoData.votes_number}
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.userRatingWrapper}
          onClick={() => {
            if (user) {
              setIsModalOpen(true);
            } else {
              setIsSignInOpen(true);
            }
          }}
        >
          <div className={styles.ratingTitle}>YOUR RATING</div>
          <div className={styles.userRatingFlexRowWrapper}>
            {userRating ? (
              <>
                <StarIcon className={styles.starIconBlue} />
                <div className={styles.userRatingText}>{userRating}</div>
                <div className={styles.rateSlash}>/</div>
                <div className={styles.fromTenUser}>10</div>
              </>
            ) : (
              <>
                <StarOutlineIcon className={styles.starOutlineIcon} />
                <div className={styles.rateText}>RATE</div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className={styles.infoWrapper}>
        {/* <LinkRowArtist title="Artist:" item={videoData.artist} /> */}
        <LinkRowArtist title="Released:" item={videoData.release_year} noLink />
        <div className={styles.infoRow}>
          <div className={styles.infoBold}>Album:</div>
          <div className={styles.linkText}>{videoData.album}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoBold}>Genres:</div>
          {/* {videoData.genres.map((genre, index) => {
            return (
              <div key={index} className={styles.label}>
                {genre}
              </div>
            );
          })} */}
        </div>
      </div>
    );
  };

  const renderCredits = () => {
    return (
      <div className={styles.creditsSection}>
        <LinkRowArtist title="Director:" item={videoData?.credits?.director} />
        <LinkRowArtist title="Stars:" item={videoData?.credits?.cast} />
        {videoData?.credits?.writers && (
          <LinkRowArtist title="Writers:" item={videoData?.credits?.writers} />
        )}
      </div>
    );
  };

  if (isLoading || !videoData) {
    return;
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{videoData.title}</div>
            <div className={styles.titleBy}>by</div>
            <div
              className={styles.titleArtist}
              onClick={() => {
                navigate(`../artist/${videoData.artist.slug}`);
              }}
            >
              {/* {videoData.artist.name} */}
            </div>
          </div>
          <div className={styles.videoAndMainInfo}>
            <div className={styles.videoWrapper}>
              <iframe
                width="608"
                height="342"
                src={videoData.yt_embedded}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className={styles.mainInfoWrapper}>
              {renderVideoRatings()}
              {renderInfo()}
            </div>
          </div>
          {/* {renderCredits()} */}
        </div>
        <RateModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userRating={userRating}
          setUserRating={setUserRating}
          ratingData={userRatingData}
          videoData={videoData}
        />
      </div>
    );
  }
}
