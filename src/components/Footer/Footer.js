import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import Link from "@mui/material/Link";
import styles from "./Footer.module.css";
import { style } from "@mui/system";

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.socialWrapper}>
        <div className={styles.socialIconWrapper}>
          <FacebookIcon
            sx={{ fontSize: 32 }}
            className={styles.socialIcon}
            onClick={() => {
              console.log("Facebook clicked");
            }}
          />
        </div>
        <div className={styles.socialIconWrapper}>
          <TwitterIcon
            sx={{ fontSize: 32 }}
            className={styles.socialIcon}
            onClick={() => {
              console.log("Twitter clicked");
            }}
          />
        </div>
        <div className={styles.socialIconWrapper}>
          <InstagramIcon
            sx={{ fontSize: 32 }}
            className={styles.socialIcon}
            onClick={() => {
              console.log("Inst clicked");
            }}
          />
        </div>
        <div className={styles.socialIconWrapper}>
          <YouTubeIcon
            sx={{ fontSize: 32 }}
            className={styles.socialIcon}
            onClick={() => {
              console.log("Yt clicked");
            }}
          />
        </div>
        <div className={styles.socialIconWrapper}>
          <RedditIcon
            sx={{ fontSize: 32 }}
            className={styles.socialIcon}
            onClick={() => {
              console.log("Reddit clicked");
            }}
          />
        </div>
      </div>
      <div className={styles.linkList}>
        <p
          className={`${styles.linkListItem} ${styles.becomeContributor}`}
          onClick={() => {
            console.log("Become a contributor");
          }}
        >
          Become a contributor
        </p>
        <p
          className={styles.linkListItem}
          onClick={() => {
            console.log("Terms of use");
          }}
        >
          Terms of use
        </p>
        <p
          className={styles.linkListItem}
          onClick={() => {
            console.log("Contact us");
          }}
        >
          Contact us
        </p>
      </div>
      <div>MusicVideos Logo Placeholder</div>
      <div className={styles.date}>
        © {new Date().getFullYear()} by MusicVideos.com, Inc.
      </div>
    </div>
  );
}
