import React from "react";
import {
  CUC_PHONE,
  CUC_EMAIL,
  CUC_ADDRESS,
  CUC_INSTAGRAM,
  CUC_FACEBOOK,
} from "../../constant";

const Footer = () => {
  return (
    <footer className="z-1 bg-background  ">
      <h2 className="text-center text-4xl md:text-5xl lg:text-6xl mt-8">
        Let's work together
      </h2>
      <div className="flex justify-center flex-wrap items-center flex-col lg:flex-row my-8 lg:my-9">
        <div className="mx-5">
          <a
            href={`tel:${CUC_PHONE}`}
            className={` hover:text-accentText`}
          >
            {CUC_PHONE}
          </a>
        </div>
        <div className="mx-5">
          <a
            href={`mailto:${CUC_EMAIL}`}
            className={`  hover:text-accentText`}
          >
            {CUC_EMAIL}
          </a>
        </div>
        <div className="mx-5">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              CUC_ADDRESS
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`  hover:text-accentText`}
          >
            {CUC_ADDRESS}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
