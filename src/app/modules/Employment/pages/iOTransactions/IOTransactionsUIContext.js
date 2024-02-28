import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { IOTransactionModel } from "../../../../../core/_models/Employment/IOTransactionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const IOTransactionsUIContext = createContext();

export function useIOTransactionsUIContext() {
  return useContext(IOTransactionsUIContext);
}

export const IOTransactionsUIConsumer = IOTransactionsUIContext.Consumer;

export function IOTransactionsUIProvider({ iOTransactionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(IOTransactionModel).initialFilter
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
    dataModel: IOTransactionModel,
    newIOTransactionButtonClick:
      iOTransactionsUIEvents.newIOTransactionButtonClick,
    openEditIOTransactionPage: iOTransactionsUIEvents.openEditIOTransactionPage,
    openDeleteIOTransactionDialog:
      iOTransactionsUIEvents.openDeleteIOTransactionDialog,
    openDeleteIOTransactionsDialog:
      iOTransactionsUIEvents.openDeleteIOTransactionsDialog,
    openFetchIOTransactionsDialog:
      iOTransactionsUIEvents.openFetchIOTransactionsDialog,
    openUpdateIOTransactionsStatusDialog:
      iOTransactionsUIEvents.openUpdateIOTransactionsStatusDialog,
  };
  return (
    <IOTransactionsUIContext.Provider value={value}>
      {children}
    </IOTransactionsUIContext.Provider>
  );
}
