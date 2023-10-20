
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OperationModel } from "../../../../../core/_models/Cash/OperationModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OperationsUIContext = createContext();

export function useOperationsUIContext() {
  return useContext(OperationsUIContext);
}

export const OperationsUIConsumer = OperationsUIContext.Consumer;

export function OperationsUIProvider({ operationsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OperationModel).initialFilter
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
    dataModel: OperationModel,
    newOperationButtonClick: operationsUIEvents.newOperationButtonClick,
    openEditOperationPage: operationsUIEvents.openEditOperationPage,
    openDeleteOperationDialog: operationsUIEvents.openDeleteOperationDialog,
    openDeleteOperationsDialog: operationsUIEvents.openDeleteOperationsDialog,
    openFetchOperationsDialog: operationsUIEvents.openFetchOperationsDialog,
    openUpdateOperationsStatusDialog: operationsUIEvents.openUpdateOperationsStatusDialog,
  };
  return (
    <OperationsUIContext.Provider value={value}>{children}</OperationsUIContext.Provider>
  );
}