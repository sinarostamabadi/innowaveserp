
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ChequeStatusModel } from "../../../../../core/_models/Cash/ChequeStatusModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ChequeStatusesUIContext = createContext();

export function useChequeStatusesUIContext() {
  return useContext(ChequeStatusesUIContext);
}

export const ChequeStatusesUIConsumer = ChequeStatusesUIContext.Consumer;

export function ChequeStatusesUIProvider({ chequeStatusesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ChequeStatusModel).initialFilter
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
    dataModel: ChequeStatusModel,
    newChequeStatusButtonClick: chequeStatusesUIEvents.newChequeStatusButtonClick,
    openEditChequeStatusPage: chequeStatusesUIEvents.openEditChequeStatusPage,
    openDeleteChequeStatusDialog: chequeStatusesUIEvents.openDeleteChequeStatusDialog,
    openDeleteChequeStatusesDialog: chequeStatusesUIEvents.openDeleteChequeStatusesDialog,
    openFetchChequeStatusesDialog: chequeStatusesUIEvents.openFetchChequeStatusesDialog,
    openUpdateChequeStatusesStatusDialog: chequeStatusesUIEvents.openUpdateChequeStatusesStatusDialog,
  };
  return (
    <ChequeStatusesUIContext.Provider value={value}>{children}</ChequeStatusesUIContext.Provider>
  );
}