import React from "react";

interface ICard {
  cardInfo: {
    title?: string;
    description: string;
    src: string;
    price?: string;
    className: string;
    size?: number;
    card?: string;
  };
  children: React.ReactNode;
}

const Card = ({ cardInfo, children }: ICard) => {
  const { title, description, className, card } = cardInfo;
  return (
    <div className={className}>
      <div>{children}</div>
      <div className={`text-center my-2 ${card}`}>
        <h5 className="uppercase">{title}</h5>
        <p className="first-letter:uppercase">{description}</p>
      </div>
    </div>
  );
};

export default Card;
