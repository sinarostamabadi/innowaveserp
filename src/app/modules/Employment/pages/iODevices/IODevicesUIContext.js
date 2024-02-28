import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { IODeviceModel } from "../../../../../core/_models/Employment/IODeviceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const IODevicesUIContext = createContext();

export function useIODevicesUIContext() {
  return useContext(IODevicesUIContext);
}

export const IODevicesUIConsumer = IODevicesUIContext.Consumer;

export function IODevicesUIProvider({ iODevicesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(IODeviceModel).initialFilter
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
    dataModel: IODeviceModel,
    newIODeviceButtonClick: iODevicesUIEvents.newIODeviceButtonClick,
    openEditIODevicePage: iODevicesUIEvents.openEditIODevicePage,
    openDeleteIODeviceDialog: iODevicesUIEvents.openDeleteIODeviceDialog,
    openDeleteIODevicesDialog: iODevicesUIEvents.openDeleteIODevicesDialog,
    openFetchIODevicesDialog: iODevicesUIEvents.openFetchIODevicesDialog,
    openUpdateIODevicesStatusDialog:
      iODevicesUIEvents.openUpdateIODevicesStatusDialog,
  };
  return (
    <IODevicesUIContext.Provider value={value}>
      {children}
    </IODevicesUIContext.Provider>
  );
}
