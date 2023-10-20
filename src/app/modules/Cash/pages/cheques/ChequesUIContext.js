
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ChequeModel } from "../../../../../core/_models/Cash/ChequeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ChequesUIContext = createContext();

export function useChequesUIContext() {
  return useContext(ChequesUIContext);
}

export const ChequesUIConsumer = ChequesUIContext.Consumer;

export function ChequesUIProvider({ chequesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ChequeModel).initialFilter
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
    dataModel: ChequeModel,
    newChequeButtonClick: chequesUIEvents.newChequeButtonClick,
    openEditChequePage: chequesUIEvents.openEditChequePage,
    openDeleteChequeDialog: chequesUIEvents.openDeleteChequeDialog,
    openDeleteChequesDialog: chequesUIEvents.openDeleteChequesDialog,
    openFetchChequesDialog: chequesUIEvents.openFetchChequesDialog,
    openUpdateChequesStatusDialog: chequesUIEvents.openUpdateChequesStatusDialog,
  };
  return (
    <ChequesUIContext.Provider value={value}>{children}</ChequesUIContext.Provider>
  );
}