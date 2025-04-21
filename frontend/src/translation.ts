import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import translationEn from "./locales/en/translation.json";
import translationHu from "./locales/hu/translation.json";
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
      hu: {
        translations: translationHu,
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });

export default i18n;