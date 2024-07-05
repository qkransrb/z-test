import React from "react";

const PopupLayout = ({ children, className }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center px-6 md:px-0">
      <div className={`bg-white rounded-lg p-4 md:p-8 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default PopupLayout;
