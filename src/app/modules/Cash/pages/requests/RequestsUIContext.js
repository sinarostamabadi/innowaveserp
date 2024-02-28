import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RequestModel } from "../../../../../core/_models/Cash/RequestModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RequestsUIContext = createContext();

export function useRequestsUIContext() {
  return useContext(RequestsUIContext);
}

export const RequestsUIConsumer = RequestsUIContext.Consumer;

export function RequestsUIProvider({ requestsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RequestModel).initialFilter
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
    dataModel: RequestModel,
    newRequestButtonClick: requestsUIEvents.newRequestButtonClick,
    openEditRequestPage: requestsUIEvents.openEditRequestPage,
    openDeleteRequestDialog: requestsUIEvents.openDeleteRequestDialog,
    openDeleteRequestsDialog: requestsUIEvents.openDeleteRequestsDialog,
    openFetchRequestsDialog: requestsUIEvents.openFetchRequestsDialog,
    openUpdateRequestsStatusDialog:
      requestsUIEvents.openUpdateRequestsStatusDialog,
  };
  return (
    <RequestsUIContext.Provider value={value}>
      {children}
    </RequestsUIContext.Provider>
  );
}
