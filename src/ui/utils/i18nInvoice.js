import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const i18nInvoice = i18n.createInstance();

i18nInvoice
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar", "he"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "htmlTag"], // Different detection order
      caches: ["localStorage"], // Cache only in localStorage for this instance
    },
    backend: { loadPath: "/assets/locales/{{lng}}/translation.json" },
  });

export default i18nInvoice;
