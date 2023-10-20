import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CurrencyModel } from "../../../../../core/_models/General/CurrencyModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CurrenciesUIContext = createContext();

export function useCurrenciesUIContext() {
  return useContext(CurrenciesUIContext);
}

export const CurrenciesUIConsumer = CurrenciesUIContext.Consumer;

export function CurrenciesUIProvider({ currenciesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CurrencyModel).initialFilter
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
    dataModel: CurrencyModel,
    newCurrencyButtonClick: currenciesUIEvents.newCurrencyButtonClick,
    openEditCurrencyPage: currenciesUIEvents.openEditCurrencyPage,
    openDeleteCurrencyDialog: currenciesUIEvents.openDeleteCurrencyDialog,
    openDeleteCurrenciesDialog: currenciesUIEvents.openDeleteCurrenciesDialog,
    openFetchCurrenciesDialog: currenciesUIEvents.openFetchCurrenciesDialog,
    openUpdateCurrenciesStatusDialog: currenciesUIEvents.openUpdateCurrenciesStatusDialog,
  };
  return (
    <CurrenciesUIContext.Provider value={value}>{children}</CurrenciesUIContext.Provider>
  );
}