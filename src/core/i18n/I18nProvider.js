import React from "react";
import {useLang} from "./Metronici18n";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fa";
import "@formatjs/intl-relativetimeformat/dist/locale-data/tr";

import enMessages from "./messages/en";
import faMessages from "./messages/fa";
import trMessages from "./messages/tr";

const allMessages = {
  en: enMessages,
  fa: faMessages,
  tr: trMessages,
};

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
