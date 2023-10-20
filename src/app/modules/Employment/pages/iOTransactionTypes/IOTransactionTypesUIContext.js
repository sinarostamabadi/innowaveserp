
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { IOTransactionTypeModel } from "../../../../../core/_models/Employment/IOTransactionTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const IOTransactionTypesUIContext = createContext();

export function useIOTransactionTypesUIContext() {
  return useContext(IOTransactionTypesUIContext);
}

export const IOTransactionTypesUIConsumer = IOTransactionTypesUIContext.Consumer;

export function IOTransactionTypesUIProvider({ iOTransactionTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(IOTransactionTypeModel).initialFilter
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
    dataModel: IOTransactionTypeModel,
    newIOTransactionTypeButtonClick: iOTransactionTypesUIEvents.newIOTransactionTypeButtonClick,
    openEditIOTransactionTypePage: iOTransactionTypesUIEvents.openEditIOTransactionTypePage,
    openDeleteIOTransactionTypeDialog: iOTransactionTypesUIEvents.openDeleteIOTransactionTypeDialog,
    openDeleteIOTransactionTypesDialog: iOTransactionTypesUIEvents.openDeleteIOTransactionTypesDialog,
    openFetchIOTransactionTypesDialog: iOTransactionTypesUIEvents.openFetchIOTransactionTypesDialog,
    openUpdateIOTransactionTypesStatusDialog: iOTransactionTypesUIEvents.openUpdateIOTransactionTypesStatusDialog,
  };
  return (
    <IOTransactionTypesUIContext.Provider value={value}>{children}</IOTransactionTypesUIContext.Provider>
  );
}