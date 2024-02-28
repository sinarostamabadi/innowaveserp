import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ErrorHandlerModel } from "../../../../../core/_models/Core/ErrorHandlerModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const ErrorHandlersUIContext = createContext();
export function useErrorHandlersUIContext() {
  return useContext(ErrorHandlersUIContext);
}
export const ErrorHandlersUIConsumer = ErrorHandlersUIContext.Consumer;
export function ErrorHandlersUIProvider({ errorHandlersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ErrorHandlerModel).initialFilter
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
    dataModel: ErrorHandlerModel,
    newErrorHandlerButtonClick:
      errorHandlersUIEvents.newErrorHandlerButtonClick,
    openEditErrorHandlerPage: errorHandlersUIEvents.openEditErrorHandlerPage,
    openDeleteErrorHandlerDialog:
      errorHandlersUIEvents.openDeleteErrorHandlerDialog,
    openDeleteErrorHandlersDialog:
      errorHandlersUIEvents.openDeleteErrorHandlersDialog,
    openFetchErrorHandlersDialog:
      errorHandlersUIEvents.openFetchErrorHandlersDialog,
    openUpdateErrorHandlersStatusDialog:
      errorHandlersUIEvents.openUpdateErrorHandlersStatusDialog,
  };
  return (
    <ErrorHandlersUIContext.Provider value={value}>
      {children}
    </ErrorHandlersUIContext.Provider>
  );
}
