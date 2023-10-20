
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OperationTypeModel } from "../../../../../core/_models/Cash/OperationTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OperationTypesUIContext = createContext();

export function useOperationTypesUIContext() {
  return useContext(OperationTypesUIContext);
}

export const OperationTypesUIConsumer = OperationTypesUIContext.Consumer;

export function OperationTypesUIProvider({ operationTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OperationTypeModel).initialFilter
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
    dataModel: OperationTypeModel,
    newOperationTypeButtonClick: operationTypesUIEvents.newOperationTypeButtonClick,
    openEditOperationTypePage: operationTypesUIEvents.openEditOperationTypePage,
    openDeleteOperationTypeDialog: operationTypesUIEvents.openDeleteOperationTypeDialog,
    openDeleteOperationTypesDialog: operationTypesUIEvents.openDeleteOperationTypesDialog,
    openFetchOperationTypesDialog: operationTypesUIEvents.openFetchOperationTypesDialog,
    openUpdateOperationTypesStatusDialog: operationTypesUIEvents.openUpdateOperationTypesStatusDialog,
  };
  return (
    <OperationTypesUIContext.Provider value={value}>{children}</OperationTypesUIContext.Provider>
  );
}