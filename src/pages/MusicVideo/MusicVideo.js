import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { musicVideos, musicVideosLoggedIn } from "utils/data";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import styles from "./MusicVideo.module.css";
import RateModal from "components/common/RateModal/RateModal";
import LinkRowArtist from "components/common/LinkRowArtist/LinkRowArtist";

export default function MusicVideo(props) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isAuth = true;
  const [videoData, setVideoData] = useState();
  const [ratingData, setRatingData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuth) {
      musicVideosLoggedIn.forEach((video) => {
        if (video.slug === slug) {
          if (video.userRating) {
            setRatingData(video);
            setUserRating(video.userRating);
          }
          setVideoData(video);
          setIsLoading(false);
        }
      });
    } else {
      musicVideos.forEach((video) => {
        if (video.slug === slug) {
          setVideoData(video);
          setIsLoading(false);
        }
      });
    }
    setIsLoading(false);
  }, [isAuth, slug]);

  const renderVideoRatings = () => {
    return (
      <div className={styles.videoRatingsWrapper}>
        <div className={styles.ratingWrapper}>
          <div className={styles.ratingTitle}>VIDEO RATING</div>
          <div className={styles.ratingIconWrapper}>
            <StarIcon className={styles.starIcon} />
            <div className={styles.ratingScoreAndNumberWrapper}>
              <div className={styles.rating}>
                <div className={styles.rateScore}>{videoData.rateScore}</div>/
                <div className={styles.fromTen}>10</div>
              </div>
              <div className={styles.videoVotesNumber}>
                {videoData.votesNumber}
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.userRatingWrapper}
          onClick={() => {
            setIsModalOpen(true);
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
        <LinkRowArtist title="Artist:" item={videoData.artist} />
        <LinkRowArtist title="Released:" item={videoData.releaseYear} noLink />
        <div className={styles.infoRow}>
          <div className={styles.infoBold}>Album:</div>
          <div className={styles.linkText}>{videoData.album}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoBold}>Genres:</div>
          {videoData.genres.map((genre, index) => {
            return (
              <div key={index} className={styles.label}>
                {genre}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCredits = () => {
    return (
      <div className={styles.creditsSection}>
        <LinkRowArtist title="Director:" item={videoData.credits.director} />
        <LinkRowArtist title="Stars:" item={videoData.credits.cast} />
        {videoData.credits.writers && (
          <LinkRowArtist title="Writers:" item={videoData.credits.writers} />
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
              {videoData.artist.name}
            </div>
          </div>
          <div className={styles.videoAndMainInfo}>
            <div className={styles.videoWrapper}>
              <iframe
                width="608"
                height="342"
                src={videoData.ytEmbedded}
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
          {renderCredits()}
        </div>

        <RateModal
          item={videoData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userRating={userRating}
          setUserRating={setUserRating}
        />
      </div>
    );
  }
}
