import React from "react";

const Spinner = ({ className }) => {
  return (
    <div
      className={`w-10 h-10 rounded-full shadow-md border-4 border-[#246bea] border-t-gray-200 animate-spin ${className}`}
    />
  );
};

export default Spinner;
