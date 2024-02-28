import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { IODeviceTypeModel } from "../../../../../core/_models/Employment/IODeviceTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const IODeviceTypesUIContext = createContext();

export function useIODeviceTypesUIContext() {
  return useContext(IODeviceTypesUIContext);
}

export const IODeviceTypesUIConsumer = IODeviceTypesUIContext.Consumer;

export function IODeviceTypesUIProvider({ iODeviceTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(IODeviceTypeModel).initialFilter
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
    dataModel: IODeviceTypeModel,
    newIODeviceTypeButtonClick:
      iODeviceTypesUIEvents.newIODeviceTypeButtonClick,
    openEditIODeviceTypePage: iODeviceTypesUIEvents.openEditIODeviceTypePage,
    openDeleteIODeviceTypeDialog:
      iODeviceTypesUIEvents.openDeleteIODeviceTypeDialog,
    openDeleteIODeviceTypesDialog:
      iODeviceTypesUIEvents.openDeleteIODeviceTypesDialog,
    openFetchIODeviceTypesDialog:
      iODeviceTypesUIEvents.openFetchIODeviceTypesDialog,
    openUpdateIODeviceTypesStatusDialog:
      iODeviceTypesUIEvents.openUpdateIODeviceTypesStatusDialog,
  };
  return (
    <IODeviceTypesUIContext.Provider value={value}>
      {children}
    </IODeviceTypesUIContext.Provider>
  );
}
