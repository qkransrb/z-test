import React from "react";
import { useTranslation } from "react-i18next";
import { sanitize } from "dompurify";

const Title = ({ title }) => {
  const { t } = useTranslation();

  return (
    <h2
      className="text-white text-xl md:text-[28px] font-bold text-center pt-6 md:pt-12 pb-4 md:py-12 md:leading-10"
      dangerouslySetInnerHTML={{ __html: sanitize(t(title)) }}
    ></h2>
  );
};

export default Title;
