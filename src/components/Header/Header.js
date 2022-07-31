import React, { useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import AuthModal from "components/common/AuthModal/AuthModal";
import { useNavigate } from "react-router-dom";
import Search from "components/search/Search";
import styles from "./Header.module.css";
import "./overridenStylesHeader.css";

export default function Header() {
  const navigate = useNavigate();

  const isAuth = true;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickAccount = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorEl(null);
  };

  const renderLogo = () => {
    return (
      <div
        className={styles.logoWrapper}
        onClick={() => {
          navigate("../");
        }}
      >
        <MusicNoteIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          className={styles.logoIcon}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
          }}
          className={styles.logoTitle}
        >
          MusicVideos.com
        </Typography>
      </div>
    );
  };

  const renderAccount = () => {
    return (
      <div className={styles.accountContent}>
        {isAuth ? (
          <div
            className={`accountLoggedWrapper ${styles.accountLoggedWrapper}`}
          >
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickAccount}
            >
              <AccountCircleIcon className={styles.accountImage} />
              Username123
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseAccount}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() => {
                  handleCloseAccount();
                  navigate("../account");
                }}
              >
                Your activity
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAccount();
                  navigate("../user-ratings");
                }}
              >
                Your ratings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAccount();
                  navigate("../user-lists");
                }}
              >
                Your lists
              </MenuItem>
              <MenuItem onClick={handleCloseAccount}>Sign out</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <div
              className={styles.accountButton}
              onClick={() => {
                setIsSignIn(true);
                setIsModalOpen(true);
              }}
            >
              Sign in
            </div>
            <div
              className={styles.accountButton}
              onClick={() => {
                setIsSignIn(false);
                setIsModalOpen(true);
              }}
            >
              Sign up
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.logoSearchWrapper}>
        {renderLogo()}
        <Search isFilter />
      </div>
      <div className={styles.accountWrapper}>{renderAccount()}</div>
      <AuthModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
      />
    </div>
  );
}
