import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import kr from "./locales/translation.kr.json";
import en from "./locales/translation.en.json";

i18n.use(initReactI18next).init({
  resources: {
    kr: {
      translation: kr,
    },
    en: {
      translation: en,
    },
  },
  lng: "en",
  fallbackLng: "en",
  keySeparator: ".",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
