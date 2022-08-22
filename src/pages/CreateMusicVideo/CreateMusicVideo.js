import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./CreateMusicVideo.module.css";
import { AuthContext } from "context/AuthProvider";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";
import { TextareaAutosize } from "@mui/material";
import Search from "components/search/Search";
import ButtonRed from "components/common/ButtonCustom/ButtonRed";
import axiosInstance from "utils/axiosApi";

export default function CreateMusicVideo() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState();
  const [songDescription, setSongDescription] = useState();
  const [releaseYear, setReleaseYear] = useState();
  const [album, setAlbum] = useState();
  const [imageLink, setImageLink] = useState();
  const [ytLink, setYtLink] = useState();
  const [length, setLength] = useState();
  const [genre, setGenre] = useState();
  const [artist, setArtist] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const submitVideo = async () => {
    await axiosInstance
      .post("/api/music-video/", {
        title: title,
        song_description: songDescription,
        release_year: releaseYear,
        album: album,
        image: imageLink,
        yt_embedded: ytLink,
        duration: length,
        genre: genre,
        artist: artist.artist_id,
        rate_score: 10,
        votes_number: 0,
      })
      .then((response) => {
        console.log("submitVideo resp: ", response);
        navigate(`../music-video/${response.data.slug}`);
      })
      .catch((error) => {
        console.log("Something went wrong submitVideo!", error);
      });
  };

  if (!isLoading) {
    return;
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.title}>Create a music video</div>
        <div className={styles.formsWrapper}>
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
          <TextareaAutosize
            placeholder="Add description"
            className={styles.textArea}
            defaultValue={songDescription}
            onChange={(value) => setSongDescription(value.target.value)}
            minRows={3}
          />
          <div className={styles.textField}>
            <TextFieldWrapper
              id="releaseYear"
              name="releaseYear"
              label="Release Year"
              value={releaseYear}
              onChange={(value) => setReleaseYear(value.target.value)}
              // error={formik.touched.username && Boolean(formik.errors.username)}
              // helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className={styles.textField}>
            <TextFieldWrapper
              id="album"
              name="album"
              label="Album"
              value={album}
              onChange={(value) => setAlbum(value.target.value)}
              // error={formik.touched.username && Boolean(formik.errors.username)}
              // helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className={styles.textField}>
            <TextFieldWrapper
              id="imageLink"
              name="imageLink"
              label="Image link"
              value={imageLink}
              onChange={(value) => setImageLink(value.target.value)}
              // error={formik.touched.username && Boolean(formik.errors.username)}
              // helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className={styles.textField}>
            <TextFieldWrapper
              id="ytLink"
              name="ytLink"
              label="Youtube embedded link"
              value={ytLink}
              onChange={(value) => setYtLink(value.target.value)}
              // error={formik.touched.username && Boolean(formik.errors.username)}
              // helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className={styles.textField}>
            <TextFieldWrapper
              id="length"
              name="length"
              label="Video length"
              value={length}
              onChange={(value) => setLength(value.target.value)}
              // error={formik.touched.username && Boolean(formik.errors.username)}
              // helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className={styles.textField}>
            <TextFieldWrapper
              id="genre"
              name="genre"
              label="Genre"
              value={genre}
              onChange={(value) => setGenre(value.target.value)}
              // error={formik.touched.username && Boolean(formik.errors.username)}
              // helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className={styles.pickAnArtist}>Pick an Artist:</div>
          <Search
            onResultClick={(item) => {
              setArtist(item);
            }}
            isArtist
          />
          {artist && <div className={styles.artist}>{artist.name}</div>}

          <ButtonRed className={styles.button} onClick={() => submitVideo()}>
            Create Music Video
          </ButtonRed>
        </div>
      </div>
    );
  }
}
