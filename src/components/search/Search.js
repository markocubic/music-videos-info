import React, { useEffect, useRef, useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import "./overridenStylesSearch.css";
import axiosInstance from "utils/axiosApi";

const filterOptions = [
  {
    value: "Videos",
    icon: <MusicVideoIcon className={styles.filterItemIcon} />,
  },
  {
    value: "People",
    icon: <PeopleAltIcon className={styles.filterItemIcon} />,
  },
];

export default function Search(props) {
  const { isFilter, isNavigate, onResultClick, list, isArtist } = props;
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(filterOptions[0].value);

  const inputRef = useRef();
  const searchListRef = useRef();

  const checkIfInList = useCallback(
    (item) => {
      let flag = false;
      list.forEach((video) => {
        if (item.id === video.id) {
          flag = true;
        }
      });
      return flag;
    },
    [list]
  );

  const getSearchResults = useCallback(
    async (value) => {
      if (isArtist || filter === "People") {
        await axiosInstance
          .post("/api/search-artist/", { parameter: value })
          .then((response) => {
            console.log("search artist resp: ", response);
            setResults(response.data);
            if (response.data.length === 0) {
              searchListRef.current.style.display = "none";
            }
          })
          .catch((error) => {
            console.log("Something went wrong search!", error);
          });
      } else {
        await axiosInstance
          .post("/api/search/", { parameter: value })
          .then((response) => {
            console.log("search resp: ", response);
            if (list && list.length > 0) {
              //ako je search u listi onda će se izvuci samo videi kojih nema u njoj
              let tempList = [];
              response.data.forEach((video) => {
                if (!checkIfInList(video)) {
                  tempList.push(video);
                }
              });
              setResults(tempList);
            } else {
              setResults(response.data);
            }
            if (response.data.length === 0) {
              searchListRef.current.style.display = "none";
            }
          })
          .catch((error) => {
            console.log("Something went wrong search!", error);
          });
      }
    },
    [filter, list, checkIfInList, isArtist]
  );

  const handleChangeFilter = (event) => {
    setSearchValue("");
    setFilter(event.target.value);
  };

  const onChangeInput = useCallback(
    (value) => {
      setSearchValue(value);
      if (value) {
        searchListRef.current.style.display = "block";
        getSearchResults(value);
      } else {
        setResults([]);
        searchListRef.current.style.display = "none";
      }
    },
    [getSearchResults]
  );

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

  const renderSearchItemCard = (option, index, optionsLength) => {
    const isBorderBottom = !(optionsLength - 1 === index);
    return (
      <div
        key={index}
        className={`${styles.searchItemCard} ${
          isBorderBottom && styles.borderBottom
        }`}
        onClick={() => {
          setSearchValue("");
          if (isNavigate) {
            if (isArtist || filter === "People") {
              navigate(`../artist/${option.slug}`);
            } else {
              navigate(`../music-video/${option.slug}`);
            }
          }
          if (onResultClick) {
            onResultClick(option);
          }
        }}
      >
        <div className={styles.searchItemCardImageWrapper}>
          <img
            className={styles.searchItemCardImage}
            src={option.image}
            alt="..."
          />
        </div>
        {isArtist || filter === "People" ? (
          <div>{option.name}</div>
        ) : (
          <div className={styles.searchItemCardText}>
            <div className={styles.searchItemCardTextTitle}>{option.title}</div>
            <div className={styles.searchItemCardTextSubtitle}>
              {option?.artist?.name}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`searchWrapperOverride ${styles.searchWrapper}`}>
      {isFilter && (
        <>
          <Select
            value={filter}
            renderValue={(filter) => filter}
            onChange={handleChangeFilter}
          >
            {filterOptions.map((item, index) => {
              return (
                <MenuItem value={item.value} key={index}>
                  <div className={styles.menuItemIcon}>{item.icon}</div>
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
          <div className={styles.filterBorder} />
        </>
      )}
      <InputBase
        className={styles.searchInput}
        placeholder="Search"
        onChange={(event) => onChangeInput(event.target.value)}
        inputRef={inputRef}
        value={searchValue}
      />
      <SearchIcon className={styles.searchIcon} />
      <div className={styles.searchDropdownWrapper} ref={searchListRef}>
        {results.map((option, index) => {
          return renderSearchItemCard(option, index, results.length);
        })}
      </div>
    </div>
  );
}
