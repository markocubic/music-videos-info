import VideoCard from "components/common/VideoCard/VideoCard";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OptionsButton from "components/common/OptionsButton/OptionsButton";
import styles from "./UserList.module.css";
import Search from "components/search/Search";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";
import axiosInstance from "utils/axiosApi";
import { AuthContext } from "context/AuthProvider";
import Moment from "moment";
import ButtonCustom from "components/common/ButtonCustom/ButtonCustom";

export default function UserList() {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const [listData, setListData] = useState();
  const [listDataList, setListDataList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(location.state ? true : false);
  const [listName, setListName] = useState();

  const getList = useCallback(async () => {
    setIsLoading(true);

    await axiosInstance
      .get(`/api/video-lists/${slug}/`)
      .then((response) => {
        console.log("list resp: ", response);
        setListData(response.data);
        setListName(response.data.title);
        setListDataList(response.data.musicVideos);
      })
      .catch((error) => {
        console.log("Something went wrong list!", error);
      });

    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getList();
  }, [getList]);
  const deleteList = async () => {
    await axiosInstance
      .delete(`/api/video-lists/${slug}/`)
      .then((response) => {
        console.log("deleteList resp: ", response);
        navigate(-1);
      })
      .catch((error) => {
        console.log("Something went wrong deleteList!", error);
      });
  };

  const submitEdit = async () => {
    let idList = [];
    listDataList.map((item) => idList.push(item.id));
    await axiosInstance
      .put(`/api/video-lists/${slug}/`, {
        title: listName,
        user: user.user_id,
        musicVideos: idList,
      })
      .then((response) => {
        console.log("updateList resp: ", response);
        navigate(`../list/${response.data.slug}`);
      })
      .catch((error) => {
        console.log("Something went wrong updateList!", error);
      });
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

  const renderListName = () => {
    if (isEdit) {
      return (
        <div className={styles.textField}>
          <TextFieldWrapper
            id="name"
            name="name"
            label="List Name"
            value={listName}
            onChange={(value) => setListName(value.target.value)}
            // error={formik.touched.username && Boolean(formik.errors.username)}
            // helperText={formik.touched.username && formik.errors.username}
          />
        </div>
      );
    } else {
      return <div className={styles.titleName}>{`${listData.title}`}</div>;
    }
  };

  const renderList = () => {
    return (
      <div>
        {listDataList.map((item, index) => {
          return (
            <div key={item.slug} className={styles.videoCardWrapper}>
              <VideoCard item={item} index={index} fromList />
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
                  {/* <ExpandLessIcon
                    className={
                      index > 0 ? styles.arrowIcon : styles.arrowIconDisabled
                    }
                    onClick={() => {
                      if (index > 0) {
                        moveUp(index);
                      }
                    }}
                  />
                  <ExpandMoreIcon
                    className={
                      index + 1 !== listDataList.length
                        ? styles.arrowIcon
                        : styles.arrowIconDisabled
                    }
                    onClick={() => {
                      if (index + 1 !== listDataList.length) {
                        moveDown(index);
                      }
                    }}
                  /> */}
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
                <ButtonCustom
                  onClick={() => {
                    getList();
                    setIsEdit(false);
                  }}
                  className={styles.editCancelButton}
                >
                  Cancel
                </ButtonCustom>
                <ButtonCustom
                  onClick={() => {
                    submitEdit();
                  }}
                  className={styles.editDoneButton}
                >
                  Done editing
                </ButtonCustom>
              </div>
            )}
            <div className={styles.titleWrapper}>
              {renderListName()}
              {!isEdit && (
                <OptionsButton
                  onEdit={() => {
                    setIsEdit(true);
                  }}
                  onDelete={() => {
                    deleteList();
                  }}
                />
              )}
            </div>
            <div className={styles.editSearchAndFinish}></div>
            <div className={styles.listInfo}>
              By <div className={styles.userLink}>{user.username}</div> |
              Created: {Moment(listData.date_created).format("YYYY-MM-DD")} |
              Updated: {Moment(listData.date_updated).format("YYYY-MM-DD")}
            </div>
            {isEdit && (
              <div className={styles.addMoreWrapper}>
                <div className={styles.addMore}>Add more:</div>
                <Search
                  onResultClick={(item) => {
                    setListDataList((oldArray) => [...oldArray, item]);
                  }}
                  list={listDataList}
                />
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
