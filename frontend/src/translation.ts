import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";
import { initReactI18next } from "react-i18next";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    debug: false,
    lng: "en",
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translations: translationEn,
      },
      es: {
        translations: translationEs,
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });

export default i18n;