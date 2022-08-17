import VideoCard from "components/common/VideoCard/VideoCard";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { userLists } from "utils/data";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OptionsButton from "components/common/OptionsButton/OptionsButton";
import styles from "./UserList.module.css";
import Search from "components/search/Search";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";
import axiosInstance from "utils/axiosApi";

export default function UserList(props) {
  const { slug } = useParams();

  const accName = "AccountName";
  const location = useLocation();
  const [listData, setListData] = useState();
  const [listDataList, setListDataList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(location.state ? true : false);
  const [listTitle, setListTitle] = useState();

  const getList = useCallback(async () => {
    await axiosInstance
      .get(`/api/video-list/${slug}/`)
      .then((response) => {
        console.log("list resp: ", response);
        setListData(response.data);
        setListTitle(response.data.title);
        setListDataList(response.data.musicVideos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong list!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getList();
    // userLists.forEach((list) => {
    //   if (list.slug === slug) {
    //     setListData(list);
    //     setListTitle(list.name);
    //     setListDataList(list.list);
    //     setIsLoading(false);
    //   }
    // });
    // setIsLoading(false);
  }, [setIsLoading, slug, isLoading]);

  const submitEdit = () => {
    setIsEdit(false);
  };

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
  console.log("listTitle: ", listTitle);
  const renderListName = () => {
    if (isEdit) {
      return (
        <div className={styles.textField}>
          <TextFieldWrapper
            id="name"
            name="name"
            label="List Name"
            value={listTitle}
            onChange={(value) => setListTitle(value.target.value)}
            // error={formik.touched.username && Boolean(formik.errors.username)}
            // helperText={formik.touched.username && formik.errors.username}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.titleName}>
          {`${accName}'s ${listData.name}`}
        </div>
      );
    }
  };

  const renderList = () => {
    return (
      <div>
        {listDataList.map((item, index) => {
          console.log('list item: ', item)
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
                <div
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  className={styles.editCancelButton}
                >
                  Cancel
                </div>
                <div
                  onClick={() => {
                    submitEdit();
                  }}
                  className={styles.editDoneButton}
                >
                  Done editing
                </div>
              </div>
            )}
            <div className={styles.titleWrapper}>
              {renderListName()}
              {!isEdit && (
                <OptionsButton
                  onEdit={() => {
                    setIsEdit(true);
                  }}
                />
              )}
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
