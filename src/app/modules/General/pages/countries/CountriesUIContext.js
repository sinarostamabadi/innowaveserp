import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CountryModel } from "../../../../../core/_models/General/CountryModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CountriesUIContext = createContext();

export function useCountriesUIContext() {
  return useContext(CountriesUIContext);
}

export const CountriesUIConsumer = CountriesUIContext.Consumer;

export function CountriesUIProvider({ countriesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CountryModel).initialFilter
  );

  const [ids, setIds] = useState([]);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: CountryModel,
    newCountryButtonClick: countriesUIEvents.newCountryButtonClick,
    openEditCountryPage: countriesUIEvents.openEditCountryPage,
    openDeleteCountryDialog: countriesUIEvents.openDeleteCountryDialog,
    openDeleteCountriesDialog: countriesUIEvents.openDeleteCountriesDialog,
    openFetchCountriesDialog: countriesUIEvents.openFetchCountriesDialog,
    openUpdateCountriesStatusDialog:
      countriesUIEvents.openUpdateCountriesStatusDialog,
  };
  return (
    <CountriesUIContext.Provider value={value}>
      {children}
    </CountriesUIContext.Provider>
  );
}
