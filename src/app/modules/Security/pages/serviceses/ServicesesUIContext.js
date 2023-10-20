
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ServicesModel } from "../../../../../core/_models/Security/ServicesModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ServicesesUIContext = createContext();

export function useServicesesUIContext() {
  return useContext(ServicesesUIContext);
}

export const ServicesesUIConsumer = ServicesesUIContext.Consumer;

export function ServicesesUIProvider({ servicesesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ServicesModel).initialFilter
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
    dataModel: ServicesModel,
    newServicesButtonClick: servicesesUIEvents.newServicesButtonClick,
    openEditServicesPage: servicesesUIEvents.openEditServicesPage,
    openDeleteServicesDialog: servicesesUIEvents.openDeleteServicesDialog,
    openDeleteServicesesDialog: servicesesUIEvents.openDeleteServicesesDialog,
    openFetchServicesesDialog: servicesesUIEvents.openFetchServicesesDialog,
    openUpdateServicesesStatusDialog: servicesesUIEvents.openUpdateServicesesStatusDialog,
  };
  return (
    <ServicesesUIContext.Provider value={value}>{children}</ServicesesUIContext.Provider>
  );
}