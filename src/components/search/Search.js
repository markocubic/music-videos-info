import React, { useEffect, useRef, useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { optionsDefault } from "utils/data";
import styles from "./Search.module.css";
import "./overridenStylesSearch.css";

export default function Search(props) {
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

  const { isFilter } = props;
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(filterOptions[0].value);

  const inputRef = useRef();
  const searchListRef = useRef();

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

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
}
