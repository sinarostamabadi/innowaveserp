
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalReserveModel } from "../../../../../core/_models/Futsal/FutsalReserveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalReservesUIContext = createContext();

export function useFutsalReservesUIContext() {
  return useContext(FutsalReservesUIContext);
}

export const FutsalReservesUIConsumer = FutsalReservesUIContext.Consumer;

export function FutsalReservesUIProvider({ futsalReservesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalReserveModel).initialFilter
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
    dataModel: FutsalReserveModel,
    newFutsalReserveButtonClick: futsalReservesUIEvents.newFutsalReserveButtonClick,
    openEditFutsalReservePage: futsalReservesUIEvents.openEditFutsalReservePage,
    openDeleteFutsalReserveDialog: futsalReservesUIEvents.openDeleteFutsalReserveDialog,
    openDeleteFutsalReservesDialog: futsalReservesUIEvents.openDeleteFutsalReservesDialog,
    openFetchFutsalReservesDialog: futsalReservesUIEvents.openFetchFutsalReservesDialog,
    openUpdateFutsalReservesStatusDialog: futsalReservesUIEvents.openUpdateFutsalReservesStatusDialog,
  };
  return (
    <FutsalReservesUIContext.Provider value={value}>{children}</FutsalReservesUIContext.Provider>
  );
}