
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ServiceItemModel } from "../../../../../core/_models/Security/ServiceItemModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ServiceItemsUIContext = createContext();

export function useServiceItemsUIContext() {
  return useContext(ServiceItemsUIContext);
}

export const ServiceItemsUIConsumer = ServiceItemsUIContext.Consumer;

export function ServiceItemsUIProvider({ serviceItemsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ServiceItemModel).initialFilter
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
    dataModel: ServiceItemModel,
    newServiceItemButtonClick: serviceItemsUIEvents.newServiceItemButtonClick,
    openEditServiceItemPage: serviceItemsUIEvents.openEditServiceItemPage,
    openDeleteServiceItemDialog: serviceItemsUIEvents.openDeleteServiceItemDialog,
    openDeleteServiceItemsDialog: serviceItemsUIEvents.openDeleteServiceItemsDialog,
    openFetchServiceItemsDialog: serviceItemsUIEvents.openFetchServiceItemsDialog,
    openUpdateServiceItemsStatusDialog: serviceItemsUIEvents.openUpdateServiceItemsStatusDialog,
  };
  return (
    <ServiceItemsUIContext.Provider value={value}>{children}</ServiceItemsUIContext.Provider>
  );
}