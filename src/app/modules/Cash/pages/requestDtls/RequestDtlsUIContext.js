import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RequestDtlModel } from "../../../../../core/_models/Cash/RequestDtlModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RequestDtlsUIContext = createContext();

export function useRequestDtlsUIContext() {
  return useContext(RequestDtlsUIContext);
}

export const RequestDtlsUIConsumer = RequestDtlsUIContext.Consumer;

export function RequestDtlsUIProvider({ requestDtlsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RequestDtlModel).initialFilter
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
    dataModel: RequestDtlModel,
    newRequestDtlButtonClick: requestDtlsUIEvents.newRequestDtlButtonClick,
    openEditRequestDtlPage: requestDtlsUIEvents.openEditRequestDtlPage,
    openDeleteRequestDtlDialog: requestDtlsUIEvents.openDeleteRequestDtlDialog,
    openDeleteRequestDtlsDialog:
      requestDtlsUIEvents.openDeleteRequestDtlsDialog,
    openFetchRequestDtlsDialog: requestDtlsUIEvents.openFetchRequestDtlsDialog,
    openUpdateRequestDtlsStatusDialog:
      requestDtlsUIEvents.openUpdateRequestDtlsStatusDialog,
  };
  return (
    <RequestDtlsUIContext.Provider value={value}>
      {children}
    </RequestDtlsUIContext.Provider>
  );
}
