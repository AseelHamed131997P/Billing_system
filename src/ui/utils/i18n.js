// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar", "he"],
    fallbackLng: "en", // if user selects a language not supported, the system will default to 'en'
    detection: {
      order: ["cookie", "htmlTag", "localStorage"],
      caches: ["cookie"], // store the language preference in a cookie
    },
    backend: { loadPath: "/assets/locales/{{lng}}/translation.json" },
  });

export default i18n;
