import ButtonRed from "components/common/ButtonCustom/ButtonRed";
import UserListCard from "components/common/UserListCard/UserListCard";
import { AuthContext } from "context/AuthProvider";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/axiosApi";
import styles from "./UserLists.module.css";

export default function UserLists() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getLists = useCallback(async () => {
    await axiosInstance
      .get(`/api/video-lists/${user.user_id}/`)
      .then((response) => {
        console.log("lists resp: ", response);
        setList(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong lists!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  useEffect(() => {
    getLists();
  }, [getLists]);

  if (isLoading) {
    return;
  }
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Your Lists</div>
          <ButtonRed
            className={styles.button}
            onClick={() => {
              navigate("../list-create", { state: { isNew: true } });
            }}
          >
            Create new
          </ButtonRed>
        </div>
        {list.map((item, index) => {
          return (
            <UserListCard
              key={index}
              item={item}
              index={index}
              getLists={() => getLists}
            />
          );
        })}
      </div>
    </div>
  );
}
