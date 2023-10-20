import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import faMessages from "./messages/fa";
import trMessages from "./messages/tr";

// the translations
const resources = {
  fa: {
    translation: faMessages
  },
  tr: {
    translation: trMessages
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: process.env.REACT_APP_LANG,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;