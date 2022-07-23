import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

import styles from "./UserRatings.module.css";
import "./overridenStylesUserRatings.css";
import {
  filterOptionsRatings,
  sortOptionsRatings,
  userRatings,
} from "utils/data";
import VideoCard from "components/common/VideoCard/VideoCard";

export default function UserRatings() {
  const [ratingsList, setRatingsList] = useState(userRatings);
  const [filter, setFilter] = useState(filterOptionsRatings[0].value);
  const [sort, setSort] = useState(sortOptionsRatings[0].value);
  const [isDownIconSelected, setIsDownIconSelected] = useState(true);
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
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
          <SouthIcon
            className={
              isDownIconSelected ? styles.orderSelected : styles.orderIcon
            }
            onClick={() => setIsDownIconSelected(true)}
          />
          <NorthIcon
            className={
              !isDownIconSelected ? styles.orderSelected : styles.orderIcon
            }
            onClick={() => setIsDownIconSelected(false)}
          />
        </div>
      </div>
    );
  };

  const renderList = () => {
    return (
      <div>
        {ratingsList.map((item, index) => {
          return <VideoCard key={index} item={item} index={index} />;
        })}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>Your Ratings</div>
        <div>Number of videos: 000</div>
        {renderFilterAndSort()}
        <div className={styles.ratingsList}>
          {ratingsList.length > 0 ? (
            renderList()
          ) : (
            <div>You don't have any ratings yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
