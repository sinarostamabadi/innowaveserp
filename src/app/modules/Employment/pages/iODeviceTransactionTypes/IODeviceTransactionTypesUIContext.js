import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { IODeviceTransactionTypeModel } from "../../../../../core/_models/Employment/IODeviceTransactionTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const IODeviceTransactionTypesUIContext = createContext();

export function useIODeviceTransactionTypesUIContext() {
  return useContext(IODeviceTransactionTypesUIContext);
}

export const IODeviceTransactionTypesUIConsumer =
  IODeviceTransactionTypesUIContext.Consumer;

export function IODeviceTransactionTypesUIProvider({
  iODeviceTransactionTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(IODeviceTransactionTypeModel).initialFilter
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
    dataModel: IODeviceTransactionTypeModel,
    newIODeviceTransactionTypeButtonClick:
      iODeviceTransactionTypesUIEvents.newIODeviceTransactionTypeButtonClick,
    openEditIODeviceTransactionTypePage:
      iODeviceTransactionTypesUIEvents.openEditIODeviceTransactionTypePage,
    openDeleteIODeviceTransactionTypeDialog:
      iODeviceTransactionTypesUIEvents.openDeleteIODeviceTransactionTypeDialog,
    openDeleteIODeviceTransactionTypesDialog:
      iODeviceTransactionTypesUIEvents.openDeleteIODeviceTransactionTypesDialog,
    openFetchIODeviceTransactionTypesDialog:
      iODeviceTransactionTypesUIEvents.openFetchIODeviceTransactionTypesDialog,
    openUpdateIODeviceTransactionTypesStatusDialog:
      iODeviceTransactionTypesUIEvents.openUpdateIODeviceTransactionTypesStatusDialog,
  };
  return (
    <IODeviceTransactionTypesUIContext.Provider value={value}>
      {children}
    </IODeviceTransactionTypesUIContext.Provider>
  );
}
