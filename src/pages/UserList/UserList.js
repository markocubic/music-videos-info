import VideoCard from "components/common/VideoCard/VideoCard";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { userLists } from "utils/data";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OptionsButton from "components/common/OptionsButton/OptionsButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { optionsDefault } from "utils/data";
import styles from "./UserList.module.css";
import Search from "components/search/Search";

export default function UserList(props) {
  const { slug } = useParams();
  const accName = "AccountName";

  const [listData, setListData] = useState();
  const [listDataList, setListDataList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();
  const searchListRef = useRef();

  useEffect(() => {
    userLists.forEach((list) => {
      if (list.slug === slug) {
        setListData(list);
        setListDataList(list.list);
        setIsLoading(false);
      }
    });
    setIsLoading(false);
  }, [setIsLoading, slug, isLoading]);

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

  const handleDelete = (id) => {
    const updatedList = listDataList.filter((item) => item.id !== id);
    setListDataList(updatedList);
  };

  const moveUp = (index) => {
    let tempList = listDataList;
    let b = tempList[index - 1];
    tempList[index - 1] = tempList[index];
    tempList[index] = b;

    setListDataList([...tempList]);
  };

  const moveDown = (index) => {
    let tempList = listDataList;
    let b = tempList[index + 1];
    tempList[index + 1] = tempList[index];
    tempList[index] = b;

    setListDataList([...tempList]);
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

  const renderList = () => {
    return (
      <div>
        {listDataList.map((item, index) => {
          return (
            <div key={item.slug} className={styles.videoCardWrapper}>
              <VideoCard item={item} index={index} showNumber />
              {isEdit && (
                <div
                  className={`${styles.editButtons} ${
                    index % 2 && styles.everySecondBackground
                  }`}
                >
                  <DeleteOutlineIcon
                    className={styles.removeIcon}
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  />
                  <ExpandLessIcon
                    className={
                      index > 0 ? styles.arrowIcon : styles.arrowIconDisabled
                    }
                    onClick={() => {
                      moveUp(index);
                    }}
                  />
                  <ExpandMoreIcon
                    className={
                      index + 1 !== listDataList.length
                        ? styles.arrowIcon
                        : styles.arrowIconDisabled
                    }
                    onClick={() => {
                      moveDown(index);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return;
  } else {
    if (listData) {
      return (
        <div className={`${styles.root} ${isEdit && styles.rootEdit}`}>
          <div className={styles.contentWrapper}>
            {isEdit && (
              <div className={styles.editHeader}>
                Editing
                <div
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  className={styles.editDoneButton}
                >
                  Done editing
                </div>
              </div>
            )}
            <div className={styles.title}>
              <div>
                {accName}'s {listData.name}
              </div>
              <OptionsButton
                onEdit={() => {
                  setIsEdit(true);
                }}
              />
            </div>
            <div className={styles.editSearchAndFinish}></div>
            <div className={styles.listInfo}>
              By <div className={styles.userLink}>{accName}</div> | Created:{" "}
              {listData.dateCreated} | Updated: {listData.lastModified}
            </div>
            {isEdit && (
              <div className={styles.addMoreWrapper}>
                <div className={styles.addMore}>Add more:</div>
                <Search />
              </div>
            )}
            <div className={styles.userList}>{renderList()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.root}>
          <div className={styles.listNotAvailableWrapper}>
            List not available
          </div>
        </div>
      );
    }
  }
}
