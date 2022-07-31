import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LinkRowArtist.module.css";

export default function LinkRowArtist(props) {
  const { title, item, noLink } = props;
  const isArray = Array.isArray(item);
  const navigate = useNavigate();

  if (noLink) {
    return (
      <div className={styles.infoRow}>
        <div className={styles.infoBold}>{title}</div>
        {item}
      </div>
    );
  }
  return (
    <div className={styles.infoRow}>
      <div className={styles.infoBold}>{title}</div>
      {isArray ? (
        item.map((cast, index) => {
          return (
            <div key={index} className={styles.listItemsRow}>
              <div
                className={styles.linkText}
                onClick={() => {
                  navigate(`../artist/${cast.slug}`);
                }}
              >
                {cast.name}
              </div>
              {item.length !== index + 1 && (
                <div className={styles.comma}>,</div>
              )}
            </div>
          );
        })
      ) : (
        <div
          className={styles.linkText}
          onClick={() => {
            navigate(`../artist/${item.slug}`);
          }}
        >
          {item.name}
        </div>
      )}
    </div>
  );
}
