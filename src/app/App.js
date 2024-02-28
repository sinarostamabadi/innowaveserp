import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/Routes";
import { LayoutSplashScreen } from "../core/layout";
import { I18nProvider } from "../core/i18n";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import faMessages from "../core/i18n/messages/fa.json";
import trMessages from "../core/i18n/messages/tr.json";
import enMessages from "../core/i18n/messages/en.json";
import { defaultPerson } from "./modules/Core/_redux/people/peopleCrud";
import { setStorage, getStorage } from "../core/_helpers/LocalStorageHelpers";
import { toAbsoluteUrl } from "src/core/_helpers";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      fa: {
        translation: faMessages,
      },
      tr: {
        translation: trMessages,
      },
      en: {
        translation: enMessages
      }
    },
    lng: process.env.REACT_APP_LANG,
    fallbackLng: process.env.REACT_APP_LANG,

    interpolation: {
      escapeValue: false,
    },
  });

export default function App({ store, persistor, basename }) {
  if (process.env.REACT_APP_DIR == "rtl") {
    require("src/sass/style.react.rtl.css"); // RTL version
  } else require("src/sass/style.react.css"); // Standard version

  const [defPerson, setDefPerson] = useState(getStorage("defaultPerson"));
  useEffect(() => {
    if (!!getStorage("defaultPerson") == false)
      defaultPerson().then((res) => {
        setDefPerson(res.data);
        setStorage("defaultPerson", JSON.stringify(res.data));
      });
  }, []);
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            {/* <MaterialThemeProvider> */}
            {/* Provide `react-intl` context synchronized with Redux state.  */}
            <I18nProvider>
              {/* Render routes with provided `Layout`. */}
              <Routes />
            </I18nProvider>
            {/* </MaterialThemeProvider> */}
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
