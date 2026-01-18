import React from "react";
import Button from "../Button";

interface ICard {
  cardInfo: {
    title?: string;
    description: string;
    src: string;
    price?: string;
    className: string;
    size?: number;
    card?: string;
    id?: string;
    name?: string;
  };
  children: React.ReactNode;
  handleClick?: (name: string) => void;
}

const Card = ({ cardInfo, children, handleClick }: ICard) => {
  const { title, description, className, card } = cardInfo;

  const customClick = () => {
    if (handleClick && cardInfo.name) {
      handleClick(cardInfo.name);
    }
  };

  const small = title ? "" : "hidden md:block";
  return (
    <div className={className}>
      <div>{children}</div>
      <div className={`text-center my-2 ${card} ${small}`}>
        <h5 className="uppercase">{title}</h5>
        <p className="first-letter:uppercase">{description}</p>
      </div>

      {handleClick && cardInfo.id !== "other" && (
        <Button
          className="mb-2 text-white  bg-accentText py-2 px-4 rounded-lg cursor-pointer text-center transform hover:scale-110 transition"
          toggleMenu={customClick}
        >
          Calculate your price
        </Button>
      )}
    </div>
  );
};

export default Card;
