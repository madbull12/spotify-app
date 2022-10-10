import React from "react";

interface IProps {
  children: React.ReactNode;
}
const Card = ({ children }: IProps) => {
  return (
    <div className="p-4 hover:-translate-y-2 group  bg-neutral-900 rounded-lg space-y-4 hover:bg-neutral-800 duration-150 ease-in-out relative transition-all cursor-pointer">
      {children}
    </div>
  );
};

export default Card;
