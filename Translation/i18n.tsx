import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsEN from "../Translation/En/translation.json";
import translationsAZ from "../Translation/Az/translation.json";
import translationsRU from "../Translation/Ru/translation.json";
const resources = {
  en: {
    translation: translationsEN,
  },
  az: {
    translation: translationsAZ,
  },
  ru: {
    translation: translationsRU,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    debug:true,
    fallbackLng: "en", // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });