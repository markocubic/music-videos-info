import VideoCard from "components/common/VideoCard/VideoCard";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./CreateUserList.module.css";
import Search from "components/search/Search";
import TextFieldWrapper from "components/common/TextFieldWrapper/TextFieldWrapper";
import axiosInstance from "utils/axiosApi";
import { AuthContext } from "context/AuthProvider";

export default function CreateUserList() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [listDataList, setListDataList] = useState([]);
  const [listName, setListName] = useState();

  const submitList = async () => {
    let idList = [];
    listDataList.map((item) => idList.push(item.id));
    await axiosInstance
      .post(`/api/video-lists/`, {
        title: listName,
        user: user.user_id,
        musicVideos: idList,
      })
      .then((response) => {
        console.log("submitList resp: ", response);
        navigate(`../list/${response.data.slug}`);
      })
      .catch((error) => {
        console.log("Something went wrong submitList!", error);
      });
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
  };

  const renderList = () => {
    return (
      <div>
        {listDataList.map((item, index) => {
          return (
            <div key={item.slug} className={styles.videoCardWrapper}>
              <VideoCard item={item} index={index} fromList />
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
                /> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${styles.root} ${styles.rootEdit}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.editHeader}>
          <div
            onClick={() => {
              navigate(-1);
            }}
            className={styles.editCancelButton}
          >
            Cancel
          </div>
          <div onClick={() => submitList()} className={styles.editDoneButton}>
            Create
          </div>
        </div>
        <div className={styles.titleWrapper}>{renderListName()}</div>
        <div className={styles.editSearchAndFinish}></div>
        <div className={styles.addMoreWrapper}>
          <div className={styles.addMore}>Add more:</div>
          <Search
            onResultClick={(item) => {
              setListDataList((oldArray) => [...oldArray, item]);
            }}
            list={listDataList}
          />
        </div>
        <div className={styles.userList}>{renderList()}</div>
      </div>
    </div>
  );
}
