import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { NextOperationModel } from "../../../../../core/_models/Cash/NextOperationModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const NextOperationsUIContext = createContext();

export function useNextOperationsUIContext() {
  return useContext(NextOperationsUIContext);
}

export const NextOperationsUIConsumer = NextOperationsUIContext.Consumer;

export function NextOperationsUIProvider({ nextOperationsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(NextOperationModel).initialFilter
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
    dataModel: NextOperationModel,
    newNextOperationButtonClick:
      nextOperationsUIEvents.newNextOperationButtonClick,
    openEditNextOperationPage: nextOperationsUIEvents.openEditNextOperationPage,
    openDeleteNextOperationDialog:
      nextOperationsUIEvents.openDeleteNextOperationDialog,
    openDeleteNextOperationsDialog:
      nextOperationsUIEvents.openDeleteNextOperationsDialog,
    openFetchNextOperationsDialog:
      nextOperationsUIEvents.openFetchNextOperationsDialog,
    openUpdateNextOperationsStatusDialog:
      nextOperationsUIEvents.openUpdateNextOperationsStatusDialog,
  };
  return (
    <NextOperationsUIContext.Provider value={value}>
      {children}
    </NextOperationsUIContext.Provider>
  );
}
