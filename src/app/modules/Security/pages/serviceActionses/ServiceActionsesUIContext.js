import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ServiceActionsModel } from "../../../../../core/_models/Security/ServiceActionsModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ServiceActionsesUIContext = createContext();

export function useServiceActionsesUIContext() {
  return useContext(ServiceActionsesUIContext);
}

export const ServiceActionsesUIConsumer = ServiceActionsesUIContext.Consumer;

export function ServiceActionsesUIProvider({
  serviceActionsesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ServiceActionsModel).initialFilter
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
    dataModel: ServiceActionsModel,
    newServiceActionsButtonClick:
      serviceActionsesUIEvents.newServiceActionsButtonClick,
    openEditServiceActionsPage:
      serviceActionsesUIEvents.openEditServiceActionsPage,
    openDeleteServiceActionsDialog:
      serviceActionsesUIEvents.openDeleteServiceActionsDialog,
    openDeleteServiceActionsesDialog:
      serviceActionsesUIEvents.openDeleteServiceActionsesDialog,
    openFetchServiceActionsesDialog:
      serviceActionsesUIEvents.openFetchServiceActionsesDialog,
    openUpdateServiceActionsesStatusDialog:
      serviceActionsesUIEvents.openUpdateServiceActionsesStatusDialog,
  };
  return (
    <ServiceActionsesUIContext.Provider value={value}>
      {children}
    </ServiceActionsesUIContext.Provider>
  );
}
