import React, { useEffect, useRef, useState, useCallback } from "react";

import styles from "./Header.module.css";
import "./overridenStylesHeader.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";

import { optionsDefault } from "utils/data";
import AuthModal from "components/common/AuthModal/AuthModal";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const isAuth = true;
  const filterOptions = [
    {
      value: "All",
      icon: <SearchIcon className={styles.filterItemIcon} />,
    },
    {
      value: "Videos",
      icon: <MusicVideoIcon className={styles.filterItemIcon} />,
    },
    {
      value: "People",
      icon: <PeopleAltIcon className={styles.filterItemIcon} />,
    },
  ];

  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(filterOptions[0].value);
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

  const inputRef = useRef();
  const searchListRef = useRef();

  const onChangeInput = useCallback((value) => {
    setSearchValue(value);
    if (value) {
      searchListRef.current.style.display = "block";
      const filteredOptions = optionsDefault.filter((option) =>
        option.includes(value)
      );
      setOptions(filteredOptions);
      if (filteredOptions.length === 0) {
        searchListRef.current.style.display = "none";
      }
    } else {
      setOptions([]);
      searchListRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    searchListRef.current.style.display = "none";
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      onChangeInput(event.target.value);
    });
    document.addEventListener("click", () => {
      searchListRef.current.style.display = "none";
    });
  }, [onChangeInput]);

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
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

  const renderSearchItemCard = (option, index, optionsLength) => {
    const isBorderBottom = !(optionsLength - 1 === index);
    return (
      <div
        key={index}
        className={`${styles.searchItemCard} ${
          isBorderBottom && styles.borderBottom
        }`}
        onClick={() => {
          setSearchValue(option);
        }}
      >
        <div className={styles.searchItemCardImageWrapper}>
          <img
            className={styles.searchItemCardImage}
            src={
              "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1657580808/maxresdefault_w7q8cp.jpg"
            }
            alt="..."
          />
        </div>
        <div className={styles.searchItemCardText}>
          <div className={styles.searchItemCardTextTitle}>{option}</div>
          <div className={styles.searchItemCardTextSubtitle}>{option}</div>
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className={`searchWrapperOverride ${styles.searchWrapper}`}>
        <Select
          value={filter}
          renderValue={(filter) => filter}
          onChange={handleChangeFilter}
        >
          {filterOptions.map((item, index) => {
            return (
              <MenuItem value={item.value} key={index}>
                {item.icon}
                {item.value}
              </MenuItem>
            );
          })}
        </Select>
        <div className={styles.filterBorder} />
        <InputBase
          className={styles.searchInput}
          placeholder="Search"
          onChange={(event) => onChangeInput(event.target.value)}
          inputRef={inputRef}
          value={searchValue}
        />
        <SearchIcon
          className={styles.searchIcon}
          onClick={() => console.log("Search")}
        />
        <div className={styles.searchDropdownWrapper} ref={searchListRef}>
          {options.map((option, index) => {
            return renderSearchItemCard(option, index, options.length);
          })}
        </div>
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
        {renderSearch()}
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
