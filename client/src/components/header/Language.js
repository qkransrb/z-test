import React, { useState } from "react";
import i18next from "i18next";
import { RiArrowDownSFill } from "react-icons/ri";

const Language = () => {
  const [language, setLanguage] = useState("en");

  const changeLanguageHandler = (language) => {
    i18next.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <div className="relative group cursor-pointer z-50">
      <div className="text-sm text-white flex items-center space-x-1 py-2">
        <span>{language.toUpperCase()}</span>
        <RiArrowDownSFill className="group-hover:rotate-180 duration-300" />
      </div>
      <ul className="absolute top-8 -left-3 bg-white text-gray-700 text-sm p-4 pr-5 rounded-md space-y-1 hidden group-hover:block shadow-lg">
        <li className="hover:text-primary">
          <button type="button" onClick={() => changeLanguageHandler("en")}>
            EN
          </button>
        </li>
        <li className="hover:text-primary">
          <button type="button" onClick={() => changeLanguageHandler("kr")}>
            KR
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Language;
