import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoreTransactionPlaceModel } from "../../../../../core/_models/Core/CoreTransactionPlaceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const CoreTransactionPlacesUIContext = createContext();
export function useCoreTransactionPlacesUIContext() {
  return useContext(CoreTransactionPlacesUIContext);
}
export const CoreTransactionPlacesUIConsumer =
  CoreTransactionPlacesUIContext.Consumer;
export function CoreTransactionPlacesUIProvider({
  coreTransactionPlacesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoreTransactionPlaceModel).initialFilter
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
    dataModel: CoreTransactionPlaceModel,
    newCoreTransactionPlaceButtonClick:
      coreTransactionPlacesUIEvents.newCoreTransactionPlaceButtonClick,
    openEditCoreTransactionPlacePage:
      coreTransactionPlacesUIEvents.openEditCoreTransactionPlacePage,
    openDeleteCoreTransactionPlaceDialog:
      coreTransactionPlacesUIEvents.openDeleteCoreTransactionPlaceDialog,
    openDeleteCoreTransactionPlacesDialog:
      coreTransactionPlacesUIEvents.openDeleteCoreTransactionPlacesDialog,
    openFetchCoreTransactionPlacesDialog:
      coreTransactionPlacesUIEvents.openFetchCoreTransactionPlacesDialog,
    openUpdateCoreTransactionPlacesStatusDialog:
      coreTransactionPlacesUIEvents.openUpdateCoreTransactionPlacesStatusDialog,
  };
  return (
    <CoreTransactionPlacesUIContext.Provider value={value}>
      {children}
    </CoreTransactionPlacesUIContext.Provider>
  );
}
