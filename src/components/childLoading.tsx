import React from "react";

const ChildLoading: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center  justify-center">
      <div className="animate-spin h-16 w-16 border-b-3 border-blue-600 rounded-full"></div>
    </div>
  );
};

export default ChildLoading;
