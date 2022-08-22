import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import styles from "./MusicVideo.module.css";
import RateModal from "components/common/RateModal/RateModal";
import LinkRowArtist from "components/common/LinkRowArtist/LinkRowArtist";
import { AuthContext } from "context/AuthProvider";
import axiosInstance from "utils/axiosApi";
import { GENRE_CHOICES } from "utils/constants";
import ButtonRed from "components/common/ButtonCustom/ButtonRed";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";

export default function MusicVideo() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user, setIsSignInOpen } = useContext(AuthContext);

  const [videoData, setVideoData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState();
  const [userRatingData, setUserRatingData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState();
  const [songDescription, setSongDescription] = useState();

  const getVideoData = useCallback(async () => {
    await axiosInstance
      .get(`/api/music-video/${slug}/`)
      .then((response) => {
        console.log("getVideoData resp: ", response);
        setVideoData(response.data);
        setTitle(response.data.title);
        setSongDescription(response.data.song_description);
        setUserRating(null);
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
      .get(`/api/rating/${user.user_id}/${slug}/`)
      .then((response) => {
        console.log("getVideoAndRatingData resp: ", response);
        setUserRatingData(response.data);
        setUserRating(response.data.rating);
        setVideoData(response.data.musicVideo);
        setTitle(response.data.musicVideo.title);
        setSongDescription(response.data.musicVideo.song_description);
      })
      .catch((error) => {
        getVideoData();
        console.log("Something went wrong getVideoAndRatingData!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, getVideoData, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      getVideoAndRatingData();
    } else {
      getVideoData();
    }
    setIsLoading(false);
  }, [user, slug, getVideoAndRatingData, getVideoData, userRating]);

  const submitEdit = async () => {
    await axiosInstance
      .put(`/api/music-video/${slug}/`, {
        title: title,
        song_description: songDescription,
      })
      .then((response) => {
        console.log("submitEdit resp: ", response);
        getVideoAndRatingData();
        navigate(`../music-video/${response.data.slug}`);
      })
      .catch((error) => {
        console.log("Something went wrong submitEdit!", error);
      });
  };

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
        {videoData.genre && (
          <div className={styles.infoRow}>
            <div className={styles.infoBold}>Genre:</div>
            <div>{GENRE_CHOICES[videoData.genre]}</div>
          </div>
        )}
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

  const renderTitle = () => {
    if (isEdit) {
      return (
        <div className={styles.textField}>
          <TextFieldWrapper
            id="title"
            name="title"
            label="Title"
            value={title}
            onChange={(value) => setTitle(value.target.value)}
            // error={formik.touched.username && Boolean(formik.errors.username)}
            // helperText={formik.touched.username && formik.errors.username}
          />
        </div>
      );
    }
    return <div className={styles.title}>{videoData.title}</div>;
  };

  const renderTop = () => {
    return (
      <div className={styles.topWrapper}>
        <div className={styles.titleWrapper}>
          {renderTitle()}
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
        {user.is_staff && (
          <div className={styles.buttons}>
            {isEdit && (
              <ButtonRed
                className={styles.editButton}
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </ButtonRed>
            )}
            <ButtonRed
              className={styles.editButton}
              onClick={() => {
                submitEdit();
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "Done editing" : "Edit"}
            </ButtonRed>
          </div>
        )}
      </div>
    );
  };

  const renderSongInfo = () => {
    return (
      <div className={styles.songInfo}>
        <div className={styles.smallTitle}>About the song:</div>
        {isEdit ? (
          <TextareaAutosize
            placeholder="Add description"
            className={styles.textArea}
            defaultValue={songDescription}
            onChange={(value) => setSongDescription(value.target.value)}
            minRows={3}
          />
        ) : (
          <div className={styles.songDescription}>
            {videoData.song_description}
          </div>
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
          {renderTop()}
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
          {renderSongInfo()}
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
