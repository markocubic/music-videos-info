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
import ButtonCustom from "components/common/ButtonCustom/ButtonCustom";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";
import moment from "moment";

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

  const [reviews, setReviews] = useState();
  const [userReview, setUserReview] = useState();
  const [isEditYourReview, setIsEditYourReview] = useState(false);
  const [reviewTitle, setReviewTitle] = useState();
  const [reviewText, setReviewText] = useState();

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
  const filterUserReview = useCallback(
    (data) => {
      let temp = [];
      let isUserReviewExist = false;
      data.forEach((review) => {
        if (review.user.username === user.username) {
          setUserReview(review);
          setReviewTitle(review.title);
          setReviewText(review.text);
          isUserReviewExist = true;
        } else {
          temp.push(review);
        }
      });
      if (!isUserReviewExist) {
        setUserReview(null);
        setReviewTitle(null);
        setReviewText(null);
      }
      setReviews(temp);
    },
    [user]
  );

  const getReviews = useCallback(async () => {
    await axiosInstance
      .get(`/api/review/${slug}/`)
      .then((response) => {
        console.log("getReviews resp: ", response);
        if (user) {
          filterUserReview(response.data);
        } else {
          setReviews(response.data);
        }
      })
      .catch((error) => {
        console.log("Something went wrong getReviews!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filterUserReview, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      getVideoAndRatingData();
    } else {
      getVideoData();
    }
    getReviews();
    setIsLoading(false);
  }, [user, getReviews, getVideoAndRatingData, getVideoData]);

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

  const editUserReview = async () => {
    await axiosInstance
      .put(`/api/review/${userReview.id}/`, {
        title: reviewTitle,
        text: reviewText,
      })
      .then((response) => {
        console.log("editUserReview resp: ", response);
        getReviews();
      })
      .catch((error) => {
        console.log("Something went wrong editUserReview!", error);
      });
  };

  const submitUserReview = async () => {
    await axiosInstance
      .post(`/api/review/`, {
        user: user.user_id,
        title: reviewTitle,
        text: reviewText,
        musicVideo: videoData.id,
      })
      .then((response) => {
        console.log("submitUserReview resp: ", response);
        getReviews();
      })
      .catch((error) => {
        console.log("Something went wrong submitUserReview!", error);
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
        {user?.is_staff && (
          <div className={styles.buttons}>
            {isEdit && (
              <ButtonCustom
                className={styles.editButton}
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </ButtonCustom>
            )}
            <ButtonCustom
              className={styles.editButton}
              onClick={() => {
                submitEdit();
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "Done editing" : "Edit"}
            </ButtonCustom>
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
          <div className={styles.editDescriptionWrapper}>
            <TextareaAutosize
              placeholder="Add description"
              className={styles.textArea}
              defaultValue={songDescription}
              onChange={(value) => setSongDescription(value.target.value)}
              minRows={3}
            />
          </div>
        ) : (
          <div className={styles.songDescription}>
            {videoData.song_description}
          </div>
        )}
      </div>
    );
  };

  const renderUserReview = () => {
    if (userReview) {
      return (
        <>
          <div className={styles.smallTitle}>Your review:</div>
          <div
            className={`${styles.reviewWrapper} ${styles.userReviewWrapper}`}
          >
            <div className={styles.reviewHeader}>
              {isEditYourReview ? (
                <div className={styles.textFieldReview}>
                  <TextFieldWrapper
                    id="reviewTitle"
                    name="reviewTitle"
                    label="Title"
                    value={reviewTitle}
                    onChange={(value) => setReviewTitle(value.target.value)}
                  />
                </div>
              ) : (
                <div className={styles.reviewTitle}>{userReview.title}</div>
              )}
              <div className={styles.reviewInfo}>{`By: ${
                userReview.user.username
              } | ${moment(userReview.date_updated).format(
                "YYYY-MM-DD"
              )}`}</div>
            </div>
            {isEditYourReview ? (
              <TextareaAutosize
                placeholder="Add description"
                className={styles.textArea}
                defaultValue={reviewText}
                onChange={(value) => setReviewText(value.target.value)}
                minRows={3}
              />
            ) : (
              <div className={styles.userReviewText}>{userReview.text}</div>
            )}
            <div className={styles.reviewButtonsWrapper}>
              <ButtonCustom
                className={styles.reviewButton}
                onClick={() => {
                  if (isEditYourReview) {
                    editUserReview();
                  }
                  setIsEditYourReview(!isEditYourReview);
                }}
              >
                {isEditYourReview ? "Done editing" : "Edit your review"}
              </ButtonCustom>
              {isEditYourReview && (
                <ButtonCustom
                  className={`${styles.reviewButton} ${styles.cancelReviewButton}`}
                  onClick={() => {
                    setReviewTitle(userReview.title);
                    setReviewText(userReview.text);
                    setIsEditYourReview(!isEditYourReview);
                  }}
                >
                  Cancel
                </ButtonCustom>
              )}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.smallTitle}>Add your review:</div>
          <div
            className={`${styles.reviewWrapper} ${styles.userReviewWrapper}`}
          >
            <div className={styles.reviewHeader}>
              <div className={styles.textFieldReview}>
                <TextFieldWrapper
                  id="reviewTitle"
                  name="reviewTitle"
                  label="Title"
                  value={reviewTitle}
                  onChange={(value) => setReviewTitle(value.target.value)}
                />
              </div>
            </div>
            <TextareaAutosize
              placeholder="Add description"
              className={styles.textArea}
              defaultValue={reviewText}
              onChange={(value) => setReviewText(value.target.value)}
              minRows={3}
            />
            <div className={styles.reviewButtonsWrapper}>
              <ButtonCustom
                className={styles.reviewButton}
                onClick={() => {
                  submitUserReview();
                }}
              >
                Add review
              </ButtonCustom>
            </div>
          </div>
        </>
      );
    }
  };

  const renderReviews = () => {
    if (reviews) {
      return (
        <div className={styles.songInfo}>
          {user && renderUserReview()}
          <div className={styles.smallTitle}>
            {reviews.length > 0
              ? "Reviews:"
              : "There are no other reviews for this video"}
          </div>
          {reviews.map((review) => {
            return (
              <div className={styles.reviewWrapper}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewTitle}>{review.title}</div>
                  <div className={styles.reviewInfo}>{`By: ${
                    review.user.username
                  } | ${moment(review.date_updated).format(
                    "YYYY-MM-DD"
                  )}`}</div>
                </div>
                <div>{review.text}</div>
              </div>
            );
          })}
        </div>
      );
    }
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
          {renderSongInfo()}
          {renderReviews()}
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
