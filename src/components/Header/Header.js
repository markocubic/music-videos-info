import React, { useState, useContext } from "react";
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
import { AuthContext } from "context/AuthProvider";

export default function Header() {
  const navigate = useNavigate();
  const { user, logOutUser, isSignInOpen, setIsSignInOpen } =
    useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickAccount = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountDropdown = () => {
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

  const logOut = () => {
    handleCloseAccountDropdown();
    logOutUser();
    navigate("../");
  };

  const renderAccount = () => {
    return (
      <div className={styles.accountContent}>
        {user ? (
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
              {user.username}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseAccountDropdown}
              TransitionComponent={Fade}
            >
              {user?.is_staff && (
                <MenuItem
                  onClick={() => {
                    handleCloseAccountDropdown();
                    navigate("../music-video-create");
                  }}
                >
                  Create a video
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleCloseAccountDropdown();
                  navigate("../user-ratings");
                }}
              >
                Your ratings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAccountDropdown();
                  navigate("../user-lists");
                }}
              >
                Your lists
              </MenuItem>
              <MenuItem onClick={() => logOut()}>Sign out</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <div
              className={styles.accountButton}
              onClick={() => {
                setIsSignIn(true);
                setIsSignInOpen(true);
              }}
            >
              Sign in
            </div>
            <div
              className={styles.accountButton}
              onClick={() => {
                setIsSignIn(false);
                setIsSignInOpen(true);
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
        <Search isFilter isNavigate />
      </div>
      <div className={styles.accountWrapper}>{renderAccount()}</div>
      <AuthModal
        isModalOpen={isSignInOpen}
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
      />
    </div>
  );
}
