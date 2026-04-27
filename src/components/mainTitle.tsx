import React from "react";

const MainTitle: React.FC<any> = ({ title }) => {
  return (
    <div className="my-10">
      <h2 className="font25 font-bold text-center text-gray-800">{title}</h2>
    </div>
  );
};

export default MainTitle;
