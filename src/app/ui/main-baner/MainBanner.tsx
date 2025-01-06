import React from "react";

import styles from "./MainBanner.module.css";

interface MainBannerProps {
  title: string;
  backgroundImage: string;
  isTextStroke?: boolean;
}

const MainBanner: React.FC<MainBannerProps> = ({
  title,
  backgroundImage,
  isTextStroke,
}) => {
  return (
    <div
      className={styles.mainBanner}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-center items-center h-full text-center text-4xl">
        <h1
          className={`${styles.title} ${
            isTextStroke ? styles.textStroke : ""
          } uppercase text-6xl font-extrabold`}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default MainBanner;
