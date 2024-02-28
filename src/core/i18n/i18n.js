import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import faMessages from "./messages/fa";
import trMessages from "./messages/tr";
import enMessages from "./messages/en"

// the translations
const resources = {
  en: {
    translation: enMessages
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng:process.env.REACT_APP_LANG,


    // keySeparator: false, // we do not use keys in form messages.welcome

    // interpolation: {
    //   escapeValue: false // react already safes from xss
    // }
  });

export default i18n;