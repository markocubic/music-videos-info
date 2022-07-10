import React from "react";
import { sliderImages } from "utils/data";
import { Carousel } from "react-bootstrap";
import styles from "./Home.module.css";

function Home() {
  const renderSlider = () => {
    return (
      <div className={styles.slideWrapper}>
        <Carousel indicators={false}>
          {sliderImages.map(({ img, category, info, btnInfo, id }) => (
            <Carousel.Item
              key={id}
            >
              <img
                style={{ display: "flex" }}
                src={img}
                className={styles.slideImage}
                alt="..."
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.topContent}>
        {renderSlider()}
        <div className={styles.topContentRight}>Desni content</div>
      </div>
    </div>
  );
}

export default Home;
