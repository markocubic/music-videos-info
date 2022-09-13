import React, { useState, useEffect, useContext, useCallback } from "react";
import { MenuItem, Select } from "@mui/material";
import axiosInstance from "utils/axiosApi";
import { filterOptionsRatings, sortOptionsRatings } from "utils/data";
import VideoCard from "components/common/VideoCard/VideoCard";
import styles from "./UserRatings.module.css";
import "./overridenStylesUserRatings.css";
import { AuthContext } from "context/AuthProvider";

export default function UserRatings() {
  const { user } = useContext(AuthContext);

  const [ratingsList, setRatingsList] = useState();
  const [filter, setFilter] = useState(filterOptionsRatings[0].value);
  const [sort, setSort] = useState(sortOptionsRatings[0].value);
  const [isLoading, setIsLoading] = useState(true);

  const getRatings = useCallback(async (filterValue=null, sortValue=null) => {
    if (!filterValue) {
      filterValue = filter;
    } 
    if (!sortValue) {
      sortValue = sort;
    }

    let filterData = filterOptionsRatings.find(item => item.value === filterValue);
    let sortData = sortOptionsRatings.find(item => item.value === sortValue);

    await axiosInstance
      .get(`/api/rating/${user.user_id}/${filterData.id}/${sortData.payload}/`)
      .then((response) => {
        console.log("rating resp: ", response);
        setRatingsList(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong rating!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, filter, sort]);

  useEffect(() => {
    getRatings();
  }, [getRatings]);

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
    getRatings(event.target.value, null);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    getRatings(null, event.target.value);
  };

  const renderFilterAndSort = () => {
    return (
      <div className={styles.filterAndSort}>
        <div className="selectOverride">
          <Select
            value={filter}
            renderValue={(filter) => (
              <div className={styles.selectWrapper}>
                <div className={styles.selectText}>Filter:</div>
                <div className={styles.selectBoldText}>{filter}</div>
              </div>
            )}
            onChange={handleChangeFilter}
            className={styles.select}
          >
            {filterOptionsRatings.map((item, index) => {
              return (
                <MenuItem value={item.value} key={index}>
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            value={sort}
            renderValue={(sort) => (
              <div className={styles.selectWrapper}>
                <div className={styles.selectText}>Sort:</div>
                <div className={styles.selectBoldText}>{sort}</div>
              </div>
            )}
            onChange={handleChangeSort}
            className={styles.select}
          >
            {sortOptionsRatings.map((item, index) => {
              return (
                <MenuItem value={item.value} key={index}>
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>
    );
  };

  const renderList = () => {
    return (
      <div>
        {ratingsList.map((item, index) => {
          return <VideoCard key={item.id} item={item} index={index} />;
        })}
      </div>
    );
  };

  if (isLoading) {
    return;
  }
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>Your Ratings</div>
        <div>Number of videos: {ratingsList && ratingsList.length}</div>
        {renderFilterAndSort()}
        <div className={styles.ratingsList}>
          {ratingsList?.length > 0 ? (
            renderList()
          ) : (
            <div>You don't have any ratings yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
