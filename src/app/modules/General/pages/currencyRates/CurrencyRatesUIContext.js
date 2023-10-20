import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CurrencyRateModel } from "../../../../../core/_models/General/CurrencyRateModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CurrencyRatesUIContext = createContext();

export function useCurrencyRatesUIContext() {
  return useContext(CurrencyRatesUIContext);
}

export const CurrencyRatesUIConsumer = CurrencyRatesUIContext.Consumer;

export function CurrencyRatesUIProvider({ currencyRatesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CurrencyRateModel).initialFilter
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
    dataModel: CurrencyRateModel,
    newCurrencyRateButtonClick: currencyRatesUIEvents.newCurrencyRateButtonClick,
    openEditCurrencyRatePage: currencyRatesUIEvents.openEditCurrencyRatePage,
    openDeleteCurrencyRateDialog: currencyRatesUIEvents.openDeleteCurrencyRateDialog,
    openDeleteCurrencyRatesDialog: currencyRatesUIEvents.openDeleteCurrencyRatesDialog,
    openFetchCurrencyRatesDialog: currencyRatesUIEvents.openFetchCurrencyRatesDialog,
    openUpdateCurrencyRatesStatusDialog: currencyRatesUIEvents.openUpdateCurrencyRatesStatusDialog,
  };
  return (
    <CurrencyRatesUIContext.Provider value={value}>{children}</CurrencyRatesUIContext.Provider>
  );
}